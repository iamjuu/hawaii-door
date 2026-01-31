const http = require('http');

http.get('http://localhost:3000/api/products?category=interior&limit=100', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.success) {
        const types = [...new Set(json.data.map(d => d.doorType))];
        console.log('Unique Door Types:', JSON.stringify(types, null, 2));
        const panelDoors = json.data.filter(d => (d.doorType || '').toLowerCase().includes('panel'));
        console.log('Panel Doors count:', panelDoors.length);
        if (panelDoors.length > 0) {
          console.log('Sample Panel Door:', JSON.stringify(panelDoors[0], (k,v) => k==='imageUrl' ? [v[0]] : v, 2));
        }
      } else {
        console.log('API Error:', json.message);
      }
    } catch (e) {
      console.log('Parse Error:', e.message);
      console.log('Raw Data sample:', data.substring(0, 100));
    }
  });
}).on('error', (err) => {
  console.log('Fetch Error:', err.message);
});
