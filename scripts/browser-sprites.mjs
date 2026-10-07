import assert from 'node:assert/strict';

// Diagnostic page only: exercise the production renderer and frozen source PNGs.
export async function validateBrowserSprites(browser, origin) {
  const page = await browser.newPage({viewport:{width:1320,height:900}});
  try {
    await page.goto(origin);
    const result = await page.evaluate(async () => {
      const {loadArt,drawFrame,drawArena} = await import('/lib/sprites.js');
      const art = await loadArt();
      document.body.innerHTML = '';
      document.body.style.cssText = 'margin:0;background:#101419;color:#eee';
      const frames = [], arenaChecks = [];
      for (const mirror of [false,true]) {
        const sheet = document.createElement('canvas');
        sheet.id = mirror ? 'sprites-mirrored' : 'sprites-normal';
        sheet.width = 1320; sheet.height = 2200;
        sheet.style.cssText = 'display:block;width:1320px;height:2200px';
        document.body.append(sheet);
        const ctx = sheet.getContext('2d');
        ctx.fillStyle = '#101419'; ctx.fillRect(0,0,sheet.width,sheet.height);
        ctx.imageSmoothingEnabled = false;
        art.manifest.sprites.forEach((sprite,row) => {
          Object.entries(sprite.frames).forEach(([pose,frame],col) => {
            const probe = document.createElement('canvas'); probe.width = 220; probe.height = 220;
            const c = probe.getContext('2d'); c.imageSmoothingEnabled = false;
            const scale = Math.min(190/frame.rect[2],170/frame.rect[3]);
            drawFrame(c,art.images[sprite.id],frame,110,205,scale,mirror);
            const pixels = c.getImageData(0,0,220,220).data;
            let opaque = 0, edgePixels = 0;
            for(let y=0;y<220;y++)for(let x=0;x<220;x++) {
              if(pixels[(y*220+x)*4+3]>128) {
                opaque++;
                if(x===0||y===0||x===219||y===219)edgePixels++;
              }
            }
            frames.push({champion:sprite.id,pose,mirror,opaque,edgePixels});
            ctx.drawImage(probe,col*220,row*220);
            ctx.fillStyle='#eee';ctx.font='13px sans-serif';
            ctx.fillText(`${sprite.id} / ${pose}`,col*220+8,row*220+18);
            ctx.strokeStyle='#86dbe8';ctx.beginPath();ctx.moveTo(col*220+8,row*220+205);ctx.lineTo(col*220+212,row*220+205);ctx.stroke();
          });
        });
      }
      const arena = document.createElement('canvas');document.body.append(arena);
      for(const viewport of [320,390,768,1280]) {
        const width=Math.min(viewport,1120)-(viewport<=600?24:40)-2;
        const height=Math.max(180,Math.min(viewport*.27,280));
        arena.style.width=width+'px';arena.style.height=height+'px';
        for(const sprite of art.manifest.sprites)for(const pose of ['idle','strike','block','hit','defeat']) {
          drawArena(arena,[sprite.id,sprite.id],art,[pose,pose]);
          arenaChecks.push({viewport,champion:sprite.id,pose,width:arena.width,height:arena.height});
        }
      }
      arena.remove();
      return {frames,arenaChecks};
    });
    assert.equal(result.frames.length,120);
    assert(result.frames.every(f=>f.opaque>0&&f.edgePixels===0),'Frame empty or clipped at diagnostic canvas edge');
    assert.equal(result.arenaChecks.length,200);
    assert(result.arenaChecks.every(c=>c.width>0&&c.height>0));
    for(const orientation of ['normal','mirrored']) await page.locator('#sprites-'+orientation).screenshot({path:`docs/browser-evidence/all-60-sprites-${orientation}.png`});
    return {status:'PASS',uniqueStates:60,orientations:2,...result};
  } finally { await page.close(); }
}
