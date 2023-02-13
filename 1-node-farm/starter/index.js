const fs = require(`fs`);
const http = require(`http`);

////////////////////////////////////////////////////////
///Files
//Synchronous
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is what we know about the avocado ${textIn}. \nCreated on ${Date.now()}`;

// fs.writeFileSync(`./txt/output.txt`, textOut);
// console.log(`Text Writen`);

//Asynch
// fs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
//   console.log(data1, err);
//   fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         `./txt/output.txt`,
//         `${data2}\n\n${data3}\n\n❤`,
//         `utf-8`,
//         (err) => {}
//       );
//       console.log(`File Written`);
//     });
//   });
// });
// console.log(`After Read Log`);

////////////////////////////////////////////////////////
///Server

let message = `I'm server!`;

const server = http.createServer((req, res) => {
  console.log(req);
  res.end(`Hello World \n${message}`);
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`Listening on poert 8000`);
});
