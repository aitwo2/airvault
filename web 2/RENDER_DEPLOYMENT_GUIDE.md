# 🚀 Deploy to Render - Complete Guide

## Why Render?

Render is **perfect** for your website because:
- ✅ Native Node.js server support (your server.js runs as-is)
- ✅ Free tier includes databases and static hosting
- ✅ Auto-deploys from GitHub
- ✅ Custom domain support
- ✅ Environment variables for Firebase config
- ✅ Better for backend + frontend combo

---

## Pre-Deployment Checklist

Before deploying to Render, make sure:

- [x] Server updated to use `process.env.PORT`
- [x] `render.yaml` created
- [x] All code committed to Git
- [x] GitHub repository ready
- [x] Data initialized in localStorage (or Firebase)

---

## Step 1: Prepare Your GitHub Repository

### 1.1 Make Sure You Have Git

```bash
# Check if git is installed
git --version

# If not installed, install from https://git-scm.com
```

### 1.2 Initialize Git (If Not Already Done)

```bash
cd "c:\Users\Nombu\Downloads\web 2"
git init
git add .
git commit -m "Initial commit - admin data integration ready"
```

### 1.3 Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository: `airvault-accessories`
3. Choose **Public** (easier for Render)
4. Click "Create Repository"

### 1.4 Push Code to GitHub

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/airvault-accessories.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

---

## Step 2: Deploy to Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Click "Sign up"
3. Sign up with GitHub (recommended)
4. Verify email

### 2.2 Create Web Service

1. Dashboard → **New +** → **Web Service**
2. Connect your GitHub repo: `airvault-accessories`
3. Authorize Render to access GitHub
4. Select repository

### 2.3 Configure Web Service

**Name:**
```
airvault-accessories
```

**Environment:**
```
Node
```

**Build Command:**
```
echo "No build needed"
```

**Start Command:**
```
node server.js
```

**Instance Type:**
```
Free (or Starter - only $7/month)
```

### 2.4 Set Environment Variables (Optional - For Firebase)

If using Firebase, add these in Render dashboard:

1. Go to Environment tab
2. Click "Add Environment Variable"
3. Add these variables:

```
API_KEY = YOUR_FIREBASE_API_KEY
AUTH_DOMAIN = YOUR_PROJECT.firebaseapp.com
PROJECT_ID = YOUR_PROJECT_ID
STORAGE_BUCKET = YOUR_PROJECT.appspot.com
MESSAGING_SENDER_ID = YOUR_MESSAGING_SENDER_ID
APP_ID = YOUR_APP_ID
```

**Note:** These are optional. Your site works with localStorage.

### 2.5 Deploy

Click **Deploy Web Service**

Render will:
1. Clone your repo
2. Install dependencies (if package.json exists)
3. Run build command
4. Start your server
5. Give you a live URL

**⏱️ Takes 2-5 minutes**

---

## Step 3: Access Your Live Website

After deployment completes, you'll get a URL like:

```
https://airvault-accessories.onrender.com
```

### Access Your Website

- **Homepage:** `https://airvault-accessories.onrender.com`
- **Admin Portal:** `https://airvault-accessories.onrender.com/admin.html`
- **Products:** `https://airvault-accessories.onrender.com/products.html`
- **Cart:** `https://airvault-accessories.onrender.com/cart.html`

---

## Step 4: Setup Custom Domain (Optional)

1. Go to your Render web service settings
2. Scroll to "Custom Domain"
3. Enter your domain: `www.airvault.com`
4. Follow DNS instructions from your domain provider
5. Update DNS records

---

## Make Changes After Deployment

### Method 1: Auto-Deploy from GitHub

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update product listings"
   git push
   ```
3. Render automatically redeploys (1-2 minutes)

### Method 2: Deploy Manually

1. Make changes
2. Commit:
   ```bash
   git add .
   git commit -m "Update content"
   ```
3. In Render dashboard, click **Deploy latest commit**

---

## File Structure on Render

Your files deploy exactly as-is:

```
/
├── index.html           (Homepage)
├── admin.html           (Admin portal)
├── products.html
├── cart.html
├── contact.html
├── about.html
├── server.js            (Node.js server)
├── package.json
├── css/
├── js/
│   ├── main.js
│   ├── products.js
│   ├── firebase-config.js
│   ├── firebase-helpers.js
│   └── email-service.js
├── images/
├── lib/
└── templates/
```

---

## Testing After Deployment

### Test 1: Admin Portal Works
1. Visit: `https://your-domain/admin.html`
2. Edit hero title
3. Click Save
4. Go to homepage
5. See changes ✓

### Test 2: Data Persists
1. Edit something on admin
2. Refresh page
3. Change still there ✓

