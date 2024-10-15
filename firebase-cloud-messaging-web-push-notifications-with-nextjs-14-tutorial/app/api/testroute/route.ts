import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFileSync } from "fs";
import { env } from "process";

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '');
// console.log(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export async function POST(request: NextRequest) {
  const { token, title, message, link } = await request.json();

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Test route is working!" });
}