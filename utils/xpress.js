const http = require('http');

class Xpress {
    constructor() {
        this.server = http.createServer();
        this.setupRoutes();
        this.setupMethods();
        this.server.on('request', this.handleRequest.bind(this));
    }

    setupRoutes() {
        this.router = {
            GET: {},
            POST: {},
            PUT: {},
            DEL: {}
        };
    }

    setupMethods() {
        this.get = this.registerRoute('GET');
        this.post = this.registerRoute('POST');
        this.put = this.registerRoute('PUT');
        this.del = this.registerRoute('DEL');
    }

    async handleRequest(req, res) {
        req = await this.setupRequest(req);
        res = this.setupResponse(res);

        if (!this.router[req.method][req.url]) {
            res.statusCode = 404;
            res.write('not found');
            return res.end();
        }

        this.router[req.method][req.url](req, res);
    }

    setupRequest(request) {
        request.body = '';

        request.on('data', chunk => {
            request.body += chunk.toString();
        });

        return new Promise(resolve => request.on('end', () => {
            request.body = request.body ? JSON.parse(request.body) : '';
            resolve(request);
        }));
    }

    setupResponse(response) {
        response.status = (statusCode) => {
            response.statusCode = statusCode;
            return response;
        }

        response.send = (responseBody) => {
            response.write(responseBody);
            response.end();
        }

        return response;
    }

    registerRoute(method) {
        return function (route, callback) {
            this.router[method][route] = callback;
        }
    }

    listen() {
        const args = Array.prototype.slice.call(arguments);
        return this.server.listen.apply(this.server, args);
    }
}

module.exports = new Xpress();

