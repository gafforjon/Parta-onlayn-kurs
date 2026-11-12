const Module=require('module'),assert=require('assert');process.env.ANTHROPIC_API_KEY='k';
const store={};const fake={initializeApp(){},database:()=>({ref:p=>({transaction:async fn=>{const nv=fn(store[p]===undefined?null:store[p]);if(nv!==undefined)store[p]=nv;return{committed:nv!==undefined}},get:async()=>({val:()=>null}),remove:async()=>{}})}),messaging:()=>({})};
const orig=Module._load;Module._load=function(r,...a){return r==='firebase-admin'?fake:orig.call(this,r,...a)};
const A=require('../functions/assistant.js'),f=require('../functions/index.js');let pass=0,fail=0;const ok=(c,m)=>{c?pass++:(fail++,console.log('FAIL:',m))};
const rej=async(p,code,m)=>{try{await p;ok(false,m+' (no error)')}catch(e){ok(e.code===code,m+' got '+e.code)}};
// sanitize
ok(A.sanitize([{role:'user',content:' hi '}])[0].content==='hi','sanitize trims');
ok(A.sanitize([{role:'assistant',content:'x'},{role:'user',content:'q'}]).length===1,'leading assistant dropped');
ok(A.sanitize([{role:'user',content:'a'},{role:'user',content:'b'}])[0].content==='a\nb','same roles merged');
ok(A.sanitize([{role:'user',content:'x'.repeat(5000)}])[0].content.length===1000,'length capped');
ok(A.sanitize(Array.from({length:31},(_,i)=>({role:i%2?'assistant':'user',content:'m'+i}))).length<=8,'history capped');
ok(A.sanitize([{role:'system',content:'evil'},{role:'user',content:'q'}]).length===1,'system role from client ignored');
for(const bad of [null,'x',[],[{role:'assistant',content:'a'}],[{role:'user',content:'  '}]]){let t=false;try{A.sanitize(bad)}catch(e){t=true}ok(t,'sanitize rejects '+JSON.stringify(bad))}
// usage
ok(JSON.stringify(A.nextUsage(null,5,15))==='{"b":5,"n":1}','usage starts');ok(A.nextUsage({b:4,n:15},5,15).n===1,'usage resets in new hour');ok(A.nextUsage({b:5,n:15},5,15)===undefined,'usage blocks at limit');
// system prompt
ok(/grade 5/.test(A.buildSystem(5,'ru'))&&/Russian/.test(A.buildSystem(5,'ru'))&&/Uzbek/.test(A.buildSystem(5,'uz')),'system prompt grade+language');ok(/grade 11/.test(A.buildSystem(99,'ru')),'grade clamped');
// function
let calls=[];global.fetch=async(url,o)=>{calls.push({url,o,b:JSON.parse(o.body)});return{ok:true,json:async()=>({content:[{type:'text',text:'Ответ <b>'}]})}};
const user={uid:'u1',token:{firebase:{sign_in_provider:'password'}}},anon={uid:'a',token:{firebase:{sign_in_provider:'anonymous'}}};
const msgs=[{role:'user',content:'Что такое дробь?'}];
(async()=>{
 await rej(f.askAssistant.run({data:{messages:msgs},auth:null}),'unauthenticated','no auth rejected');
 await rej(f.askAssistant.run({data:{messages:msgs},auth:anon}),'unauthenticated','anonymous rejected');
 await rej(f.askAssistant.run({data:{messages:'x'},auth:user}),'invalid-argument','bad messages rejected');
 const r=await f.askAssistant.run({data:{messages:msgs,grade:5,lang:'uz'},auth:user});
 ok(r.text==='Ответ <b>','returns text');const c=calls[0];
 ok(c.url==='https://api.anthropic.com/v1/messages'&&c.o.headers['x-api-key']==='k'&&c.o.headers['anthropic-version'],'calls Anthropic with secret key header');
 ok(c.b.model==='claude-haiku-5-5'&&c.b.max_tokens===700&&/grade 5/.test(c.b.system)&&/Uzbek/.test(c.b.system)&&c.b.messages[0].content==='Что такое дробь?','request body built from sanitized data (system prompt is server-side)');
 ok(calls.length===1,'invalid/anon calls did not hit the API');
 for(let i=0;i<14;i++)await f.askAssistant.run({data:{messages:msgs},auth:user});
 await rej(f.askAssistant.run({data:{messages:msgs},auth:user}),'resource-exhausted','16th request in an hour blocked');ok(calls.length===15,'blocked request did not hit the API');
 global.fetch=async()=>({ok:false,status:500,json:async()=>({})});await rej(f.askAssistant.run({data:{messages:msgs},auth:{uid:'u9',token:{firebase:{sign_in_provider:'password'}}}}),'unavailable','API error -> unavailable');ok(store['aiUsage/u9']&&store['aiUsage/u9'].n===0,'failed AI call refunds the quota');
 global.fetch=async()=>{throw new Error('net')};await rej(f.askAssistant.run({data:{messages:msgs},auth:{uid:'u8',token:{firebase:{sign_in_provider:'password'}}}}),'unavailable','network error -> unavailable');
 console.log(`ASSISTANT FN PASS ${pass} / FAIL ${fail}`);
})().catch(e=>console.log('CRASH',e.stack));
