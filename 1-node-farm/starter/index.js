const fs = require(`fs`);
const http = require(`http`);
const { default: slugify } = require("slugify");
const url = require(`url`);
require(`slugify`);
const replaceTemplate = require(`./modules/replaceTemplate`);

////////////////////////////////////////////////////////
///Files
//Synchronous
// const textIn = fs.readFileSync("${__dirname}}/txt/input.txt", "utf-8");

// const textOut = `This is what we know about the avocado ${textIn}. \nCreated on ${Date.now()}`;

// fs.writeFileSync(`${__dirname}}/txt/output.txt`, textOut);

//Asynch
// fs.readFile(`${__dirname}}/txt/start.txt`, `utf-8`, (err, data1) => {
//   fs.readFile(`${__dirname}}/txt/${data1}.txt`, `utf-8`, (err, data2) => {
//     fs.readFile(`${__dirname}}/txt/append.txt`, `utf-8`, (err, data3) => {
//       fs.writeFile(
//         `${__dirname}}/txt/output.txt`,
//         `${data2}\n\n${data3}\n\n❤`,
//         `utf-8`,
//         (err) => {}
//       );
//     });
//   });
// });

////////////////////////////////////////////////////////
///Server

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  `utf-8`
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  `utf-8`
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  `utf-8`
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === `/overview` || pathname === `/`) {
    res.writeHead(200, { contentType: "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(``);

    const output = tempOverview.replace(`{% CARDS %}`, cardsHtml);

    res.end(output);
  } else if (pathname === `/product`) {
    res.writeHead(200, { contentType: "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === `/api`) {
    res.writeHead(200, { contentType: "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end(`<h1>404 - PAGE NOT FOUND</h1>`);
  }
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`Practice Server 127.0.0.1:8000`);
});
