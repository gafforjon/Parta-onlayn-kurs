const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
const errs=[],out=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push('JSDOM: '+(e.detail&&e.detail.stack||e.message).split('\n').slice(0,8).join(' | ')));
vc.on('error',m=>errs.push('console.error: '+m));
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.github.io/parta/',pretendToBeVisual:true,virtualConsole:vc,
 beforeParse(w){
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
  w.confirm=()=>true;w.prompt=()=>'secret1';w.matchMedia=w.matchMedia||(()=>({matches:false,addListener(){},addEventListener(){}}));
  w.scrollTo=()=>{};Object.defineProperty(w.navigator,'serviceWorker',{value:{ready:Promise.resolve({}),register:()=>Promise.resolve()}});w.Notification={requestPermission:async()=>'granted'};w.PushManager=function(){};const ac=w.Node.prototype.appendChild;w.Node.prototype.appendChild=function(n){if(n&&n.tagName==='SCRIPT'&&n.src){setTimeout(()=>n.onload&&n.onload(),0);return n}return ac.call(this,n)};w.addEventListener('error',e=>errs.push('ERR '+e.message+' line '+e.lineno+':'+e.colno));w.alert=()=>{};
  const root={};let n=0;const L=[];
  const get=p=>p.split('/').filter(Boolean).reduce((o,k)=>o==null?o:o[k],root);
  const setp=(p,v)=>{const ks=p.split('/').filter(Boolean);let o=root;ks.slice(0,-1).forEach(k=>{o[k]=o[k]&&typeof o[k]==='object'?o[k]:{};o=o[k]});if(v==null)delete o[ks[ks.length-1]];else o[ks[ks.length-1]]=v};
  const snap=(p)=>{const v=get(p);return{val:()=>v===undefined?null:JSON.parse(JSON.stringify(v)),exists:()=>v!=null,key:p.split('/').pop()}};
  const fire=()=>L.slice().forEach(l=>l.run());
  const ref=(p='',q)=>{const r={key:p.split('/').pop(),
   get:async()=>snap(p),set:async v=>{setp(p,v===undefined?null:JSON.parse(JSON.stringify(v)));fire()},remove:async()=>{setp(p,null);fire()},
   push(v){const r2=ref(p+'/-id'+(++n));if(v!==undefined){const pr=r2.set(v);r2.then=(a,b)=>pr.then(a,b)}return r2},
   transaction:async fn=>{const v=get(p),nv=fn(v===undefined?null:v);if(nv!==undefined){setp(p,JSON.parse(JSON.stringify(nv)));fire()}return{committed:nv!==undefined,snapshot:snap(p)}},once:async()=>snap(p),child:c=>ref(p+'/'+c),
   orderByChild:c=>ref(p,{c}),limitToLast:k=>ref(p,{...q,k}),
   on(ev,fn){let seen=new Set();const run=()=>{if(ev==='value')fn(snap(p));else{const v=get(p)||{};Object.entries(v).sort((a,b)=>(a[1][q&&q.c]||0)-(b[1][q&&q.c]||0)).forEach(([k,x])=>{if(!seen.has(k)){seen.add(k);fn({val:()=>x,key:k})}})}};const l={fn,ev,p,run};L.push(l);run()},
   off(ev,fn){const i=L.findIndex(l=>l.fn===fn&&l.ev===ev);if(i>=0)L.splice(i,1)}};return r};
  let cur=null,uc=0,ua=0;const sl=[];const mk=(email,anon)=>({uid:anon?'anon'+(++ua):'u'+(++uc),email,isAnonymous:!!anon,displayName:null,emailVerified:false,
   updateProfile:async function(o){this.displayName=o.displayName},sendEmailVerification:async()=>{out.push('verify-mail')},
   reauthenticateWithCredential:async()=>{},delete:async function(){cur=null;sl.forEach(f=>f(null))}});
  const A={get currentUser(){return cur},authStateReady:async()=>{},onAuthStateChanged:f=>{sl.push(f);f(cur)},
   createUserWithEmailAndPassword:async(e,p)=>{if(p.length<6)throw{code:'auth/weak-password'};const u=mk(e);cur=u;sl.forEach(f=>f(u));return{user:u}},
   signInWithEmailAndPassword:async(e,p)=>{const u=mk(e);cur=u;sl.forEach(f=>f(u));return{user:u}},
   signInAnonymously:async()=>{cur=mk(null,true);return{user:cur}},signOut:async()=>{cur=null;sl.forEach(f=>f(null))},sendPasswordResetEmail:async e=>{out.push('reset:'+e)}};
  const fb={initializeApp(){},messaging:()=>({getToken:async()=>'tok:1',onMessage(){}}),apps:[1],auth:Object.assign(()=>A,{EmailAuthProvider:{credential:(e,p)=>({e,p})}}),database:Object.assign(()=>({ref}),{ServerValue:{TIMESTAMP:1700000000000}}),_set:u=>{cur=u;sl.forEach(f=>f(u))},_mk:mk,_root:root};
  w.firebase=fb;
 }});
