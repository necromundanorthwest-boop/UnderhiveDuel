import {rulesVersion,visualVersion} from '../public/lib/roster.js';
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {RoomService} from './rooms.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../public');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'};
export function createApp({service=new RoomService()}={}){
 const attempts=new Map();
 const server=http.createServer(async(req,res)=>{const json=(status,data)=>{res.writeHead(status,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify(data));};
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Frame-Options','DENY');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
 let url;try{url=new URL(req.url,'http://localhost');}catch{return json(400,{error:'Invalid URL'});}
 const sendError=(e,code,token,connection)=>{const status=!e.code?500:e.code==='ROOM_GONE'?404:['INVALID_SEAT','CONNECTION_REPLACED'].includes(e.code)?403:e.code==='CAPACITY'?503:409;let snapshot;try{const {r,seat}=service.current(code,token,connection);snapshot=service.snapshot(r,seat);}catch{}json(status,{code:e.code||'SERVER_ERROR',error:e.code?e.message:'The service could not complete the request.',snapshot});};
 if(url.pathname==='/health')return json(200,{ok:true,rulesVersion,visualVersion,commit:process.env.RENDER_GIT_COMMIT||null});
 if(url.pathname.startsWith('/api/')){const code=url.pathname.split('/')[3],secret=req.headers.authorization?.replace(/^Bearer /,''),connection=req.headers['x-connection'];
 // Same-origin browser requests only. No cross-origin room authority or seat disclosure.
 const origin=req.headers.origin;if(origin){try{if(new URL(origin).host!==req.headers.host)return json(403,{code:'ORIGIN',error:'Cross-origin requests are not allowed.'});}catch{return json(403,{code:'ORIGIN',error:'Invalid origin.'});}}
 if(req.headers['sec-fetch-site']==='cross-site')return json(403,{code:'ORIGIN',error:'Cross-origin requests are not allowed.'});
 try{if(req.method==='GET'&&/^\/api\/rooms\/[A-Z2-9]{6}\/state$/.test(url.pathname))return json(200,service.poll(code,secret,connection));
 if(req.method!=='POST')return json(405,{error:'Method not allowed.'});
 let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>8192)return json(413,{error:'Request too large.'});}let body;try{body=JSON.parse(raw||'{}');}catch{return json(400,{error:'Invalid JSON.'});}
 if(!body||typeof body!=='object'||Array.isArray(body))return json(400,{error:'Expected an object.'});
 if(url.pathname==='/api/rooms'){const key=req.socket.remoteAddress,now=Date.now();const entry=attempts.get(key)||{since:now,count:0};if(now-entry.since>60000){entry.since=now;entry.count=0;}if(++entry.count>20)return json(429,{error:'Room creation rate exceeded. Try again in one minute.'});attempts.set(key,entry);return json(201,service.create());}
 if(!/^\/api\/rooms\/[A-Z2-9]{6}\/(join|connect|disconnect|command)$/.test(url.pathname))return json(404,{error:'Unknown room endpoint.'});
 const operation=url.pathname.split('/')[4];if(operation==='join')return json(200,service.join(code));if(operation==='connect')return json(200,service.connect(code,secret));if(operation==='disconnect')return json(200,service.disconnect(code,secret,connection));return json(200,service.command(code,secret,connection,body));
 }catch(e){return sendError(e,code,secret,connection);}}
 if(!['GET','HEAD'].includes(req.method))return json(405,{error:'Method not allowed.'});let path;try{path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));}catch{return json(400,{error:'Invalid path.'});}if(!path.startsWith(root+'/'))return json(403,{error:'Forbidden.'});try{if(!(await stat(path)).isFile())return json(404,{error:'Not found.'});const data=await readFile(path);res.writeHead(200,{'content-type':mime[extname(path)]||'application/octet-stream','cache-control':path.includes('/assets/')?'public, max-age=3600':'no-cache','content-length':data.length});res.end(req.method==='HEAD'?undefined:data);}catch{return json(404,{error:'Not found.'});}
 });server.headersTimeout=15000;server.requestTimeout=15000;server.maxHeadersCount=40;
 const timer=setInterval(()=>{service.tick();const now=Date.now();for(const [key,value] of attempts)if(now-value.since>60000)attempts.delete(key);},1000);timer.unref();server.on('close',()=>clearInterval(timer));return {server,service};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){const {server}=createApp();const port=Number(process.env.PORT)||3000;server.listen(port,'0.0.0.0',()=>console.log(`Underhive Duel alpha listening on port ${port}`));const shutdown=()=>server.close(()=>process.exit(0));process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);}
