# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to: https://console.firebase.google.com
2. Click **"Add project"**
3. Enter project name: `airvault-accessories`
4. Click **"Create project"**
5. Wait for project to be created (1-2 minutes)

## Step 2: Enable Realtime Database

1. In Firebase Console, click **"Realtime Database"** (left sidebar)
2. Click **"Create Database"**
3. Select **"Start in test mode"** (for now)
4. Click **"Enable"**
5. Database created! Copy the URL

## Step 3: Get Your Firebase Config

1. Click **"Project Settings"** (gear icon, top-left)
2. Scroll to **"Your apps"** section
3. Click **"Web"** (the `</>`  icon)
4. Copy all the config values

You'll get something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "project.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## Step 4: Update Firebase Config File

1. Open: `js/firebase-config.js`
2. Replace the placeholder values with your actual config
3. Save the file

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD_yourKeyHere",
  authDomain: "airvault-accessories.firebaseapp.com",
  projectId: "airvault-accessories",
  storageBucket: "airvault-accessories.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## Step 5: Set Database Security Rules

1. In Firebase Console → **Realtime Database**
2. Click **"Rules"** tab
3. Replace all content with:

```json
{
  "rules": {
    "content": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Click **"Publish"**

⚠️ **Note**: This allows anyone to read/write. For production, restrict access!

## Step 6: Test It Works

1. Start local server: `node server.js`
2. Open: http://localhost:8000/admin.html
3. Edit hero section
4. Click "Save Hero Section"
5. Should see status: "✓ Hero section updated! Changes appear on homepage & Firebase"
6. Check Firebase Console → Database → you should see the data

## Step 7: Deploy to Netlify

1. Update your Firebase config file
2. Commit to Git: `git add . && git commit -m "Add Firebase"`
3. Push to GitHub: `git push`
4. Netlify auto-deploys
5. Test on your live URL

## What Gets Saved to Firebase

### Hero Section (`/content/hero`)
```json
{
  "title": "Your Custom Title",
  "subtitle": "Your custom subtitle",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Featured Brands (`/content/brands`)
```json
[
  {
    "id": 1,
    "name": "Nike",
    "image": "https://...",
    "description": "..."
  }
]
```

### Products (`/content/products`)
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "brand": "Brand",
    "price": 99.99,
    "image": "...",
    "description": "..."
  }
]
```

## How It Works

### Editing (Admin Page)
1. You edit hero/brands on admin.html
2. Data saves to **localStorage** (instant feedback)
3. Data also saves to **Firebase** (background)
4. Status message confirms

### Viewing (Homepage)
1. Page loads
2. Tries to load from **Firebase** first
3. Falls back to **localStorage** if Firebase unavailable
4. Updates every 5 seconds for real-time changes

## Real-Time Updates

All users see changes immediately because:
- Firebase provides real-time listeners
- Homepage listens to `/content/hero` and `/content/brands`
- When admin updates, ALL users see changes within seconds!

## Testing Real-Time

1. Open admin.html in one window
2. Open index.html in another window
3. Edit hero in admin
4. Watch homepage update in real-time!

## Troubleshooting

### Firebase Not Connecting
- Check browser console (F12)
- Verify config values are correct
- Make sure you're not blocking Firebase CDN

### "firebaseConfig is not defined"
- Check that firebase-config.js loaded
- Verify script tags in order (Firebase SDK → config → helpers)

### No Data Saving
- Check Firebase Rules are published
- Check browser console for errors
- Verify database structure is correct

### Real-Time Not Working
- Make sure Realtime Database is enabled (not Firestore)
- Check security rules allow `.read: true`

## Security Rules for Production

Once you're live, change rules to:
```json
{
  "rules": {
    "content": {
      ".read": true,
      ".write": false
    }
  }
}
```

This allows reading but only admin can write (you'd need authentication for true admin-only writes).

## Files Changed

✅ `js/firebase-config.js` - Created
✅ `js/firebase-helpers.js` - Created  
✅ `admin.html` - Added Firebase integration
✅ `index.html` - Added Firebase integration

## Next Steps

1. Complete Firebase setup above
2. Test locally
3. Deploy to Netlify
4. All users see real-time updates!

---

**Status**: Ready to configure Firebase
**Estimated Time**: 10 minutes
**Free Tier**: Includes this setup completely free
