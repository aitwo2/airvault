# Email System Integration - Quick Checklist

## ✅ What's Already Done

- [x] EmailJS library loaded in cart.html
- [x] Email templates created (confirmation, shipped, invoice)
- [x] EmailService class created with all methods
- [x] Cart.html updated to call EmailService.sendOrderConfirmation()
- [x] Address fields added to checkout form
- [x] Modal is scrollable on mobile
- [x] Website is mobile responsive

## 🔧 What You Need to Do

### Step 1: Create EmailJS Account (5 minutes)
- [ ] Go to https://www.emailjs.com
- [ ] Click "Sign Up for Free"
- [ ] Verify your email

### Step 2: Get Credentials from EmailJS Dashboard (10 minutes)
- [ ] Get your **Public Key** from Account section
- [ ] Create Email Service and copy the **Service ID**
- [ ] Create 3 Email Templates and copy their **Template IDs**

### Step 3: Update Configuration (2 minutes)
- [ ] Open `js/email-service.js`
- [ ] Replace `EMAILJS_SERVICE_ID` with your service ID
- [ ] Replace `EMAILJS_PUBLIC_KEY` with your public key
- [ ] Replace `EMAILJS_TEMPLATE_CONFIRMATION` with confirmation template ID
- [ ] Replace `EMAILJS_TEMPLATE_SHIPPED` with shipped template ID
- [ ] Replace `EMAILJS_TEMPLATE_INVOICE` with invoice template ID
- [ ] Update `ADMIN_EMAIL` to your admin email address

### Step 4: Test (5 minutes)
- [ ] Start your server
- [ ] Open website in browser
- [ ] Add items to cart
- [ ] Proceed to checkout
- [ ] Fill in all details and place order
- [ ] Check your email for confirmation
- [ ] Check admin email for notification

## 📝 File References

**Main Email Configuration:**
- `js/email-service.js` - Contains all email logic and configuration

**Email Templates:**
- `templates/order-confirmation-email.html` - Customer receives this
- `templates/order-shipped-email.html` - Shipping notification
- `templates/invoice.html` - Printable invoice

**Updated Files:**
- `cart.html` - Now calls EmailService.sendOrderConfirmation()

**Documentation:**
- `EMAILJS_SETUP.md` - Complete setup guide

## 🚀 How It Works

1. **Customer Places Order**
   ```
   Customer fills checkout form → Clicks "Complete Purchase"
   ```

2. **Order is Processed**
   ```
   Order saved to localStorage
   EmailService.sendOrderConfirmation(order) is called
   ```

3. **Two Emails Are Sent**
   ```
   EMAIL 1: Confirmation email → customer email address
   EMAIL 2: Admin notification → ADMIN_EMAIL
   ```

4. **Confirmation Page Shown**
   ```
   Customer sees "Order Confirmed!" page
   Order number and summary displayed
   ```

## 📧 Email Methods Available

```javascript
// Send order confirmation to customer + admin alert
EmailService.sendOrderConfirmation(order);
// Automatically sends to: order.customerEmail and ADMIN_EMAIL

// Send shipping notification (call when order ships)
EmailService.sendOrderShipped(orderData);

// Send invoice (call anytime to send receipt)
EmailService.sendInvoice(order);

// Send custom email to admin
EmailService.sendAdminNotification(subject, htmlContent);

// Send generic email
EmailService.sendEmail(recipientEmail, recipientName, subject, htmlContent);
```

## 🔐 Security Checklist

- [ ] Public Key is visible in code (this is okay, it's limited to sending)
- [ ] Service ID connects to your email account (keep it secure)
- [ ] Admin email is updated to your actual email
- [ ] Never share your secret EmailJS keys

## 🐛 Troubleshooting

**Problem:** Emails not sending
- Solution: Check browser console (F12) for errors
- Check that all credentials are correct
- Verify templates exist in `/templates/` folder

**Problem:** "emailjs is not defined" error
- Solution: This is already fixed in the code, just make sure EmailJS library loads

**Problem:** Emails going to spam
- Solution: Add SPF/DKIM records for your email domain (EmailJS docs)

## 📞 Support Resources

- EmailJS Docs: https://www.emailjs.com/docs/
- Email Template Guide: `/templates/README.html`
- Full Setup Guide: `EMAILJS_SETUP.md`

---

## 🎯 Success Metrics

You'll know it's working when:
1. ✅ You receive confirmation email after placing test order
2. ✅ Admin email receives notification about new order
3. ✅ Email has AirVault branding and professional formatting
4. ✅ All order details (items, price, address) appear correctly in email
