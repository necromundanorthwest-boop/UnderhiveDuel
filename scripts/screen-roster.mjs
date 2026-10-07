// Engine-driven screening, never an in-game AI. Fixed policies are safety probes.
import {writeFile} from 'node:fs/promises';
import {champions} from '../public/lib/roster.js';
import {newMatch,transition,seededD6} from '../public/lib/engine.js';
const samples=Number(process.env.SCREEN_SAMPLES||1000), rows=[];
const baseRng=seededD6(20261003);
function choice(s,seat,command){const p=s.players[seat],fail=p.dice.filter(d=>d.class==='fail'&&!d.rerolled);if(!fail.length)return [];if(command||p.champion==='bastion'||champions.find(c=>c.id===p.champion).weapon.trait.id==='balanced')return [fail[0].id];const groups=[1,2,3].map(face=>fail.filter(d=>d.face===face));groups.sort((a,b)=>b.length-a.length||(a[0]?.face||9)-(b[0]?.face||9));return groups[0].map(d=>d.id);}
for(let a=0;a<champions.length;a++)for(let b=a;b<champions.length;b++)for(const command of [false,true]){
 const row={a:champions[a].id,b:champions[b].id,command,bouts:0,winsA:0,ooa:0,ties:0,attackerWins:0,roles:[]};
 for(const attacker of [0,1]){const role={attacker,bouts:0,winsA:0,ooa:0};for(let n=0;n<samples;n++){
 let init=0;const rng=()=>init++<2?(init===1?(attacker===0?6:1):(attacker===0?1:6)):baseRng();let s=newMatch('screen');s=transition(s,0,{type:'select',champion:row.a},rng);s=transition(s,1,{type:'select',champion:row.b},rng);
 for(const phase of ['WEAPON_REROLL','COMMAND_REROLL'])for(let seat=0;seat<2;seat++)if(s.phase===phase&&!s.ready[seat])s=transition(s,seat,{type:phase==='WEAPON_REROLL'?'weapon':'command',dice:phase==='COMMAND_REROLL'&&!command?[]:choice(s,seat,phase==='COMMAND_REROLL')},rng);
 while(s.phase==='RESOLVE'){const p=s.players[s.actor],d=p.dice.find(d=>d.status==='available'&&d.class==='critical')||p.dice.find(d=>d.status==='available');s=transition(s,s.actor,{type:'strike',die:d.id},rng);}
 if(!s.result)throw Error('Incomplete screening bout');row.bouts++;role.bouts++;if(s.result.winner===0){row.winsA++;role.winsA++;}if(s.result.reason==='OOA'){row.ooa++;role.ooa++;}if(s.result.exactTie)row.ties++;if(s.result.winner===attacker)row.attackerWins++;
 }row.roles.push(role);}rows.push(row);console.log(`${row.a}/${row.b} command=${command} winA=${(100*row.winsA/row.bouts).toFixed(1)}% OOA=${(100*row.ooa/row.bouts).toFixed(1)}%`);
}
await writeFile('docs/release-evidence/matchup-screening.json',JSON.stringify({rulesVersion:'0.2.0',seed:20261003,policy:'critical-first all-Strike; failed-die free rerolls; optional first untouched failure Command',samplesPerAttackerRole:samples,pairs:55,rows},null,2)+'\n');
