import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvfIoyj949EpBo3bf2_bQy8ft16MbISGs",
  authDomain: "fcm-test-34646.firebaseapp.com",
  projectId: "fcm-test-34646",
  storageBucket: "fcm-test-34646.appspot.com",
  messagingSenderId: "236883159662",
  appId: "1:236883159662:web:ffab6a3458cc64c6ef947f",
  measurementId: "G-PREGSPG6EW"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
