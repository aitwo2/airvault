# Quick Start - Admin to Website Data Flow

## The System

```
ADMIN FORM EDIT
    ↓
[Save to localStorage]
    ↓
[Optional: Save to Firebase]
    ↓
HOMEPAGE LOADS DATA
    ↓
DISPLAYS ON WEBSITE
```

---

## What Gets Synced

### Hero Section
- Admin: Changes title/subtitle/image
- Website: Hero section updates

### Featured Brands  
- Admin: Edit brand name/description/image
- Website: Brands section updates

### Products
- Admin: Add/edit/delete products
- Website: First 4 products show as "Featured Products"

### Customer Reviews
- Admin: Add reviews with rating/text/avatar
- Website: Shows in "What Our Customers Say" section

### Banking Details
- Admin: Enter account info
- Website: Stored (for checkout/payment info)

---

## Test It Now

### 1. Open Admin
```
http://localhost:8000/admin.html
```

### 2. Edit Something
- Change hero title
- Click "Save Hero Section"
- See green ✓ message

### 3. Check Homepage
```
http://localhost:8000/index.html
```

**Your custom hero title should appear!** ✓

### 4. Refresh Page
- Your changes persist ✓

---

## Files That Do the Syncing

| File | What It Does |
|------|------------|
| `admin.html` | Has save buttons that write to localStorage/Firebase |
| `index.html` | Reads localStorage/Firebase and displays everything |
| `js/firebase-config.js` | Sets up Firebase database references |
| `js/firebase-helpers.js` | Functions to save/load from Firebase |
| `js/main.js` | Cart and basic functions |

---

## How Data Saves

### When You Click Save on Admin
```javascript
// 1. Write to localStorage (instant)
localStorage.setItem('heroSection', JSON.stringify(heroData))

// 2. Also write to Firebase (if configured)
saveHeroToFirebase(heroData)

// 3. Show success message
"✓ Hero section updated!"
```

### When Homepage Loads
```javascript
// 1. Read from localStorage
heroData = localStorage.getItem('heroSection')

// 2. Also listen to Firebase (if configured)  
loadHeroFromFirebase(data => display(data))

// 3. Update the page
document.getElementById('heroTitle').textContent = heroData.title
```

---

## Everything Works Without Firebase

✅ **Local development** - Works with just localStorage  
✅ **Deployed on Netlify** - Works with just localStorage  
⚠️ **Multi-device sync** - Requires Firebase configuration  

When you're ready to sync across devices, follow `FIREBASE_SETUP.md`

---

## Debug Commands (Browser Console)

```javascript
// See all saved data
localStorage

// See specific data
JSON.parse(localStorage.getItem('heroSection'))
JSON.parse(localStorage.getItem('featuredBrands'))
JSON.parse(localStorage.getItem('adminProducts'))
JSON.parse(localStorage.getItem('customerReviews'))
JSON.parse(localStorage.getItem('bankingDetails'))

// Clear everything (start fresh)
localStorage.clear()
```

---

## Deploy When Ready

```bash
# Commit all changes
git add .
git commit -m "All admin data syncs to website"
git push

# Netlify auto-deploys
# Site live in 1-2 minutes!
```

---

## Next Steps

1. **Test locally** - Edit admin, see changes on homepage
2. **Deploy** - Push to Netlify
3. **Configure Firebase** (optional) - For real-time multi-user sync
4. **Start selling** - Your site is ready! 🚀

