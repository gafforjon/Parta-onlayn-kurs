import { getStore } from '@netlify/blobs';

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
});

export default async (request) => {
  try {
    const store = getStore('parta-shared-videos');
    if (request.method === 'GET') {
      const videos = await store.get('all', { type: 'json' }) || {};
      return json({ videos });
    }
    if (!['POST', 'DELETE'].includes(request.method)) return json({ error: 'Method not allowed' }, 405);
    const adminSecret = Netlify.env.get('PARTA_ADMIN_PASSWORD');
    const teacherSecret = Netlify.env.get('PARTA_TEACHER_CODE');
    if (!adminSecret || !teacherSecret) return json({ error: 'Configure PARTA_ADMIN_PASSWORD and PARTA_TEACHER_CODE on Netlify' }, 503);
    const supplied = request.headers.get('x-editor-code') || '';
    const isAdmin = supplied === adminSecret;
    const isTeacher = supplied === teacherSecret;
    if (!supplied || (!isAdmin && !isTeacher)) return json({ error: 'Invalid administrator password or teacher code' }, 401);
    if (request.method === 'POST') {
      const probe = await request.clone().json().catch(() => ({}));
      if (probe.action === 'verify') return json({ ok: true, role: isAdmin ? 'admin' : 'teacher' });
    }
    if (request.method === 'DELETE' && !isAdmin) return json({ error: 'Only administrators can delete videos' }, 403);
    const { key, url, lang } = await request.json();
    if (typeof key !== 'string' || !/^[a-z0-9_-]+-\d+:\d+@(ru|uz)$/.test(key)) return json({ error: 'Invalid lesson key' }, 400);
    if (request.method === 'POST') {
      let parsed;
      try { parsed = new URL(url); } catch { return json({ error: 'Invalid URL' }, 400); }
      const domain = parsed.hostname.toLowerCase();
      if (parsed.protocol !== 'https:' || !['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(domain)) return json({ error: 'Only HTTPS YouTube links allowed' }, 400);
      if (!/^[\w-]{11}$/.test(parsed.searchParams.get('v') || '') && !/^[\w-]{11}$/.test(parsed.pathname.split('/').filter(Boolean).pop() || '') && !/^[\w-]{10,}$/.test(parsed.searchParams.get('list') || '')) return json({ error: 'Not a valid YouTube video or playlist' }, 400);
    }
    const videos = await store.get('all', { type: 'json' }) || {};
    if (request.method === 'DELETE') delete videos[key];
    else videos[key] = { url, lang: key.endsWith('@uz') ? 'uz' : 'ru' };
    await store.setJSON('all', videos);
    return json({ videos });
  } catch (error) { return json({ error: 'Server storage error' }, 500); }
};
