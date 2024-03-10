/** @format */

import { Server } from '@hapi/hapi';
import * as pactum from 'pactum';

import { routes } from '../src/routes/routes';
describe('App e2e', () => {
  beforeAll(async () => {
    const server = new Server({
      port: 3000,
      host: 'localhost',
    });

    server.route(routes);
    server.start();
    pactum.request.setBaseUrl('http://localhost:3000/');
  });
  describe('draft', () => {
    it('Get ALL', () => {
      return pactum.spec().get('draft').expectStatus(200);
    });

    it('success create draft', () => {
      let data = {
        title: 'Title',
        content: 'Content',
        creator: 1,
      };

      return pactum.spec().post('draft').withBody(data).expectStatus(201);
    });

    it('success get by id', () => {
      return pactum
        .spec()
        .get('draft/' + '65ed731e171d077480cb9b72') //id should be changed depending on your mongo db
        .expectStatus(200);
    });

    it('success update', () => {
      let data = {
        id: '65ed731e171d077480cb9b72', //id should be changed depending on your mongo db
        title: 'Title',
        content: 'Content',
        author: 1,
      };

      return pactum
        .spec()
        .put('draft')
        .withBody(data)
        .expectStatus(201)
        .expect((res: any) => {
          console.log('Response:', res); // Debugging: Cetak respons ke konsol
          console.log('Body:', res.body); // Debugging: Cetak body respons ke konsol
        });
    });
  });
  describe('publish', () => {
    it('Get ALL', () => {
      return pactum.spec().get('publish').expectStatus(200);
    });

    it('success create publish', () => {
      let data = {
        id: '65ed731e171d077480cb9b72', //depens id draft in your mongo db
        version: 1,
      };

      return pactum.spec().post('publish').withBody(data).expectStatus(201);
    });

    it('success get by id', () => {
      return pactum
        .spec()
        .get('publish/' + '65ed731e171d077480cb9b72') //id should be changed depending on your mongo db
        .expectStatus(200);
    });
  });
});
