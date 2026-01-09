# 🚀 Quick Start - Email System Setup (10 minutes)

## What You Need to Do

You have a complete email system ready to go. Just 3 quick steps:

### Step 1: Create EmailJS Account (2 minutes)
1. Go to https://www.emailjs.com
2. Click **Sign Up for Free**
3. Create account and verify email

### Step 2: Get Your Credentials (5 minutes)

**A. Get Public Key:**
1. Log in to EmailJS
2. Click **Account** in left sidebar
3. Copy your **Public Key** (it looks like: `abc123xyz789`)

**B. Create Email Service:**
1. Click **Email Services** in left sidebar
2. Click **Create New Service**
3. Choose Gmail (or your email provider)
4. Follow setup steps
5. Copy the **Service ID** (looks like: `service_abc123xyz`)

**C. Create Email Templates:**
1. Click **Email Templates** in left sidebar
2. Click **Create New Template** and create 3 templates:

**Template 1:**
- Name: `Order Confirmation`
- Template ID: (copy this when created)
- Subject: `Order Confirmed - {{ORDER_NUMBER}}`
- Content: Copy from `templates/order-confirmation-email.html`

**Template 2:**
- Name: `Order Shipped`
- Template ID: (copy this when created)
- Subject: `Your {{ORDER_NUMBER}} is on its way!`
- Content: Copy from `templates/order-shipped-email.html`

**Template 3:**
- Name: `Invoice`
- Template ID: (copy this when created)
- Subject: `Invoice - {{ORDER_NUMBER}}`
- Content: Copy from `templates/invoice.html`

### Step 3: Update Configuration (3 minutes)

1. Open: `js/email-service.js`
2. Find the first 10 lines:
```javascript
const EMAILJS_SERVICE_ID = 'service_airvault'; 
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
const EMAILJS_TEMPLATE_CONFIRMATION = 'template_confirmation';
const EMAILJS_TEMPLATE_SHIPPED = 'template_shipped';
const EMAILJS_TEMPLATE_INVOICE = 'template_invoice';
const ADMIN_EMAIL = 'airvaultaccessories@gmail.com';
```

3. Replace with your actual values from EmailJS:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123xyz'; // Your service ID from step 2B
const EMAILJS_PUBLIC_KEY = 'xyz789abc123xyz789'; // Your public key from step 2A
const EMAILJS_TEMPLATE_CONFIRMATION = 'template_conf_abc123'; // From step 2C, template 1
const EMAILJS_TEMPLATE_SHIPPED = 'template_ship_def456'; // From step 2C, template 2
const EMAILJS_TEMPLATE_INVOICE = 'template_inv_ghi789'; // From step 2C, template 3
const ADMIN_EMAIL = 'your-email@gmail.com'; // Your admin email address
```

4. Save the file

## Test It!

1. Start your server
2. Open website
3. Add items to cart
4. Go to checkout
5. Fill in all fields
6. Click "Complete Purchase"
7. **Check your email!** ✉️

You should receive:
- **Confirmation email** with order details
- **Admin email** (to ADMIN_EMAIL) with order alert

## That's It! 🎉

Your email system is now live. Customers will automatically receive:
- ✉️ Confirmation email when they order
- ✉️ Shipping notification (when you manually send it)
- ✉️ Invoice (on request)

And your admin will get:
- ✉️ Alert for each new order

## Files You Have

| File | Purpose |
|------|---------|
| `js/email-service.js` | The email system (with YOUR config) |
| `templates/order-confirmation-email.html` | Customer confirmation email |
| `templates/order-shipped-email.html` | Shipping notification email |
| `templates/invoice.html` | Invoice template |
| `templates/README.html` | All template variables reference |

## Need Help?

**Emails not sending?**
1. Open browser (F12 → Console tab)
2. Look for red error messages
3. Check that all 5 constants at top of `email-service.js` are correct
4. Make sure templates are created in EmailJS with same names

**Forgot your credentials?**
- Public Key: https://dashboard.emailjs.com/admin/account
- Service ID: https://dashboard.emailjs.com/admin/services
- Template IDs: https://dashboard.emailjs.com/admin/templates

**Emails going to spam?**
- This is normal for new EmailJS accounts
- Add SPF/DKIM records (see EmailJS docs)

## How It Works (Simple Version)

```
Customer Orders
    ↓
Email system loads template
    ↓
Fills in customer details
    ↓
Sends via EmailJS
    ↓
Customer receives email ✉️
Admin receives notification ✉️
```

## Next (Optional)

After emails are working, you can:
- Edit templates to customize colors/branding
- Add a feature to manually send "Order Shipped" emails
- Track which emails were sent
- Add SMS notifications

## Files to Explore

- **EMAILJS_SETUP.md** - Detailed 30-minute walkthrough
- **EMAIL_INTEGRATION_CHECKLIST.md** - Step-by-step checklist
- **EMAIL_SYSTEM_DOCS.md** - Complete technical documentation

---

**Version:** 1.0
**Status:** Ready to configure and test
**Estimated Time:** 10 minutes
