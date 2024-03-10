/** @format */

import { Collection, ObjectId } from 'mongodb';
import { connectDB } from '../db/db';
import { documentDto } from '../dto/DraftDto';

export const GetAllDocument = async () => {
  try {
    const db: Collection = (await connectDB()).collection('DraftDocument');

    const documents = await db.find({}).toArray();
    return documents;
  } catch (error) {
    console.error('Error getting all documents:', error);
    throw error;
  }
};

export const createDocument = async (document: documentDto) => {
  try {
    const db: Collection = (await connectDB()).collection('DraftDocument');
    const result = await db.insertOne(document);
    return result;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const updateDocument = async (id: string, document: documentDto) => {
  try {
    const db: Collection = (await connectDB()).collection('DraftDocument');

    const result = await db.updateOne({ _id: new ObjectId(id) }, { $set: document });
    return result;
  } catch (error) {
    console.log(error);
    console.error('Error creating document:', error);
    throw error;
  }
};

export const GetDocumentByid = async (id: string) => {
  try {
    const db: Collection = (await connectDB()).collection('DraftDocument');

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
