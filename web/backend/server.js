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
const Basic = require('hapi-auth-basic')

server.connection({ port: 3000, host: 'localhost' })
const SwaggerOptions = {
  info: {
    'title': 'Test API Documentation',
    'version': '0.0.1'
  }
}

const users = {
  john: {
      username: 'admin',
      password: 'Admin753#',   // 'secret'
      name: 'John Doe',
      id: '2133d32a'
  }
}

const validate = function (request, username, password, callback) {
  const user = users[username]
  if (!user) {
    return callback(null, false)
  }

  Bcrypt.compare(password, user.password, (err, isValid) => {
    callback(err, isValid, { id: user.id, name: user.name })
  });
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
    origins: ['http://localhost:8080']
  }
})

// api/v1/login
server.register(Basic, (err) => {
  if (err) { throw err }
  server.auth.strategy('simple', 'basic', { validateFunc: validate })
  server.route({
    method: 'GET',
    path: '/api/v1/login',
    config: {
      auth: 'simple',
      handler: function (request, reply) {
        'use strict'
        reply({
          user: request.auth.credentials.name,
          login: true
        }).code(200)
      }
    }
  })
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

// api/v1/texts/guwenyuan/{id}
server.route({
  method: 'GET',
  path: '/api/v1/texts/guwenyuan/{id}',
  handler: async function (req, reply) {
    const mangaId = parseInt(req.params.id)
    console.log('manga id = ' + mangaId)
    if (mangaId >= 0 && mangaId <= 9) {
      const text = await readFile(path.join(__dirname, `./public/assets/texts/guwenyuan${mangaId}.txt`), 'utf-8')
      reply(text)
    } else {
      reply(Boom.badRequest('invalid query'))
    }
  }
})

// api/v1/pictures/guwenyuan/{id}
server.route({
  method: 'GET',
  path: '/api/v1/pictures/guwenyuan/{id}',
  handler: function (req, reply) {
    const mangaId = parseInt(req.params.id)
    if (mangaId >= 0 && mangaId <= 9) {
      reply(`public/img/guwenyuan${mangaId}.png`)
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
