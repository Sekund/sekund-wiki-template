import fm from 'front-matter';
import { serialize } from 'next-mdx-remote/serialize';
import * as Realm from 'realm-web';
import remarkGfm from 'remark-gfm';

import { transformSimpleLinks } from '@/common/markdown-utils';
import { Note } from '@/domain/Note';

export async function logIn() {
  if (process.env.SEKUND_USER_ID && process.env.SEKUND_USER_PASSWORD) {
    const creds = Realm.App.Credentials.emailPassword(
      process.env.SEKUND_USER_ID,
      process.env.SEKUND_USER_PASSWORD
    );
    return new Realm.App(process.env.REALM_APP_ID || 'sekund-ttmmm').logIn(
      creds
    );
  }
  throw new Error('Missing environment');
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function getHeaderSource(client: Realm.User, notes: Note[]) {
  let headerSource;
  if (process.env.HEADER_LINKS) {
    const headerNote = await client.functions.callFunction(
      'getNoteByPath',
      process.env.HEADER_LINKS
    );
    const headerBody = fm(headerNote.content).body;
    headerSource = await serialize(transformSimpleLinks(headerBody, notes), {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    });
  }
  return headerSource;
}

export function recursivelyConvertObjectIdsToStrings(obj: any): any {
  const result: any = {};
  if (obj instanceof Array) {
    return (obj as Array<any>).map((ao) =>
      recursivelyConvertObjectIdsToStrings(ao)
    );
  }
  (Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
    if (typeof obj[key] === 'object') {
      if (obj[key].toHexString !== undefined) {
        result[key] = obj[key].toString();
      } else {
        result[key] = recursivelyConvertObjectIdsToStrings(obj[key]);
      }
    } else {
      result[key] = obj[key];
    }
  });

  return result;
}
