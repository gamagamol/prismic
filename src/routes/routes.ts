/** @format */

import { ServerRoute } from '@hapi/hapi';
import { CreateDocument, GetDocument, GetDocumentById, UpdateDocument } from '../controller/DraftController';
import { GetDocumentByIdPublish, GetDocumentPublish, PublishDocument } from '../controller/PublishController';

export const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/draft',
    handler: GetDocument,
  },
  {
    method: 'GET',
    path: '/draft/{id}',
    handler: GetDocumentById,
  },
  {
    method: 'POST',
    path: '/draft',
    handler: CreateDocument,
  },
  {
    method: 'PUT',
    path: '/draft',
    handler: UpdateDocument,
  },
  // publish
  {
    method: 'POST',
    path: '/publish',
    handler: PublishDocument,
  },
  {
    method: 'GET',
    path: '/publish',
    handler: GetDocumentPublish,
  },
  {
    method: 'GET',
    path: '/publish/{id}',
    handler: GetDocumentByIdPublish,
  },
];