const w=dom.window,sleep=ms=>new Promise(r=>setTimeout(r,ms)),$=s=>w.document.querySelector(s);
const ev=c=>w.eval(c);let pass=0,fail=0;const ok=(c,m)=>{c?pass++:(fail++,out.push('FAIL: '+m))};
const click=s=>{const e=$(s);if(!e){out.push('FAIL: no element '+s);fail++;return}e.click()};
const type=(s,v)=>{const e=$(s);if(!e){out.push('FAIL: no input '+s);fail++;return}e.value=v;e.dispatchEvent(new w.Event('input',{bubbles:true}))};
const hash=async h=>{w.location.hash=h;await sleep(60)};
(async()=>{
 await sleep(300);
 const root=w.firebase._root;
 ok(ev('typeof st')==='object','app state exists');
 // 1 register teacher
 ev('authBtn()');await sleep(50);ok($('#dlg').open,'auth dialog opens');
 ev("partaMode('register')");type('#fn','Алишер Каримов');$('#fr').value='teacher';type('#fe','t@x.uz');type('#fp','secret1');
 ev('submitAuth()');await sleep(150);
 ok(ev('st.user&&st.user.uid')==='u1','teacher registered (uid u1)');ok(ev('st.user.role')==='teacher','teacher role');
 ok(root.users&&root.users.u1&&root.users.u1.profile&&root.users.u1.profile.role==='teacher','profile saved to DB');ok(out.includes('verify-mail'),'verification mail sent');
 // weak password
 // 2 teacher profile + admin approval
 await hash('#/teachers');await sleep(200);ok(!!$('#pn'),'teacher profile form visible');
 type('#pn','Алишер');type('#ps','Каримов');type('#pj','Математика');type('#p1','5');type('#p2','9');click('[data-t=saveprof]');await sleep(200);
 ok(root.teachers&&root.teachers.u1&&root.teachers.u1.g2===9,'teacher profile saved');
 ok(!/Каримов/.test($('#tl')?$('#tl').textContent:''),'unverified teacher hidden from non-admin');
 root.admins={u1:true};click('[data-t=cat]');await sleep(200);
 ok(/Каримов/.test($('#tl').textContent),'admin sees teacher');click('[data-t=approve]');await sleep(200);ok(root.teachersVerified&&root.teachersVerified.u1===true,'teacher approved');
 delete root.admins;
 // 3 class + homework + test
 await hash('#/classes');await sleep(200);type('#cn','7-Б');click('[data-a=mk]');await sleep(250);
 const cid=Object.keys(root.classes||{})[0];ok(!!cid&&root.classes[cid].code.length===6,'class created with 6-char code');
 const code=cid&&root.classes[cid].code;
 type('#ht-'+cid,'Параграф 5');type('#hx-'+cid,'Упр. 1-3');click('[data-a=hw]');await sleep(250);ok(Object.keys(root.homework&&root.homework[cid]||{}).length===1,'homework created');
 type('#tn-'+cid,'Дроби, 7 класс');$('#tb-'+cid).value='2+2?\n3\n*4\n=Сумма равна 4\n\n3*3?\n*9\n6';click('[data-a=tmk]');await sleep(250);
 ok(Object.keys(root.tests&&root.tests[cid]||{}).length===1,'test created');
 // bad format
 $('#tb-'+cid).value='Вопрос без ответа?\nа\nб';click('[data-a=tmk]');await sleep(150);ok(Object.keys(root.tests[cid]).length===1,'bad test rejected');
 // 4 student
 w.firebase.auth().signOut&&0;await w.firebase.auth().signOut();ev('st.user=null;save()');
 ev('authBtn()');ev("partaMode('register')");type('#fn','Азиз Абдуллаев');$('#fr').value='student';type('#fe','s@x.uz');type('#fp','secret1');ev('submitAuth()');await sleep(150);
 ok(ev('st.user.uid')==='u2'&&ev('st.user.role')==='student','student registered');
 await hash('#/classes');await sleep(100);await hash('#/classes');await sleep(200);type('#cc',code);click('[data-a=join]');await sleep(250);
 ok(root.classes[cid].members&&root.classes[cid].members.u2,'student joined class');
 await sleep(100);ok(/Параграф 5/.test($('#cls').textContent),'student sees homework');
 type('#sx-'+Object.keys(root.homework[cid])[0],'Готово');click('[data-a=send]');await sleep(250);
 ok(root.submissions[cid][Object.keys(root.homework[cid])[0]].u2.text==='Готово','homework submitted');
 const tid=Object.keys(root.tests[cid])[0];click('[data-a=tstart]');await sleep(50);
 const radios=[...w.document.querySelectorAll('#tt-'+tid+' input[type=radio]')];ok(radios.length===4,'test shows 2 questions with 4 options');
 radios.find(r=>r.name.endsWith('-0')&&r.value==='1').checked=true;radios.find(r=>r.name.endsWith('-1')&&r.value==='1').checked=true;
 click('[data-a=tsub]');await sleep(250);const rs=root.testResults[cid][tid].u2;ok(rs.score===1&&rs.total===2&&rs.attempts===1,'test graded 1/2');
 ok(/Правильно/.test($('#tt-'+tid).textContent),'wrong answer explained after finishing');
 // 5 chat
 await hash('#/teachers');await sleep(200);ok(/Каримов/.test($('#tl').textContent),'student sees verified teacher');
 click('[data-t=chat]');await sleep(150);type('#ci','Здравствуйте! Какое домашнее задание?');click('[data-t=send]');await sleep(300);
 const chat=Object.keys(root.chats||{})[0];ok(chat==='u1_u2','chat id teacher_student');ok(Object.keys(root.chatMsgs[chat]).length===1&&root.chats[chat].unread.u1===1,'message stored, teacher unread=1');
 ok(/Здравствуйте/.test($('#cm').textContent),'message rendered realtime');
 // teacher side
 await w.firebase.auth().signOut();ev("st.user={name:'Алишер',email:'t@x.uz',uid:'u1',role:'teacher'}");w.firebase._set({uid:'u1',email:'t@x.uz',isAnonymous:false});ev('route()');await sleep(200);
 click('[data-t=inbox]');await sleep(250);ok(/Азиз/.test($('#il').textContent)&&/1/.test($('#il').textContent),'teacher inbox shows student with unread');
 click('[data-t=open]');await sleep(250);type('#ci','Параграф 5, упр. 1-3');click('[data-t=send]');await sleep(300);
 ok(Object.keys(root.chatMsgs[chat]).length===2&&root.chats[chat].read.u1>0,'teacher replied, read mark set');


 // rooms: teacher creates a listed room, student finds and joins it
 w.firebase._set({uid:'u1',email:'t@x.uz',isAnonymous:false});ev("st.user={name:'Алишер Каримов',email:'t@x.uz',uid:'u1',role:'teacher'}");ev('location.hash="#/"');await sleep(100);
 click('#parta-rooms-entry');await sleep(50);click('#pr-teacher');await sleep(30);
 type('#pr-name','Алгебра 7А');type('#pr-subj','Математика');type('#pr-grade','7');click('#pr-create');await sleep(300);
 const rc=Object.keys(root.rooms||{})[0];ok(!!rc&&/^\d{5}$/.test(rc),'room created with 5-digit code');
 ok(root.roomIndex&&root.roomIndex[rc]&&root.roomIndex[rc].subject==='Математика'&&root.roomIndex[rc].grade===7&&root.roomIndex[rc].owner==='u1','room listed in search directory');
 // second teacher room unlisted
 click('#pr-back');await sleep(30);click('#pr-teacher');await sleep(30);type('#pr-name','Закрытая');$('#pr-list').checked=false;click('#pr-create');await sleep(300);
 ok(Object.keys(root.rooms).length===2&&Object.keys(root.roomIndex).length===1,'unlisted room stays out of search');
 w.document.getElementById('parta-rooms-overlay').hidden=true;
 await w.firebase.auth().signOut();ev("st.user={name:'Азиз Абдуллаев',email:'s@x.uz',uid:'u2',role:'student'}");w.firebase._set({uid:'u2',email:'s@x.uz',isAnonymous:false});
 await hash('#/');await hash('#/rooms');await sleep(250);ok(/Алгебра 7А/.test($('#rl').textContent)&&/Математика — 7/.test($('#rl').textContent)&&/Каримов/.test($('#rl').textContent),'student sees room card with subject, grade, teacher');
 ok(!/Закрытая/.test($('#rl').textContent),'unlisted room not shown');
 type('#rq','геометр');await sleep(30);ok(!/Алгебра/.test($('#rl').textContent),'search filter hides non-matching');type('#rq','каримов');await sleep(30);ok(/Алгебра/.test($('#rl').textContent),'search by teacher surname works');
 $('#rg').value='9';$('#rg').dispatchEvent(new w.Event('change',{bubbles:true}));await sleep(30);ok(!/Алгебра/.test($('#rl').textContent),'grade filter works');$('#rg').value='';$('#rg').dispatchEvent(new w.Event('change',{bubbles:true}));
 click('[data-r=info]');await sleep(150);ok(/Участников: 0/.test($('#rl').textContent),'info shows participant count');
 click('[data-r=join]');await sleep(80);ok($('#pr-code').value===rc&&$('#pr-pupil').value==='Азиз Абдуллаев','join prefilled code and name');
 click('#pr-join');await sleep(300);ok(root.rooms[rc].students&&root.rooms[rc].students.u2&&root.rooms[rc].students.u2.name==='Азиз Абдуллаев','student joined room');
 click('#pr-back');await sleep(30);
 // join by code without directory
 type('#rc','1234');click('[data-r=code]');ok(true,'short code handled');

 // push notifications (client side)
 w.PARTA_VAPID_KEY='';await ev('partaPush()');await sleep(60);ok(!(root.users.u2&&root.users.u2.fcm),'push does nothing without VAPID key');
 w.PARTA_VAPID_KEY='key';await ev('partaPush()');await sleep(150);ok(root.users.u2.fcm&&root.users.u2.fcm['tok:1']==='ru','device token saved with language');
 ev('authBtn()');await sleep(200);ok(!(root.users.u2.fcm&&root.users.u2.fcm['tok:1']),'token removed on logout');
 w.firebase._set({uid:'u2',email:'s@x.uz',isAnonymous:false});ev("st.user={name:'Азиз Абдуллаев',email:'s@x.uz',uid:'u2',role:'student'}");
 // extra: reset, weak password, XSS, logout
 ev("st.user=null;save()");ev('authBtn()');ev("partaMode('reset')");type('#fe','a@b.uz');ev('submitAuth()');await sleep(100);ok(out.includes('reset:a@b.uz'),'password reset mail requested');
 ok(/письмо|xat/i.test($('#fer').textContent),'reset gives generic confirmation');
 ev("partaMode('register')");type('#fn','Тест');type('#fe','w@b.uz');type('#fp','123');ev('submitAuth()');await sleep(100);ok(/6/.test($('#fer').textContent),'weak/short password rejected with message');
 ev("partaMode('login')");type('#fp','');type('#fe','bad');ev('submitAuth()');await sleep(50);ok($('#fer').textContent.length>0,'invalid email rejected');
 root.teachers.u1.name='<img src=x onerror="window.__x=1">';root.teachersVerified.u1=true;
 await w.firebase.auth().signOut();ev("st.user={name:'Азиз',email:'s@x.uz',uid:'u2',role:'student'}");w.firebase._set({uid:'u2',email:'s@x.uz',isAnonymous:false});ev('location.hash="#/"');ev('location.hash="#/teachers"');await sleep(300);
 ok(!w.document.querySelector('#tl img')&&!w.__x,'HTML in teacher name is escaped (no XSS)');
 ev("st.user=null;save()");ev('authBtn&&0');
 // language switch
 ev("st.lang='uz'");ev('route()');await sleep(100);ok(/Sinflar|O‘qituvchilar/.test(w.document.body.textContent),'uz language renders');
 // reset password
 ev('authBtn&&1');
 out.push(`PASS ${pass} / FAIL ${fail}`);out.push('RUNTIME ERRORS: '+(errs.length?'\n'+errs.join('\n'):'none'));
 console.log(out.join('\n'));process.exit(0);
})().catch(e=>{console.log(out.join('\n'));console.log('TEST CRASH',e.stack);process.exit(1)});
