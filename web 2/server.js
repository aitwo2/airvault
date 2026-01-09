const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 8000;
const BASE_DIR = __dirname;

const server = http.createServer((req, res) => {
    let url = req.url === '/' ? '/index.html' : req.url;
    let filePath = path.join(BASE_DIR, url);
    
    // Normalize and validate path
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(BASE_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf'
    };

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`\n🚀 AirVault Accessories is running!`);
    console.log(`🌐 Open: http://localhost:${PORT}`);
    console.log(`📁 Directory: ${BASE_DIR}\n`);
});

