import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA73msQuS_d0uHLkji9-WQqiSMRO5_YIes",
  authDomain: "android-demo-973bf.firebaseapp.com",
  projectId: "android-demo-973bf",
  storageBucket: "android-demo-973bf.appspot.com",
  messagingSenderId: "841093999622",
  appId: "1:841093999622:web:9a82e7190c56dab0b52787",
  measurementId: "G-160FWC8FFJ"
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
