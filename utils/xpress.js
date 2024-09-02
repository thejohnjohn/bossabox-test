/* eslint-disable prefer-rest-params */
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
      DELETE: {},
    };
  }

  setupMethods() {
    this.get = this.registerRoute('GET');
    this.post = this.registerRoute('POST');
    this.put = this.registerRoute('PUT');
    this.del = this.registerRoute('DELETE');
  }

  // eslint-disable-next-line consistent-return
  async handleRequest(req, res) {
    // eslint-disable-next-line no-param-reassign
    req = await this.setupRequest(req);
    // eslint-disable-next-line no-param-reassign
    res = this.setupResponse(res);

    const routes = Object.keys(this.router[req.method]);

    console.log(`Array com todas as rotas pelo método ${req.method}: ${routes}`);

    let routeIsValid;
    let result;

    routes.forEach((item) => {
      var regex = new RegExp(item);

      console.log(`Regex: ${regex} | URL da requisição: ${req.url}`);

      console.log(`Resultado: ${regex.test(req.url)}`);

      routeIsValid = regex.test(req.url);

      result = routeIsValid ? item : null

      console.log(`Resultado da rota: ${result}`);
    });
    
    if (routeIsValid) {
      this.router[req.method][result](req, res);
    } else {
      res.statusCode = 404;
      res.write('not found');
      return res.end();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setupRequest(request) {
    request.body = '';

    request.on('data', (chunk) => {
      request.body += chunk.toString();
    });

    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => request.on('end', () => {
      request.body = request.body ? JSON.parse(request.body) : '';
      resolve(request);
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  setupResponse(response) {
    response.status = (statusCode) => {
      response.statusCode = statusCode;
      return response;
    };

    response.send = (responseBody) => {
      response.write(responseBody);
      response.end();
    };

    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  registerRoute(method) {
    return function (route, callback) {
      this.router[method][route] = callback;
    };
  }

  listen() {
    const args = Array.prototype.slice.call(arguments);
    // eslint-disable-next-line prefer-spread
    return this.server.listen.apply(this.server, args);
  }
}

module.exports = new Xpress();
