import { initializeApp } from "firebase/app"

import {
  getAuth
} from "firebase/auth"

import {
  getFirestore
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA_Zxf1PDkNoLWYncJZcfr9dSQPrLaU6cY",
  authDomain: "ai-image-tools-b0532.firebaseapp.com",
  projectId: "ai-image-tools-b0532",
  storageBucket: "ai-image-tools-b0532.firebasestorage.app",
  messagingSenderId: "978406838295",
  appId: "1:978406838295:web:08a7bc088e55a707628c52",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)