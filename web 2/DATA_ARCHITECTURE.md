# Data Architecture Diagram

## Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AIRVAULT WEBSITE SYSTEM                       │
└─────────────────────────────────────────────────────────────────┘

                          ADMIN PORTAL
                         admin.html
                             ↓
        ┌────────────────────┴────────────────────┐
        ↓                                          ↓
   [Admin Forms]                            [Status Messages]
   - Hero Section                           ✓ Success
   - Brands Editor                          ✗ Error
   - Products Manager
   - Reviews Manager
   - Banking Details
        ↓
        └─────────────────────┬────────────────────┘
                              ↓
                 [Data Goes Here - Click Save]
                              ↓
        ┌─────────────────────┴────────────────────┐
        ↓                                          ↓
   [localStorage]                          [Firebase Database]
   (Browser Storage)                      (Cloud Storage)
   - heroSection                          - content/hero
   - featuredBrands                       - content/brands
   - adminProducts                        - content/products
   - customerReviews                      - content/reviews
   - bankingDetails                       - content/banking
        ↓                                          ↓
        └─────────────────────┬────────────────────┘
                              ↓
                    [Every 5 Seconds]
                    [Polls for Updates]
                              ↓
                        HOMEPAGE
                       index.html
                              ↓
        ┌────────────────────┬────────────────────┐
        ↓                    ↓                    ↓
   [Hero Section]      [Featured Section]   [Reviews Section]
   Title                Brands               Customer Reviews
   Subtitle             Products (first 4)   Avatars & Ratings
   Background Image                         Text
        ↓                    ↓                    ↓
        └────────────────────┴────────────────────┘
                              ↓
                    [WEBSITE DISPLAYS]
                    [ALL CONTENT]
```

---

## Data Types & Storage

```
┌─────────────────────────────────────────────────────┐
│           DATA STORED IN THE SYSTEM                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. HERO SECTION                                     │
│     ├─ Title (text)                                 │
│     ├─ Subtitle (text)                              │
│     └─ Image URL (string)                           │
│                                                      │
│  2. FEATURED BRANDS                                  │
│     ├─ Brand 1                                      │
│     │  ├─ ID                                        │
│     │  ├─ Name                                      │
│     │  ├─ Description                               │
│     │  └─ Image URL                                 │
│     ├─ Brand 2, 3, 4 (same structure)              │
│                                                      │
│  3. PRODUCTS (Unlimited)                             │
│     ├─ Product 1                                    │
│     │  ├─ ID (timestamp)                            │
│     │  ├─ Name                                      │
│     │  ├─ Brand                                     │
│     │  ├─ Price                                     │
│     │  ├─ Image (URL or emoji)                      │
│     │  └─ Description                               │
│     ├─ Product 2, 3... (unlimited)                 │
│                                                      │
│  4. CUSTOMER REVIEWS (Unlimited)                     │
│     ├─ Review 1                                     │
│     │  ├─ ID                                        │
│     │  ├─ Name                                      │
│     │  ├─ Rating (1-5)                              │
│     │  ├─ Text                                      │
│     │  └─ Avatar URL                                │
│     ├─ Review 2, 3... (unlimited)                  │
│                                                      │
│  5. BANKING DETAILS                                  │
│     ├─ Account Name                                 │
│     ├─ Bank Name                                    │
│     ├─ Account Number                               │
│     └─ Branch Code                                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## How A Single Edit Flows Through The System

### Example: Change Hero Title to "Premium Sneakers"

