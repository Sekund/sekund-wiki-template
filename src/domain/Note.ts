import ObjectID from 'bson-objectid';

import { NoteComment } from './NoteComment';
import { People } from './People';

export interface Note {
  _id: ObjectID;
  created: number;
  updated: number;
  firstPublished: number;
  lastPublished: number;
  title: string;
  path: string;
  content: string;
  userId: ObjectID;
  assets: Array<string>;
  isRead: number;
  readCount: number;
  backlinksCount: number;

  comments: NoteComment[];

  sharing: {
    peoples?: People[];
  };
}
