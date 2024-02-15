const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/writeToFile') {
        let data = '';

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            const { content } = JSON.parse(data);

            // 要写入的文件路径
            const filePath = 'test.txt';

            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.statusCode = 500;
                    res.end('Error writing to file');
                } else {
                    console.log('Data has been written to the file successfully.');
                    res.statusCode = 200;
                    res.end('Data has been written to the file successfully.');
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
