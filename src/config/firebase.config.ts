import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
