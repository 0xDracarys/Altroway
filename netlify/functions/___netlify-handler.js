const { createRequestHandler } = require('@netlify/plugin-nextjs')

exports.handler = createRequestHandler({
  build: {
    publish: '.next',
    command: 'npm run build'
  }
})
