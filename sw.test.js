// Проверка service worker в имитации браузерной среды (кэши и сеть подменены).
const vm=require('vm'),fs=require('fs'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,process.env.SW_PATH||'../sw.js'),'utf8');
let pass=0,fail=0;const ok=(c,m)=>{c?pass++:(fail++,console.log('FAIL:',m))};
const BASE='https://x.github.io/parta/sw.js';const norm=r=>typeof r==='string'?new URL(r,BASE).href:r.url;
function env(){
 const stores=new Map(),handlers={},net={online:true,hang:false,calls:[],body:'NET'};
 const mkCache=name=>{const m=stores.get(name)||new Map();stores.set(name,m);return{addAll:async l=>{for(const u of l)m.set(norm(u),new Response('PRE:'+u))},put:async(r,res)=>{m.set(norm(r),res)},match:async r=>m.get(norm(r))}};
 const caches={open:async n=>mkCache(n),keys:async()=>[...stores.keys()],delete:async n=>stores.delete(n),match:async r=>{for(const m of stores.values())if(m.has(norm(r)))return m.get(norm(r)).clone();}};
 const fetchFn=async(req)=>{const url=norm(req);net.calls.push(url);if(net.hang)return new Promise(()=>{});if(!net.online)throw new TypeError('Failed to fetch');return new Response(net.body+':'+url)};
 const self={location:new URL(BASE),addEventListener:(t,f)=>{(handlers[t]=handlers[t]||[]).push(f)},skipWaiting:async()=>{},clients:{claim:async()=>{},matchAll:async()=>[],openWindow:async()=>{}},registration:{scope:'https://x.github.io/parta/',showNotification:async()=>{}},PARTA_NAV_TIMEOUT:80};
 const ctx=vm.createContext({self,caches,fetch:fetchFn,URL,Response,Request,setTimeout,clearTimeout,Promise,clients:self.clients});
 vm.runInContext(src,ctx);
 const fire=async(t,ev)=>{let p=null;ev.waitUntil=x=>{p=x};ev.respondWith=x=>{ev._p=x;ev.responded=true};for(const h of handlers[t]||[])h(ev);if(p)await p;return ev};
 const req=(url,o={})=>({url:new URL(url,BASE).href,method:o.method||'GET',mode:o.mode||'cors',clone(){return this}});
 return{stores,net,fire,req,caches,handlers};
}
const text=async r=>r.text();const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 let E=env();
 await E.fire('install',{});const sh=[...E.stores.get('parta-shell-v10').keys()].map(u=>u.replace('https://x.github.io/parta/',''));
 ok(['','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'].every(x=>sh.includes(x)),'install precaches shell, manifest and icons');
 // online navigation: network wins, cache refreshed (both ./index.html and the request)
 E.net.body='FRESH';let ev=await E.fire('fetch',{request:E.req('./',{mode:'navigate'})});ok(ev.responded&&/^FRESH/.test(await text(await ev._p)),'online navigation returns fresh page');
 await sleep(20);ok(/^FRESH/.test(await text(await E.caches.match('./index.html'))),'cached index.html refreshed after online visit (not stuck on install-time copy)');
 // offline navigation: cached latest copy
 E.net.online=false;ev=await E.fire('fetch',{request:E.req('./',{mode:'navigate'})});ok(/^FRESH/.test(await text(await ev._p)),'offline navigation serves the last cached page');
 ev=await E.fire('fetch',{request:E.req('./?x=1#/course/math-5',{mode:'navigate'})});ok(/^FRESH/.test(await text(await ev._p)),'offline navigation with query still opens the app shell');
 // slow network: fallback to cache after timeout
 E=env();await E.fire('install',{});E.net.hang=true;const t0=Date.now();ev=await E.fire('fetch',{request:E.req('./',{mode:'navigate'})});const r1=await ev._p;ok(/^PRE:/.test(await text(r1))&&Date.now()-t0<1000,'slow network falls back to cache after the timeout');
 // offline and nothing cached -> rejects (browser offline page)
 E=env();E.net.online=false;ev=await E.fire('fetch',{request:E.req('./',{mode:'navigate'})});let rej=false;try{await ev._p}catch(e){rej=true}ok(rej,'offline with empty cache rejects instead of hanging');
 // same-origin static: stale-while-revalidate
 E=env();await E.fire('install',{});E.net.body='NEW';ev=await E.fire('fetch',{request:E.req('./icon-192.png')});ok(/^PRE:/.test(await text(await ev._p)),'static file served from cache immediately');
 await sleep(20);ok(/^NEW/.test(await text(await E.caches.match('./icon-192.png'))),'static file refreshed in background');
 E.net.online=false;ev=await E.fire('fetch',{request:E.req('./icon-192.png')});ok(ev.responded&&(await text(await ev._p)).length>0,'static file available offline');
 E.net.online=false;ev=await E.fire('fetch',{request:E.req('./not-cached.json')});rej=false;try{await ev._p}catch(e){rej=true}ok(rej,'uncached static file fails cleanly offline');
 // Firebase SDK scripts cached after first load
 E=env();const sdk='https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js';ev=await E.fire('fetch',{request:E.req(sdk,{mode:'no-cors'})});ok(ev.responded&&/^NET/.test(await text(await ev._p)),'SDK fetched online');
 await sleep(20);E.net.online=false;ev=await E.fire('fetch',{request:E.req(sdk,{mode:'no-cors'})});ok(/^NET/.test(await text(await ev._p)),'SDK script served from cache offline');
 // not intercepted
 for(const [u,o] of [['https://parta-onlayn-kurs-default-rtdb.firebaseio.com/.lp',{}],['https://www.youtube.com/embed/x',{}],['https://api.anthropic.com/v1/messages',{}],['./index.html',{method:'POST'}],['https://www.gstatic.com/other/x.js',{}]]){ev=await E.fire('fetch',{request:E.req(u,o)});ok(!ev.responded,'not intercepted: '+u+' '+(o.method||''))}
 // activate cleans only old shell caches
 E=env();await E.fire('install',{});E.stores.set('parta-shell-v3',new Map());E.stores.set('parta-cdn-v1',new Map());E.stores.set('other-site',new Map());await E.fire('activate',{});
 const keys=[...E.stores.keys()];ok(!keys.includes('parta-shell-v3')&&keys.includes('parta-shell-v10')&&keys.includes('parta-cdn-v1')&&keys.includes('other-site'),'activate removes old shell cache only');
 // push handlers still present
 ok(E.handlers.push&&E.handlers.notificationclick,'push and notificationclick handlers kept');
 console.log(`SW TEST PASS ${pass} / FAIL ${fail}`);
})().catch(e=>{console.log('CRASH',e.stack);process.exit(1)});
