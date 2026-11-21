const Module=require('module');const sent=[],removed=[];
const data={chats:{u1_u2:{t:'u1',s:'u2',tName:'Алишер Каримов',sName:'Азиз'}},users:{u1:{fcm:{tokA:'ru',tokDead:'uz'}},u2:{fcm:{tokS:'uz'}}},
 classes:{c1:{name:'7-Б',owner:'u1',members:{u2:{name:'Азиз'}}}},homework:{c1:{h1:{title:'Параграф 5'}}}};
const get=p=>p.split('/').filter(Boolean).reduce((o,k)=>o==null?o:o[k],data);
const fake={initializeApp(){},database:()=>({ref:p=>({get:async()=>({val:()=>get(p)===undefined?null:get(p)}),remove:async()=>{removed.push(p)}})}),
 messaging:()=>({sendEachForTokens:async m=>{sent.push(m);return{responses:m.tokens.map(t=>t==='tokDead'?{success:false,error:{code:'messaging/registration-token-not-registered'}}:{success:true})}}})};
const orig=Module._load;Module._load=function(r,...a){return r==='firebase-admin'?fake:orig.call(this,r,...a)};
const f=require('../functions/index.js');const ev=(params,val)=>({params,data:{val:()=>val}});
(async()=>{
 console.log('exports:',Object.keys(f).join(','));
 await f.onChatMessage.run(ev({cid:'u1_u2',mid:'m'},{from:'u2',text:'Здравствуйте! Какое домашнее задание?',at:1}));
 await f.onHomework.run(ev({cid:'c1',hid:'h1'},{title:'Параграф 5'}));
 await f.onChatMessage.run(ev({cid:'u1_u2',mid:'m2'},{from:'u1',text:'Параграф 5',at:2}));
 await f.onSubmission.run(ev({cid:'c1',hid:'h1',uid:'u2'},{name:'Азиз',text:'Готово'}));
 console.log(JSON.stringify(sent.map(s=>({tokens:s.tokens,...s.data}))));console.log('removed dead:',removed);
 const checks=[
  sent.length===6,
  sent[0].tokens.join()==='tokA'&&sent[0].data.title==='Азиз'&&sent[0].data.body==='Здравствуйте! Какое домашнее задание?',
  sent[1].tokens.join()==='tokDead'&&sent[1].data.title==='Азиз',
  sent[2].tokens.join()==='tokS'&&/Yangi topshiriq/.test(sent[2].data.title)&&sent[2].data.body==='Параграф 5',
  sent[3].tokens.join()==='tokS'&&sent[3].data.title==='Алишер Каримов'&&sent[3].data.body==='Параграф 5',
  sent[4].tokens.join()==='tokA'&&/Ответ ученика: Азиз/.test(sent[4].data.title),
  sent[5].tokens.join()==='tokDead'&&/O‘quvchi javobi: Азиз/.test(sent[5].data.title)
 ];
 const routed=checks.every(Boolean);
 const removedDead=removed.length===2&&removed.every(p=>p==='users/u1/fcm/tokDead');
 console.log('CHECK notification recipients, content and language:',routed);
 console.log('CHECK invalid tokens removed:',removedDead);
 if(!routed||!removedDead)process.exitCode=1;
})().catch(e=>{console.log('ERR',e.stack)});