### Test 3: Mobile Responsive
1. Open on mobile
2. All sections visible
3. Buttons work ✓

### Test 4: All Links Work
- Homepage links
- Product page
- Cart page
- Contact form
- Admin portal

---

## Troubleshooting

### Website Shows Error

1. Check Render logs:
   - Render dashboard → Your service → Logs
   - Look for error messages

2. Common issues:
   - Port not set: Check `process.env.PORT` in server.js ✓
   - Files missing: Check git push was successful
   - Node modules: Render installs automatically

### Admin Page Not Loading

1. Check URL: `https://your-domain/admin.html`
2. Check localStorage: Press F12 → Application
3. Should see: `heroSection`, `featuredBrands`, etc.

### Changes Not Showing After Edit

1. Hard refresh: `Ctrl+Shift+R`
2. Clear cache: Open in incognito/private
3. Check localStorage has data: F12 → Application
4. Wait 5 seconds for poll interval

### Service Won't Deploy

1. Check `render.yaml` syntax
2. Check `server.js` exports `PORT`
3. Check git push succeeded: `git log`
4. Check GitHub repo is public

---

## Cost Comparison

### Render Plans

| Plan | Cost | Includes |
|------|------|----------|
| **Free** | $0 | Web service, auto-sleep |
| **Starter** | $7/month | Web service, always running |
| **Standard** | $12/month | More resources |

**Recommendation:** Free tier for testing, Starter ($7) for production (prevents auto-sleep)

---

## Environment Variables (Advanced)

If using Firebase, you can set variables in Render:

1. Dashboard → Service settings
2. Environment tab
3. Add variables

Then use in `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
```

---

## Monitoring Your Site

### Render Dashboard

- **Logs:** Real-time logs of your server
- **Metrics:** CPU, memory, network usage
- **Events:** Deploy history
- **Settings:** Change configuration

### Check Server Status

1. Render dashboard → Your service
2. Look for green "Live" indicator
3. Visit your URL

---

## Update Process (After Deployment)

### To Update Admin Content

1. Open: `https://your-domain/admin.html`
2. Edit hero, brands, products, reviews
3. Click Save
4. Changes appear instantly ✓

### To Update Code

1. Edit files locally
2. Git push:
   ```bash
   git add .
   git commit -m "Update features"
   git push
   ```
3. Render auto-deploys (1-2 min)

---

## Rollback (If Something Goes Wrong)

1. Render dashboard → Deployment history
2. Click on previous deployment
3. Click "Redeploy"

Your site reverts to that version!

---

## Scaling (When You Grow)

### If Site Gets Slow

1. Upgrade from Free → Starter plan ($7/month)
2. Or add cache: Render → Settings → Add Redis
3. Or upgrade database tier

### If You Need Database

Currently using localStorage (browser storage). If you need server storage:

1. Render → Add PostgreSQL database
2. Update your code to use database
3. Database backups automatic

---

## Security Notes

- ✅ Render uses HTTPS automatically
- ✅ Your data is encrypted in transit
- ✅ Public repo is fine (no sensitive data)
- ⚠️ Don't commit API keys (use env variables)
- ⚠️ Consider password on admin.html for production

---

## Comparison: Render vs Netlify

| Feature | Render | Netlify |
|---------|--------|---------|
| Node.js Backend | ✅ Yes | ❌ Functions only |
| Static Hosting | ✅ Yes | ✅ Yes |
| Database | ✅ Yes (extra) | ❌ No |
| Price | ✅ Free/7/month | ✅ Free/19/month |
| Custom Domain | ✅ Yes | ✅ Yes |
| Auto-deploy | ✅ Yes | ✅ Yes |
| **Best For** | Backend + Frontend | Static sites |

**Your Case:** Render is better because you have `server.js`

---

## Quick Command Reference

```bash
# Local testing
node server.js

# Push changes to Render
git add .
git commit -m "message"
git push

# Check git status
git status

# View git log
git log --oneline

# View remote
git remote -v
```

---

## Next Steps

1. ✅ Create GitHub account
2. ✅ Push code to GitHub
3. ✅ Create Render account
4. ✅ Deploy web service
5. ✅ Get live URL
6. ✅ Test admin portal
7. ✅ Setup custom domain (optional)

---

## Need Help?

**Render Documentation:** https://render.com/docs

**Common Issues:**
- Port error? Use `process.env.PORT` ✓ (already done)
- Files missing? Run `git push` again
- Still see old version? Render caches - click **Redeploy**

---

## Summary

Your website is now ready for Render:

✅ Code structure compatible with Render  
✅ Server configured for environment PORT  
✅ render.yaml created  
✅ Admin data sync ready  
✅ All documentation provided  

**Deploy now and go live!** 🚀

