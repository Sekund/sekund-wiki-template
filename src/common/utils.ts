import * as Realm from 'realm-web';

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