```
1. ADMIN OPENS FORM
   ↓
   admin.html displays form with current hero data:
   - Title field shows: "Authentic Sneakers for Every Style"

2. ADMIN TYPES NEW TEXT
   ↓
   Input field: "Premium Sneakers"

3. ADMIN CLICKS "SAVE HERO SECTION"
   ↓
   JavaScript runs saveHeroSection() function
   
4. DATA SAVED TO LOCALSTORAGE
   ↓
   localStorage.setItem('heroSection', JSON.stringify({
     title: "Premium Sneakers",
     subtitle: "Discover...",
     imageUrl: "..."
   }))
   
5. DATA ALSO SENT TO FIREBASE (if configured)
   ↓
   HERO_REF.set({
     title: "Premium Sneakers",
     subtitle: "Discover...",
     imageUrl: "..."
   })

6. SUCCESS MESSAGE SHOWS
   ↓
   Green box: "✓ Hero section updated!"
   Disappears after 3 seconds

7. HOMEPAGE POLLS (every 5 seconds)
   ↓
   homepage checks localStorage:
   heroData = JSON.parse(localStorage.getItem('heroSection'))
   
8. HOMEPAGE DISPLAYS NEW DATA
   ↓
   document.getElementById('heroTitle').textContent = "Premium Sneakers"
   
9. VISITOR SEES CHANGE
   ↓
   Homepage shows: "Premium Sneakers" instead of old text

10. DATA PERSISTS
    ↓
    Even after:
    - Page refresh
    - Browser close/open
    - Another visitor
    (Without Firebase: on same device only)
    (With Firebase: across all devices)
```

---

## Storage Comparison

### Without Firebase (localStorage Only)
```
User A                           User B
[Opens admin]                    [Opens homepage]
[Edit hero title]                [Sees old hero title]
[Save]                           ↓
↓                                [Refresh page after 5 sec]
[Stored in localStorage]         [Now sees new hero title]
                                 (they share the SAME computer)

BUT:

User A on Desktop                User B on Phone
[Edit hero title]                [Opens same website]
[Save to desktop's localStorage] [Sees DIFFERENT hero title]
                                 (different devices, different storage)
```

### With Firebase (Real-Time Sync)
```
User A                           User B
[Opens admin]                    [Opens homepage]
[Edit hero title]                [INSTANTLY SEES CHANGE]
[Save]
↓
[Stored in localStorage]
[Also sent to Firebase]
[All devices watching Firebase see update immediately]
↓
User C opens homepage
[SEES SAME HERO TITLE]
(different device, same cloud database)
```

---

## API Endpoints (Netlify Functions)

Even though we don't use these actively, they exist:

```
GET  /.netlify/functions/get-content
     Returns stored content from server

POST /.netlify/functions/update-content
     Saves content to server
```

These are available but **not required** since Firebase/localStorage work better.

---

## Security Notes

### Current Setup
- ✅ localStorage: Browser stores data locally (safe for this site)
- ✅ Firebase: Data stored in Google's secure cloud
- ⚠️ No authentication: Admin page is public
  - Anyone can visit admin.html and edit data
  - If deployed, add password protection (recommend for production)

### For Production
1. Add Firebase authentication
2. Password-protect admin.html
3. Set Firebase security rules to require login
4. Use HTTPS (Netlify does this)

---

## File Relationships

```
index.html (Homepage)
├── loads from: localStorage
├── listens to: Firebase (if configured)
├── displays: Hero, Brands, Products (first 4), Reviews
└── updates: Every 5 seconds

admin.html (Admin Panel)
├── saves to: localStorage
├── saves to: Firebase (if configured)
├── manages: Hero, Brands, Products, Reviews, Banking
└── success message: Confirms save

js/firebase-config.js
├── sets up: Firebase connection
├── creates: Database references
├── checks: Is config valid?
└── flags: isFirebaseReady

js/firebase-helpers.js
├── function: saveHeroToFirebase()
├── function: loadHeroFromFirebase()
├── function: saveBrandsToFirebase()
├── function: loadBrandsFromFirebase()
├── function: saveProductsToFirebase()
├── function: loadProductsFromFirebase()
├── function: saveReviewsToFirebase()
├── function: loadReviewsFromFirebase()
├── function: saveBankingDetailsToFirebase()
├── function: loadBankingDetailsFromFirebase()
└── all functions: Check if Firebase ready before running

css/style.css
├── styles all pages
└── responsive design

js/main.js
├── cart functionality
└── basic utilities
```

---

## Data is Safe Because:

1. ✅ localStorage stays on your device
2. ✅ Firebase is Google's cloud (very secure)
3. ✅ No API keys exposed in code (they're in firebase-config.js)
4. ✅ Fallbacks work if something fails
5. ✅ Data doesn't leave your browser unless you configure Firebase

