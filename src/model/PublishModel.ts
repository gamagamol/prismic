/** @format */

import { Collection, ObjectId } from 'mongodb';
import { connectDB } from '../db/db';
import { documentDto } from '../dto/DraftDto';
import { PublishDto } from '../dto/PublishDto';

export const GetAllDocumentPublish = async () => {
  try {
    const db: Collection = (await connectDB()).collection('PublishDocument');

    const documents = await db.find({}).toArray();
    return documents;
  } catch (error) {
    console.error('Error getting all documents Publish:', error);
    throw error;
  }
};

export const createDocumentPublish = async (document: documentDto) => {
  try {
    const db: Collection = (await connectDB()).collection('PublishDocument');
    const result = await db.insertOne(document);
    return result;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const GetDocumentByidPublish = async (id: string) => {
  try {
    const db: Collection = (await connectDB()).collection('PublishDocument');

    const objectId = new ObjectId(id);

    const documents = await db
      .find({
        _id: objectId,
      })
      .toArray();
    return documents;
  } catch (error) {
    console.log(error);

    console.error('Error getting documents by id:', error);
    throw error;
  }
};

export const GetDocumentByidDraft = async (id: string) => {
  try {
    const db: Collection = (await connectDB()).collection('PublishDocument');

    const documents = await db
      .find({
        draft_id: id,
      })
      .toArray();
    return documents;
  } catch (error) {
    console.log(error);

    console.error('Error getting documents by id:', error);
    throw error;
  }
};

export const updateDocumentPublish = async (id: ObjectId, data: PublishDto) => {
  try {
    const db: Collection = (await connectDB()).collection('PublishDocument');

    const result = await db.updateOne({ _id: id }, { $set: data });
    return result;
  } catch (error) {
    console.log(error);
    console.error('Error creating document:', error);
    throw error;
  }
};
