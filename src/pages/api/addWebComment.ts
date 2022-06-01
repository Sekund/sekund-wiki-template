import ObjectID from 'bson-objectid';
import { NextApiRequest, NextApiResponse } from 'next';

import { logIn } from '@/common/utils';

async function addWebComment(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await logIn();

    const contactData = req.body;
    await client.functions.callFunction(
      'addWebComment',
      new ObjectID(contactData.noteId),
      contactData.message,
      contactData.fullName,
      contactData.email,
      Date.now()
    );
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Error');
  }
}

export default addWebComment;
