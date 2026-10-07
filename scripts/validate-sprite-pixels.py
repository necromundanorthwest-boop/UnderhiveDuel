"""Read-only pixel validation of current atlas rectangles and masks.

Requires Pillow, numpy and scipy. Writes diagnostic evidence, never source assets.
Opaque means alpha > 128, matching the recovered atlas measurement method.
"""
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import label

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'public/ASSET_MANIFEST.json').read_text())
rows = []
for sprite in manifest['sprites']:
    path = root / 'public' / sprite['path']
    assert hashlib.sha256(path.read_bytes()).hexdigest() == sprite['sha256']
    im = Image.open(path)
    assert im.mode == 'RGBA'
    assert im.size == (sprite['width'], sprite['height'])
    alpha = np.asarray(im.getchannel('A'))
    components, _ = label(alpha > 128)
    for name, frame in sprite['frames'].items():
        x, y, w, h = frame['rect']
        crop = components[y:y+h, x:x+w]
        mask_image = Image.new('1', (w, h), 1)
        if frame.get('clipPolygon'):
            mask_image = Image.new('1', (w, h))
            ImageDraw.Draw(mask_image).polygon([tuple(p) for p in frame['clipPolygon']], fill=1)
        mask = np.asarray(mask_image).astype(bool)
        opaque = (crop > 0) & mask
        assert opaque.any(), (sprite['id'], name, 'empty frame')
        ids, counts = np.unique(crop[opaque], return_counts=True)
        target = ids[np.argmax(counts)]
        foreign = int(np.count_nonzero(opaque & (crop != target)))
        clipped = int(np.count_nonzero(components == target) - np.count_nonzero(opaque & (crop == target)))
        if sprite['id'] in ['shadowlurker', 'votive', 'pitjack', 'ironhaul']:
            assert foreign == 0 and clipped == 0, (sprite['id'], name, foreign, clipped)
        rows.append(dict(champion=sprite['id'], frame=name, opaquePixels=int(opaque.sum()),
                         foreignOpaquePixelsAfterMask=foreign, mainComponentPixelsClipped=clipped))
assert len(rows) == 60
out = root / 'docs/release-evidence/recovered-pixel-validation.json'
out.write_text(json.dumps({'status': 'PASS', 'frames': 60, 'newFrames': 24,
    'method': 'actual PNG alpha > 128; current manifest masks; new frames require no foreign or clipped component pixels',
    'rows': rows}, indent=2) + '\n')
print('PASS: 60 nonempty frames; 24 new frames have zero foreign or clipped opaque component pixels.')
