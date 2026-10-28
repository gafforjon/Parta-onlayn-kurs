import { getStore } from '@netlify/blobs';
import { randomInt, randomUUID } from 'node:crypto';
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const clean=(x,n=80)=>typeof x==='string'?x.trim().slice(0,n):'';
export default async(request)=>{
 try {
  const store=getStore('parta-classrooms');
  const url=new URL(request.url);
  let data={};
  if(request.method==='POST') data=await request.json().catch(()=>({}));
  const action=request.method==='GET'?'view':clean(data.action,30);
  if(!['GET','POST'].includes(request.method)) return reply({error:'Method not allowed'},405);
  const code=clean(request.method==='GET'?url.searchParams.get('code'):data.code,5);
  if(action==='create') {
   const admin=process.env.PARTA_ADMIN_PASSWORD || Netlify.env.get('PARTA_ADMIN_PASSWORD');
   const teacher=process.env.PARTA_TEACHER_CODE || Netlify.env.get('PARTA_TEACHER_CODE');
   const supplied=clean(request.headers.get('x-editor-code'),256);
   if(!supplied || !((admin && supplied===admin)||(teacher && supplied===teacher)))return reply({error:'Неверный пароль администратора или код учителя'},401);
   const name=clean(data.name,70);
   if(!name)return reply({error:'Введите название комнаты'},400);
   let newCode;
   for(let i=0;i<25;i++){const candidate=String(randomInt(10000,100000));if(!await store.get(`room-${candidate}`)){newCode=candidate;break;}}
   if(!newCode)return reply({error:'Не удалось выделить код'},503);
   const room={code:newCode,name,createdAt:new Date().toISOString(),students:[],ownerToken:randomUUID()};
   await store.setJSON(`room-${newCode}`,room);
   return reply({room:{code:newCode,name,students:[],createdAt:room.createdAt},ownerToken:room.ownerToken});
  }
  if(!/^\d{5}$/.test(code))return reply({error:'Код должен состоять из 5 цифр'},400);
  const room=await store.get(`room-${code}`,{type:'json'});
  if(!room)return reply({error:'Комната не найдена'},404);
  if(action==='join'){
   const name=clean(data.name,50);
   if(!name)return reply({error:'Введите имя ученика'},400);
   const studentId=clean(data.studentId,80)||randomUUID();
   if(!room.students.some(s=>s.id===studentId))room.students.push({id:studentId,name,joinedAt:new Date().toISOString()});
   await store.setJSON(`room-${code}`,room);
   return reply({room:{code,name:room.name,students:room.students},studentId});
  }
  if(action==='close'){
   if(!data.ownerToken||data.ownerToken!==room.ownerToken)return reply({error:'Нет доступа'},403);
   await store.delete(`room-${code}`);return reply({ok:true});
  }
  if(action==='view')return reply({room:{code,name:room.name,students:room.students,createdAt:room.createdAt}});
  return reply({error:'Unknown action'},400);
 }catch(e){return reply({error:'Ошибка сервера комнат'},500);}
};
