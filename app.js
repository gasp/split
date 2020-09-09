const http = require('http')
const url = require('url').URL
const base = 'http://split.freelancis.net';

http.createServer((req, res) => {
  const u = new URL(`${base}${req.url}`)

  if (u.pathname === '/') {
    res.write(`<html>
      link a <input id="one" onkeyup="javascript:enc()" />
      link b <input id="two" onkeyup="javascript:enc()" />
      <input id="final" style="width:100%" />
      <script>function enc() {
        final.value = '${base}/r?a='
        + window.btoa(one.value)
        + '&b='
        + window.btoa(two.value)
      }</script>
    </html>`)
    res.end()
    return
  }

  const keys = u.searchParams.keys()
  const urls = []
  for (const key of keys) {
    urls.push(new Buffer(u.searchParams.get(key), 'base64').toString('ascii'))
  }

  const destination = urls[Math.floor(Math.random() * urls.length)]
  res.writeHead(301, { Location:  destination })
  res.end()
}).listen(8080)
