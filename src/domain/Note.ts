import ObjectID from 'bson-objectid';

import { NoteComment } from './NoteComment';
import { People } from './People';

export interface Note {
  _id: ObjectID;
  created: number;
  modified: number;
  updated: number;
  firstPublished: number;
  lastPublished: number;
  title: string;
  subtitle?: string;
  description?: string;
  coverImage?: string;
  path: string;
  content: string;
  userId: ObjectID;
  assets: Array<string>;
  isRead: number;
  readCount: number;
  refCount: number;
  backlinksCount: number;
  pinned: boolean;
  hasPublicLink?: boolean;
  isPublished?: boolean;

  comments: NoteComment[];

  user: People;

  sharing: {
    peoples?: People[];
  };
}
