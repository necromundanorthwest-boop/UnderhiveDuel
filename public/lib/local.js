import {newMatch,transition,view,seededD6} from './engine.js';
export class LocalMatch{
 constructor(seed,onChange){this.rng=seededD6(seed);this.state=newMatch(`local-${seed}-1`);this.serial=1;this.seat=0;this.onChange=onChange;this.mode='local';this.code='LOCAL';}
 snapshot(){return {...view(this.state,this.seat),code:'LOCAL',connected:[true,true]};}
 async send(action){this.state=transition(this.state,this.seat,action,this.rng);if(this.state.phase==='MATCH_RESULT'&&this.state.ready.every(Boolean))this.state=newMatch(`local-rematch-${++this.serial}`);const s=this.state;let next=this.seat;if(s.phase==='RESOLVE')next=s.actor;else if(['CHAMPION_SELECT','WEAPON_REROLL','COMMAND_REROLL','BOUT_RESULT','MATCH_RESULT'].includes(s.phase)&&s.ready[this.seat]&&!s.ready[1-this.seat])next=1-this.seat;const handoff=next!==this.seat;this.seat=next;this.onChange(this.snapshot(),handoff);}
 close(){}
}
