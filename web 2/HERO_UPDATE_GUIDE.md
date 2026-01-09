# Hero Section Update - Troubleshooting & Testing

## Quick Start - Testing Locally

1. **Open Admin Page**: http://localhost:8000/admin.html
2. **Scroll to "Hero Section Editor"**
3. **Edit the fields**:
   - Hero Title
   - Hero Subtitle  
   - Hero Image URL
4. **Click "Save Hero Section"** button
5. **Check the status message** - should show "✓ Hero section updated!"

## What Should Happen

1. **Form saves to localStorage** ✓
2. **Status message appears** ✓
3. **Preview updates in real-time** as you type
4. **Homepage loads the saved data** when you refresh

## Testing Homepage Updates

1. **Edit hero on admin page** and save
2. **Open homepage**: http://localhost:8000/index.html
3. **Hero section should show your changes**
4. **Refresh the page** - changes persist
5. **Changes persist in localStorage** across sessions

## Deployed Site Fix

### For Netlify Deployment
- Admin updates save to **localStorage** on your browser
- Homepage reads from **localStorage** first
- Both pages are synchronized
- Data is stored locally on each device

### Note on Cross-User Sync
On a static deployed site without a backend database:
- Each user has their own local browser storage
- Admin updates only affect YOUR browser
- For true server-side persistence, you'd need:
  - A backend database (Firebase, MongoDB, etc.)
  - A CMS (Contentful, Strapi, etc.)
  - Or store data as JSON in Git

## Files Updated

1. ✓ `admin.html` - Hero save function with better error handling
2. ✓ `index.html` - Loads hero from localStorage
3. ✓ `netlify/functions/get-content.js` - API function  
4. ✓ `netlify/functions/update-content.js` - API function
5. ✓ `netlify.toml` - Function directory config

## Verification Steps

```javascript
// Open browser console and test:

// 1. Check current hero data
JSON.parse(localStorage.getItem('heroSection'))

// 2. Save new hero data
localStorage.setItem('heroSection', JSON.stringify({
  title: 'My New Title',
  subtitle: 'My new subtitle',
  imageUrl: 'https://example.com/image.jpg'
}))

// 3. Verify it saved
JSON.parse(localStorage.getItem('heroSection'))

// 4. Check brands
JSON.parse(localStorage.getItem('featuredBrands'))
```

## Status

✅ Admin page hero form works
✅ Data saves to localStorage
✅ Homepage reads saved data  
✅ Status messages display updates
✅ Changes persist on refresh
✅ Falls back to defaults if no saved data

## If Still Not Working

Check browser console (F12 → Console tab) for any error messages. Report any errors you see there.

## Next Steps for True Cross-User Updates

If you need updates to appear for ALL users on your deployed site, you'll need to:

1. **Add a database** - Firebase Realtime Database, Firestore, MongoDB, etc.
2. **Update the admin page** to call database APIs
3. **Update the homepage** to read from the database
4. **Deploy to Netlify** with these changes

This would enable true real-time updates across all users, not just local browser storage.
