/** @format */

import { Server } from '@hapi/hapi';
import { routes } from './routes/routes';

const server = new Server({
  port: 3000,
  host: 'localhost',
});

server.route(routes);
server.start();
console.log("Server Running on localhost port 3000");



export default server;
