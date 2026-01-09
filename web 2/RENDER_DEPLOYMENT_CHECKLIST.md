# 📋 Render Deployment Checklist

## Pre-Deployment

- [x] Admin data sync system working ✓
- [x] server.js updated for Render ✓
- [x] render.yaml created ✓
- [x] All code tested locally ✓
- [ ] GitHub account created (DO THIS)
- [ ] Code pushed to GitHub (DO THIS)
- [ ] Render account created (DO THIS)

---

## Deployment Steps

### Step 1: GitHub Setup (3 min)

```bash
# 1.1 Initialize git
git init

# 1.2 Add all files
git add .

# 1.3 Create initial commit
git commit -m "Initial commit - ready for Render"

# 1.4 Go to https://github.com/new
# Create: airvault-accessories
# Copy remote URL

# 1.5 Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/airvault-accessories.git
git branch -M main
git push -u origin main
```

### Step 2: Render Deployment (2 min)

1. **Create Account:** https://render.com (use GitHub login)
2. **New Service:** Dashboard → New + → Web Service
3. **Connect Repo:** Select airvault-accessories
4. **Configure:**
   - Name: `airvault-accessories`
   - Environment: `Node`
   - Build Command: `echo "No build needed"`
   - Start Command: `node server.js`
5. **Deploy:** Click "Create Web Service"

### Step 3: Wait for Deployment (2 min)

Render will:
- Clone your repo
- Install dependencies
- Build your app
- Start server
- Give you a live URL

---

## After Deployment

### Your URLs

```
Homepage:     https://yourapp.onrender.com
Admin:        https://yourapp.onrender.com/admin.html
Products:     https://yourapp.onrender.com/products.html
Cart:         https://yourapp.onrender.com/cart.html
```

---

## Test Your Live Site

### Test 1: Homepage Loads
- [ ] https://yourapp.onrender.com loads
- [ ] Hero section displays
- [ ] Brands show
- [ ] Products visible
- [ ] Reviews show

### Test 2: Admin Works
- [ ] https://yourapp.onrender.com/admin.html loads
- [ ] Can edit hero
- [ ] Can add product
- [ ] Can add review
- [ ] Save button shows ✓ message

### Test 3: Data Syncs
- [ ] Edit admin
- [ ] Go to homepage
- [ ] See changes
- [ ] Refresh page
- [ ] Changes persist

### Test 4: Responsive
- [ ] Desktop layout correct
- [ ] Tablet layout correct
- [ ] Mobile layout correct
- [ ] Touch works on mobile

---

## Make Updates

### Update Content (Admin)
```
1. Go to: https://yourapp.onrender.com/admin.html
2. Edit form fields
3. Click Save
4. Changes live immediately
```

### Update Code
```bash
git add .
git commit -m "Description of change"
git push
# Render auto-deploys in 1-2 minutes
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Site shows error | Check Render logs → fix error → git push |
| Old version showing | Hard refresh: Ctrl+Shift+R |
| Admin doesn't save | Check localStorage: F12 → Application |
| 404 errors | Check file paths in server.js |
| Slow first load | Free tier auto-sleeps, upgrade to Starter |

---

## Monitor Your Site

### Render Dashboard
- See logs: Service → Logs
- See metrics: Service → Metrics
- See deployments: Service → Deployments
- Redeploy: Click "Redeploy" on previous build

### Restart Service
- Dashboard → Service settings → Restart

### View Logs
- Helpful for debugging
- Shows server output
- Shows errors in real-time

---

## Custom Domain (Optional)

1. Dashboard → Service → Custom Domain
2. Add your domain: `www.airvault.com`
3. Update DNS records (follow Render's instructions)
4. Wait 24 hours for DNS propagation

---

## Upgrading Plan (When Needed)

### Free Tier
- Free
- Auto-sleeps after 15 min
- Good for testing

### Starter ($7/month)
- Always running
- Good for business
- Recommended tier

### Standard ($12+/month)
- More resources
- Better performance
- For growth

Upgrade in Dashboard → Service → Plan

---

## Commands Quick Reference

```bash
# Initialize git
git init

# Check status
git status

# Stage files
git add .

# Commit
git commit -m "message"

# Push to GitHub (triggers deploy)
git push

# View log
git log --oneline

# Check remote
git remote -v
```

---

## Important URLs

| Purpose | URL |
|---------|-----|
| Render Dashboard | https://render.com/dashboard |
| Your Service | https://dashboard.render.com/web/your-service |
| GitHub | https://github.com/your-username |
| Your Live Site | https://yourapp.onrender.com |
| Admin Portal | https://yourapp.onrender.com/admin.html |

---

## Files on Render

```
/
├── index.html              (Homepage)
├── admin.html              (Admin portal)
├── products.html
├── cart.html
├── contact.html
├── about.html
├── server.js               (Main server)
├── render.yaml             (Deployment config)
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

## Success = 

✅ Code pushed to GitHub  
✅ Render service deployed  
✅ Live URL working  
✅ Admin portal accessible  
✅ Data sync working  
✅ All pages responsive  

---

## Next Action

**→ Follow RENDER_DEPLOYMENT_GUIDE.md for step-by-step setup**

Takes ~10 minutes to:
- Create GitHub account
- Push code
- Create Render account
- Deploy web service
- Go live! 🚀

