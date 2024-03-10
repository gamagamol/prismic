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

      return pactum.spec().post('draft').withBody(data).expectStatus(201).inspect().stores('document_id', 'payload._id');
    });

    it('success get by id', () => {
      return pactum.spec().get('draft/$S{document_id}').expectStatus(200);
    });

    it('success update', () => {
      let data = {
        id: '$S{document_id}',
        title: 'Title',
        content: 'Content',
        author: 1,
      };

      return pactum.spec().put('draft').withBody(data).expectStatus(201);
    });
  });

  describe('publish', () => {
    it('Get ALL', () => {
      return pactum.spec().get('publish').expectStatus(200);
    });

    it('success create publish', () => {
      let data = {
        id: '$S{document_id}',
        version: 1,
      };

      return pactum.spec().post('publish').withBody(data).expectStatus(201).inspect().stores('publish_id', 'payload._id');
    });

    it('success get by id', () => {
      return pactum.spec().get('publish/$S{publish_id}').expectStatus(200);
    });
  });
});
