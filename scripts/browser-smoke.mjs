// Run with: npm install --no-save playwright && npx playwright install chromium
// Then: node scripts/browser-smoke.mjs
// Two isolated browser contexts emulate independent devices; this is not physical hardware QA.
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createApp} from '../server/http.js';
import {RoomService} from '../server/rooms.js';
import {seededD6} from '../public/lib/engine.js';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const {server}=createApp({service:new RoomService({rng:seededD6(71234)})});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
let browser;const report={status:'RUNNING',started:new Date().toISOString(),deviceType:'two isolated browser contexts, desktop and touch mobile emulation',viewports:[],matches:[],errors:[]};
await mkdir('docs/browser-evidence',{recursive:true});
try{browser=await chromium.launch();const contexts=await Promise.all([browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'}),browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'})]);const pages=await Promise.all(contexts.map(c=>c.newPage()));
for(const p of pages){p.on('pageerror',e=>report.errors.push(e.message));p.on('response',r=>{if(r.status()>=500)report.errors.push(`HTTP ${r.status()} ${r.url()}`);});await p.goto(origin);await p.locator('#create').waitFor();}
async function fit(p,width,label){await p.setViewportSize({width,height:900});await p.locator('.shell').waitFor();const dimensions=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('button:not(:disabled)')].map(b=>({text:b.textContent,height:b.getBoundingClientRect().height,width:b.getBoundingClientRect().width}))}));assert(dimensions.scroll<=dimensions.width,`${label} overflows at ${width}`);assert(dimensions.buttons.every(b=>b.width>=44&&b.height>=44),`${label}: undersized controls`);report.viewports.push({width,screen:label,pass:true});await p.screenshot({path:`docs/browser-evidence/${label}-${width}.png`,fullPage:true});}
for(const w of [320,390,768,1280])await fit(pages[0],w,'entry');await pages[0].locator('#create').click();await pages[0].locator('.roomcode').waitFor();const code=await pages[0].locator('.roomcode').textContent();await pages[1].locator('#code').fill(code);await pages[1].locator('#join').click();
for(const p of pages)await p.locator('[data-champion]').first().waitFor();
// Read snapshots without replacing active connections: observe authorized polling responses.
const states=[null,null];for(const [i,p] of pages.entries())p.on('response',async r=>{if(r.url().endsWith('/state')&&r.ok())states[i]=await r.json();});
const wait=async pred=>{const until=Date.now()+15000;while(!pred()){if(Date.now()>until)throw Error('Timed out waiting for synchronized UI');await new Promise(r=>setTimeout(r,100));}};
for(const [match,pair] of [['bastion','slagjaw'],['vesper','guttermaw'],['rivet','cinder']].entries()){
 for(const [i,p] of pages.entries()){await p.locator(`[data-champion="${pair[i]}"]`).click();await p.locator('#lock-champion').click();if(i===0){await wait(()=>states[1]?.phase==='CHAMPION_SELECT'&&states[1].ready[0]);assert.equal(states[1].players[0].champion,null);}}
 await wait(()=>states.every(s=>s?.bout===1));if(match===0)for(const w of [320,390,768,1280])await fit(pages[0],w,'fight');
 let actions=0;while(actions++<200){await wait(()=>states[0]&&states[1]&&states[0].version===states[1].version);const s=states[0];if(s.phase==='MATCH_RESULT')break;const old=s.version;if(['WEAPON_REROLL','COMMAND_REROLL'].includes(s.phase)){for(let i=0;i<2;i++){if(!states[i].ready[i]&&states[i].phase===s.phase){const version=states[0].version;await pages[i].locator('#pass').click();await wait(()=>states[0].version>version&&states[1].version===states[0].version);}}}
 else if(s.phase==='RESOLVE'){const i=s.actor,die=s.players[i].dice.find(d=>d.status==='available');await pages[i].locator(`[data-die="${die.id}"]`).click();await pages[i].locator('#strike').click();await wait(()=>states[0].version>old&&states[1].version===states[0].version);}
 else if(s.phase==='BOUT_RESULT'){for(let i=0;i<2;i++){const version=states[0].version;await pages[i].locator('#next').click();await wait(()=>states[0].version>version&&states[1].version===states[0].version);}}
 else throw Error(`Unexpected phase ${s.phase}`);
 }
 await wait(()=>states.every(s=>s.phase==='MATCH_RESULT'));assert.deepEqual(states[0].players,states[1].players);assert.equal(Math.max(...states[0].players.map(p=>p.score)),3);report.matches.push({champions:pair,score:states[0].players.map(p=>p.score),bouts:states[0].bout,synchronized:true});
 if(match===0){for(const w of [320,390,768,1280])await fit(pages[0],w,'result');await pages[1].reload();await pages[1].locator('#rematch').waitFor();}
 const rematchVersion=states[0].version;for(const p of pages)await p.locator('#rematch').click();await wait(()=>states[0].version>rematchVersion&&states[1].version===states[0].version);await wait(()=>states.every(s=>s.phase==='CHAMPION_SELECT'));assert.deepEqual(states[0].players.map(p=>p.tokens),[2,2]);
}
assert.deepEqual(report.errors,[]);report.status='PASS';
}catch(e){report.status=browser?'FAIL':'BLOCKED';report.errors.push(e.stack);throw e;}finally{await writeFile('docs/browser-evidence/results.json',JSON.stringify(report,null,2));await browser?.close();await new Promise(r=>server.close(r));}
