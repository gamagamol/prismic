/** @format */

import { Request, ResponseToolkit } from 'hapi';
import { Publish, PublishDto } from '../dto/PublishDto';
import { GetDocumentByid } from '../model/DraftModel';
import { GetAllDocumentPublish, GetDocumentByidDraft, GetDocumentByidPublish, createDocumentPublish, updateDocumentPublish } from '../model/PublishModel';
import { TimeNow, validatePublish } from '../utils/utils';

export const GetDocumentPublish = async (req: Request, res: ResponseToolkit) => {
  let data = await GetAllDocumentPublish();

  return res
    .response({
      status: 200,
      message: 'ok',
      payload: data,
    })
    .code(200);
};
export const GetDocumentByIdPublish = async (req: Request, res: ResponseToolkit) => {
  let id = req.params.id;
  let data = await GetDocumentByidPublish(id);

  return res
    .response({
      status: 200,
      message: 'ok',
      payload: data,
    })
    .code(200);
};

export const PublishDocument = async (req: Request, res: ResponseToolkit) => {
  try {
    let data: any = req.payload;
    let id: string = data.id;
    let version: number = data.version;
    let PublishDocument: PublishDto;

    let title: string;
    let content: string;
    let creator_id: number;

    // validate data
    let validate = validatePublish(data);

    if (validate != null) {
      return res
        .response({
          status: 400,
          message: validate,
        })
        .code(400);
    }

    // find draft
    let draft = await GetDocumentByid(id);

    if (draft.length == 0) {
      return res
        .response({
          status: 400,
          message: 'Document Id Not Found',
        })
        .code(400);
    }
    // find draft version
    if (draft[0].current_version == version) {
      title = draft[0].title;
      content = draft[0].content;
      creator_id = draft[0].creator_id;
    } else {
      if (draft[0].history.length == 0) {
        return res
          .response({
            status: 400,
            message: 'Version Not Found',
          })
          .code(400);
      } else {
        let draft_history = draft[0].history.find((d: any) => {
          return d.current_version == version;
        });

        if (!draft_history) {
          return res
            .response({
              status: 400,
              message: 'Version Not Found',
            })
            .code(400);
        }
        title = draft_history.title;
        content = draft_history.content;
        creator_id = draft_history.creator_id;
      }
    }

    // chech are update publish / create publish

    let publish = await GetDocumentByidDraft(id);

    if (publish.length > 0) {
      console.log('masuk update');

      // update data
      if (publish[0].draft_version == version) {
        return res
          .response({
            status: 400,
            message: 'The draft version has been published',
          })
          .code(400);
      }

      let old_version_publish: Publish = {
        draft_id: id,
        title: title,
        content: content,
        creator_id: creator_id,
        created_at: publish[0].created_at,
        current_version: publish[0].current_version,
        draft_version: publish[0].draft_version,
      };

      let history_publish = publish[0].history;
      history_publish.push(old_version_publish);

      PublishDocument = {
        draft_id: id,
        title: title,
        content: content,
        creator_id: creator_id,
        draft_version: version,
        current_version: publish[0].current_version + 1,
        updated_at: TimeNow(),
        history: history_publish,
      };

      await updateDocumentPublish(publish[0]._id, PublishDocument);
      return res.response({ status: 201, message: 'Success Publish Document', payload: PublishDocument }).code(201);
    } else {
      // create data

      PublishDocument = {
        draft_id: id,
        title: title,
        content: content,
        creator_id: creator_id,
        created_at: TimeNow(),
        draft_version: version,
        current_version: 1,
        updated_at: null,
        history: [],
      };
      await createDocumentPublish(PublishDocument);
      return res.response({ status: 201, message: 'Success Publish Document', payload: PublishDocument }).code(201);
    }
  } catch (error) {
    return res
      .response({
        status: 500,
        message: 'Internal Server Error',
      })
      .code(500);
  }
};
