// Simple test server for PortChecker demo
const http = require('http');

const PORT = 8888;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
          }
          h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.2rem;
            opacity: 0.9;
          }
          .port {
            font-size: 4rem;
            font-weight: bold;
            margin: 2rem 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Test Server Running</h1>
          <div class="port">${PORT}</div>
          <p>Bu server'ı PortChecker ile kill edebilirsin!</p>
          <p style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.7;">
            PortChecker uygulamasını aç ve bu port'u bul
          </p>
        </div>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`\n🚀 Test server running on port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`\n💡 Şimdi yapabileceklerin:`);
  console.log(`   1. http://localhost:${PORT} adresini tarayıcıda aç`);
  console.log(`   2. PortChecker'ı başlat: npm run dev`);
  console.log(`   3. Active Ports tab'ında port ${PORT}'u gör`);
  console.log(`   4. Kill butonuna basarak bu server'ı kapat\n`);
  console.log(`⚠️  Durdurmak için: Ctrl+C veya PortChecker'dan kill et\n`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} zaten kullanılıyor!`);
    console.error(`💡 Farklı bir port dene veya o port'u kullananan process'i kapat.\n`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});
