'use strict';

const Hapi = require('hapi')
const Good = require('good')
const Inert = require('inert')
const server = new Hapi.Server()
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')

server.connection({ port: 3000, host: 'localhost' });

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
