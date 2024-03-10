/** @format */

import { Request, ResponseToolkit } from 'hapi';
import { document, documentDto } from '../dto/DraftDto';
import { GetAllDocument, GetDocumentByid, createDocument, updateDocument } from '../model/DraftModel';
import { TimeNow, validateDocument } from '../utils/utils';
export const GetDocument = async (req: Request, res: ResponseToolkit) => {
  let data = await GetAllDocument();

  return res
    .response({
      status: 200,
      message: 'ok',
      payload: data,
    })
    .code(200);
};
export const GetDocumentById = async (req: Request, res: ResponseToolkit) => {
  let id = req.params.id;
  let data = await GetDocumentByid(id);

  return res
    .response({
      status: 200,
      message: 'ok',
      payload: data,
    })
    .code(200);
};

export const CreateDocument = async (req: Request, res: ResponseToolkit) => {
  try {
    let data: any = req.payload;
    let title: string = data.title;
    let content: string = data.content;
    let creator_id: number = data.creator;

    let validate = validateDocument(data, false);

    if (validate != null) {
      return res
        .response({
          status: 400,
          message: validate,
        })
        .code(400);
    }

    let document: documentDto = {
      title,
      content,
      creator_id,
      created_at: TimeNow(),
      current_version: 1,
      updated_at: null,
      author_id: null,
      history: [],
    };

    await createDocument(document);
    return res.response({ status: 201, message: 'Success Insert New Document', payload: document }).code(201);
  } catch (error) {
    return res
      .response({
        status: 500,
        message: 'Internal Server Error',
      })
      .code(500);
  }
};
export const UpdateDocument = async (req: Request, res: ResponseToolkit) => {
  try {
    let data: any = req.payload;
    let id: string = data.id;

    let title: string = data.title;
    let content: string = data.content;
    let author_id: number = data.author;

    // validate input data
    let validate = validateDocument(data, true);

    if (validate != null) {
      return res
        .response({
          status: 400,
          message: validate,
        })
        .code(400);
    }

    // check id document is exist

    let document = await GetDocumentByid(id);

    if (document.length < 1) {
      return res
        .response({
          status: 400,
          message: 'Id Document Not Found',
        })
        .code(400);
    }

    // check document is there any change?

    if (document[0].title == title && document[0].content == content) {
      return res
        .response({
          status: 201,
          message: 'There are no changes in the document',
        })
        .code(201);
    }

    let old_version: document = {
      title: document[0].title,
      content: document[0].content,
      current_version: document[0].current_version,
      created_at: document[0].created_at,
      creator_id: document[0].creator_id,
    };

    let old_data: document[] = document[0].history;
    old_data.push(old_version);

    let new_version: documentDto = {
      title,
      content,
      author_id,
      updated_at: TimeNow(),
      current_version: document[0].current_version + 1,
      history: old_data,
    };

    updateDocument(id, new_version);

    return res.response({ status: 201, message: 'Success Update  Document' }).code(201);
  } catch (error) {
    return res
      .response({
        status: 500,
        message: 'Internal Server Error',
      })
      .code(500);
  }
};
