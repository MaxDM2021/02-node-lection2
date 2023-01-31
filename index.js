
// const http =require('http');
// const fs = require('fs').promises;


// const PORT = 8081;

// const requestHandler =async (request, response) => {
// const manifest = await fs.readFile('./package.json', 'utf8');
// response.writeHead(200, {'Content-type': 'text/json'});
// return response.end(manifest);
// }

// const server = http.createServer(requestHandler);

// server.listen(PORT, (err) => {
// if (err) {
//     console.error('Error at aserver launch', err);
// }
// console.log(`Server works at ${PORT}!`);
// });