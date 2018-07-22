const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)

const app = express()
const isProd = process.env.NODE_ENV === 'production'
const createRenderer = (bundle, options) => {
  return createBundleRenderer(bundle, {
    ...options,
    runInNewContext: false
  })
}
let renderer
let readyPromise
const templatePath = resolve('./index.html')
if (isProd) {
  const template = require('fs').readFileSync(templatePath, 'utf-8')
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(serverBundle, { template, clientManifest })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./server-dev')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}
app.use('/dist', express.static('dist'))

app.get('*', async (req, res) => {
  const context = {
    title: 'SSR Helloworld',
    url: req.url
  }

  isProd || await readyPromise

  const response = renderer
  // Renders directly to the response stream.
  // The argument is passed as "context" to main.server.js in the SSR bundle.
    .renderToStream(context)

  response.on('error', err => {
    if (err.code === 404) {
      res.status(404).end('Страница не найдена')
    } else {
      res.status(500).end(err.message)
    }
  })
  response.pipe(res)

});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

