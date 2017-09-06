'use strict';
const fs = require('fs')
const path = require('path')
const Hapi = require('hapi')
const Good = require('good')
const Inert = require('inert')
const server = new Hapi.Server()
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Boom = require('boom')
const HapiAsyncHandler = require('hapi-async-handler')
const Promise = require('bluebird')
const readFile = Promise.promisify(fs.readFile)

server.connection({ port: 3000, host: 'localhost' })
const SwaggerOptions = {
  info: {
    'title': 'Test API Documentation',
    'version': '0.0.1'
  }
}

server.register(Inert, () => {})
server.register(Vision, () => {})
server.register({
  register: HapiSwagger,
  options: SwaggerOptions
})
server.register({
  register: require('hapi-cors'),
  options: {
    origins: ['http://localhost:8080', 'http://localhost:8081']
  }
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
})

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
      reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
})

server.route({
  method: 'GET',
  path: '/swagger/{param*}',
  handler: {
    directory: {
      path: './public/',
      redirectToSlash: true,
      index: true
    }
  }
})

server.route({
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: './public/assets',
      redirectToSlash: true,
      index: true
    }
  }
})

server.route({
  method: 'GET',
  path: '/texts/{mangaId}',
  handler: async function (req, reply) {
    const mangaId = req.params.mangaId
    if (mangaId === '5bKz6Ziz5qW86K6w') {
      const text = await readFile(path.join(__dirname, './public/texts/yueyanglouji.txt'), 'utf-8')
      reply(text)
    } else {
      reply(Boom.badRequest('invalid query'))
    }
  }
})
server.route({
  method: 'GET',
  path: '/pictures/{mangaId}',
  handler: function (req, reply) {
    const mangaId = req.params.mangaId
    if (mangaId === '5bKz6Ziz5qW86K6w') {
      reply('public/img/yueyanglouji.png')
    } else {
      reply(Boom.badRequest('invalid query'))
    }
  }
})

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
            response: '*',
            log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) {
    throw err
  }
  server.start((err) => {
    if (err) {
        throw err
    }
    server.log('info', 'Server running at: ' + server.info.uri)
  })
})
