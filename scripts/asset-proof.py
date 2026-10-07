"""Render a manifest-based contact sheet for manual crop/anchor inspection.
Diagnostic SVG only: uses the frozen images and exact per-frame clip masks.
Requires Python 3; optionally inkscape to render the SVG to PNG.
"""
import json,base64
from pathlib import Path
p=Path(__file__).resolve().parents[1]
m=json.loads((p/'public/ASSET_MANIFEST.json').read_text())
W,H=1320,2240
out=[f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="#101419"/><defs>']
for s in m['sprites']:
 out.append(f'<image id="{s["id"]}" width="1536" height="1024" xlink:href="data:image/png;base64,{base64.b64encode((p/"public"/s["path"]).read_bytes()).decode()}"/>')
 for name,f in s['frames'].items():
  _,_,w,h=f['rect'];out.append(f'<clipPath id="{s["id"]}-{name}-rect"><rect width="{w}" height="{h}"/></clipPath>')
  if f.get('clipPolygon'):out.append(f'<clipPath id="{s["id"]}-{name}-poly"><polygon points="'+ ' '.join(f'{x},{y}' for x,y in f['clipPolygon'])+'"/></clipPath>')
out.append('</defs><text x="20" y="30" fill="#f2e9d7" font-family="sans-serif" font-size="20">Frozen atlas diagnostic — exact rectangles, masks and floor pivots</text>')
for row,s in enumerate(m['sprites']):
 for col,(name,f) in enumerate(s['frames'].items()):
  sx,sy,w,h=f['rect'];px,py=f['pivot'];x=col*220+110;y=row*215+228;scale=min(196/w,165/h)
  out.append(f'<path d="M{col*220+10} {y}h200" stroke="#86dbe8"/><text x="{col*220+10}" y="{row*215+60}" fill="#f2e9d7" font-family="sans-serif" font-size="14">{s["id"]} · {name}</text>')
  out.append(f'<g transform="translate({x},{y}) scale({scale}) translate({-px},{-py})" clip-path="url(#{s["id"]}-{name}-rect)">')
  if f.get('clipPolygon'):out.append(f'<g clip-path="url(#{s["id"]}-{name}-poly)">')
  out.append(f'<use xlink:href="#{s["id"]}" x="{-sx}" y="{-sy}" style="image-rendering:pixelated"/>')
  if f.get('clipPolygon'):out.append('</g>')
  out.append('</g>')
out.append('</svg>')
(p/'docs/asset-proof/atlas-contact-sheet.svg').write_text(''.join(out))
