import { createServer } from "http";
import { createHash } from "crypto";

let server = createServer((req, res) => {
  switch (req.url) {
    case "/": {
      let html = createPage("Home");
      let etag = md5(html);
      if (etag === req.headers["if-none-match"]) {
        res.writeHead(304);
        res.end();
      } else {
        res.writeHead(200, {
          "cache-control": "max-age=10",
          etag,
        });
        res.end(html);
      }
      break;
    }
    case "/about": {
      let html = createPage("About");
      res.end(html);
      break;
    }
  }
});

server.listen(3000);

function createPage(title) {
  return `
        <!DOCTYPE html>
        <html lang=en>
        <head>
            <meta charset=UTF-8>
            <meta name=viewport content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link rel="icon" class="js-site-favicon" type="image/svg+xml" href="https://adityakamble.vercel.app/favicon.ico">
        </head>
        <body>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>

            <h1>${title}</h1>
            <hr />
            
            ${Array.from({ length: 1000 })
              .map(() => "<div>Rocket Rakoon 🚀/div>")
              .join("/n")}
        </body>
        </html>
`;
}

function md5(str) {
  return createHash("md5").update(str).digest("hex");
}
