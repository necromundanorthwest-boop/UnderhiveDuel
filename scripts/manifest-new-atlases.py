"""Extract measured per-pose metadata; never infer a uniform grid at runtime.
Diagnostic only: source PNG bytes are never altered. numpy/scipy/Pillow required.
"""
from pathlib import Path
import json,hashlib
import numpy as np
from scipy.ndimage import label,find_objects
from scipy.spatial import ConvexHull
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]
m=json.loads((root/'authority/ASSET_MANIFEST_0.1.0.json').read_text())
m['rulesVersion']=m['visualVersion']='0.2.0'
report=[]
for id in ['shadowlurker','votive','pitjack','ironhaul']:
 path=root/f'public/assets/sprites/{id}-atlas.png';im=Image.open(path);a=np.array(im.getchannel('A'));lab,n=label(a>128);parts=[]
 for i,ob in enumerate(find_objects(lab),1):
  if ob and np.count_nonzero(lab[ob]==i)>1000:parts.append((i,ob))
 assert len(parts)==6,(id,len(parts))
 parts.sort(key=lambda p:(p[1][0].start>495,p[1][1].start))
 frames={}
 for (component,ob),name in zip(parts,['portrait','idle','strike','block','hit','defeat']):
  y,x=ob;mask=lab[ob]==component;h,w=mask.shape;foreign=(a[ob]>128)&~mask
  f={'rect':[x.start,y.start,w,h],'pivot':[round(w/2),h],'durationMs':{'portrait':0,'idle':0,'strike':120,'block':100,'hit':120,'defeat':0}[name],'foreignPixels':int(foreign.sum())}
  if foreign.any():
   ys,xs=np.nonzero(mask);points=np.column_stack([xs,ys]);hull=points[ConvexHull(points).vertices].tolist();pm=Image.new('1',(w,h));ImageDraw.Draw(pm).polygon([tuple(p) for p in hull],fill=1);pm=np.array(pm).astype(bool)
   assert not (foreign&pm).any(),(id,name,'hull includes adjacent sprite')
   assert np.count_nonzero(mask&~pm)==0,(id,name,'target clipping')
   f['clipPolygon']=hull
  if id=='pitjack' and name=='idle':f['pivot'][1]=480-y.start;f['anchorNote']='Boot soles at source y=480; pick tip extends below foot plane.'
  frames[name]=f
  report.append({'champion':id,'frame':name,'rect':f['rect'],'foreignOpaquePixelsBeforeMask':int(foreign.sum()),'foreignOpaquePixelsAfterMask':0,'ownOpaquePixelsClipped':0})
 m['sprites'].append({'id':id,'path':f'assets/sprites/{id}-atlas.png','width':im.width,'height':im.height,'format':'RGBA PNG','facing':'right','mirrorForOpponent':True,'frames':frames,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'provenance':'Original image generated with built-in imagegen for Underhive Duel 0.2.0; existing Cinder atlas used as pixel-style reference. See docs/ASSET_GENERATION.md.','alphaZeroFraction':float(np.mean(a==0)),'pivotConvention':'local foot/floor anchor; portrait and defeat bottom centre'})
 assert im.mode=='RGBA' and im.size==(1536,1024) and np.mean(a==0)>.5
(root/'public/ASSET_MANIFEST.json').write_text(json.dumps(m,indent=2)+'\n')
(root/'docs/release-evidence/atlas-validation.json').write_text(json.dumps(report,indent=2)+'\n')
print('Validated 24 new frames; original six entries preserved.')
