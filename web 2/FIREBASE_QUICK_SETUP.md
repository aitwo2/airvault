# Firebase Setup - Quick Reference

## 5-Minute Setup

### 1️⃣ Create Firebase Project
```
https://console.firebase.google.com
→ Add Project → airvault-accessories → Create
```

### 2️⃣ Enable Realtime Database
```
Left sidebar → Realtime Database 
→ Create Database → Test Mode → Enable
```

### 3️⃣ Get Config Values
```
Settings ⚙️ → Project Settings 
→ Web </> → Copy firebaseConfig
```

### 4️⃣ Update js/firebase-config.js
```javascript
const firebaseConfig = {
  apiKey: "PASTE_YOUR_apiKey",
  authDomain: "PASTE_YOUR_authDomain",
  projectId: "PASTE_YOUR_projectId",
  storageBucket: "PASTE_YOUR_storageBucket",
  messagingSenderId: "PASTE_YOUR_messagingSenderId",
  appId: "PASTE_YOUR_appId"
};
```

### 5️⃣ Set Security Rules
```
Realtime Database → Rules → Paste:

{
  "rules": {
    "content": {
      ".read": true,
      ".write": true
    }
  }
}

→ Publish
```

## ✅ Done!

Now:
- Admin edits → saves to Firebase ✓
- Homepage → loads from Firebase ✓
- All users → see updates in real-time ✓

## Test It

**Window 1**: http://localhost:8000/admin.html
- Edit hero title
- Click Save

**Window 2**: http://localhost:8000/index.html
- Watch hero update in real-time!

## Verify in Firebase Console

```
Realtime Database → Data
You should see:
/content/hero/
  ├─ title: "Your new title"
  ├─ subtitle: "..."
  └─ imageUrl: "..."
```

## Deploy to Netlify

```bash
git add .
git commit -m "Add Firebase backend"
git push
```

Done! Your live site now has real-time updates.

---

For detailed instructions, see: FIREBASE_SETUP.md
