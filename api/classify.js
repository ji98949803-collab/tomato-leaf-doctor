// 파일 경로: api/classify.js
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const { image } = req.body || {};
    if (!image) return res.status(400).json({ error: 'no image' });
    const api = `https://classify.roboflow.com/${process.env.DATASET}/${process.env.VERSION}?api_key=${process.env.ROBOFLOW_API_KEY}`;
    const rf = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: image });
    const text = await rf.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(rf.status).send(text);
  } catch (e) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ error: e.message || 'proxy error' });
  }
}
  </pre>
  <p class="hint">Vercel 대시보드 → Settings → Environment Variables에 <code>q6m5XHkMpY9rYsxDaNi6</code>, <code>tomato-v3-aykdz</code> (예: <code>tomato-v3-슬러그</code>), <code>3</code> (예: <code>3</code>)을 추가하세요.</p>
</section>
</body>
</html>
