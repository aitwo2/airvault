// Firebase Configuration
// Get these values from Firebase Console: https://console.firebase.google.com

let firebaseConfig = null;
let db = null;
let HERO_REF = null;
let BRANDS_REF = null;
let PRODUCTS_REF = null;
let REVIEWS_REF = null;
let BANKING_REF = null;
let isFirebaseReady = false;

// Try to initialize Firebase if config is available
try {
  firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Only initialize if config is properly filled
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('YOUR_')) {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    HERO_REF = db.ref('content/hero');
    BRANDS_REF = db.ref('content/brands');
    PRODUCTS_REF = db.ref('content/products');
    REVIEWS_REF = db.ref('content/reviews');
    BANKING_REF = db.ref('content/banking');
    isFirebaseReady = true;
    console.log('✓ Firebase initialized');
  } else {
    console.log('⚠️ Firebase config not set - using localStorage only');
  }
} catch (error) {
  console.log('⚠️ Firebase not available:', error.message);
}

// Fallback to localStorage if Firebase not ready
if (!isFirebaseReady) {
  console.log('Using localStorage as fallback');
}
