# 🚀 QUICK REFERENCE CARD

## Email System - At a Glance

### What You Got ✅
```
✓ Email service JavaScript (js/email-service.js)
✓ 3 HTML email templates (templates/*.html)
✓ Cart integration (cart.html updated)
✓ 9 documentation files
```

### What You Need to Do ⚠️
```
1. Create EmailJS account (https://www.emailjs.com)
2. Get credentials from dashboard
3. Update js/email-service.js with credentials
4. Test with order
```

### Configuration (Update These 6 Lines)
```javascript
// In js/email-service.js (top of file)
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_TEMPLATE_CONFIRMATION = 'YOUR_TEMPLATE_ID_1';
const EMAILJS_TEMPLATE_SHIPPED = 'YOUR_TEMPLATE_ID_2';
const EMAILJS_TEMPLATE_INVOICE = 'YOUR_TEMPLATE_ID_3';
const ADMIN_EMAIL = 'your-email@gmail.com';
```

### How It Works
```
Customer Orders
    ↓
EmailService.sendOrderConfirmation(order)
    ↓
Two Emails Sent:
├─ Confirmation → customer.email
└─ Alert → ADMIN_EMAIL
```

### Files You Need to Know

| File | Purpose |
|------|---------|
| START_HERE.md | Read this first |
| js/email-service.js | Update this with credentials |
| templates/*.html | Email templates |
| cart.html | Already updated |

### Email Methods Available

```javascript
// Automatic on checkout
EmailService.sendOrderConfirmation(order);

// Optional later
EmailService.sendOrderShipped(orderData);
EmailService.sendInvoice(order);
EmailService.sendAdminNotification(subject, html);
```

### Troubleshooting Checklist

```
❌ Emails not sending?
  ✓ Check EmailJS credentials
  ✓ Check browser console (F12)
  ✓ Check templates folder exists
  ✓ Check template IDs match

❌ Error: "emailjs is not defined"
  ✓ Already fixed in code

❌ Email formatting broken
  ✓ Check template {{VARIABLES}}

❌ Emails in spam
  ✓ Normal for new accounts
  ✓ Add SPF/DKIM records
```

### Time to Live
```
Setup: 12 minutes
Testing: 2 minutes
---
Total: 14 minutes
```

### Key Documentation
```
Quick Start:     START_HERE.md
Detailed Guide:  EMAILJS_SETUP.md
Checklist:       EMAIL_INTEGRATION_CHECKLIST.md
Technical Ref:   EMAIL_SYSTEM_DOCS.md
Code Breakdown:  CODE_INTEGRATION_DETAILS.md
```

### Support Links
```
EmailJS Docs: https://www.emailjs.com/docs/
Template Ref: templates/README.html
Setup Help:   EMAILJS_SETUP.md (Troubleshooting section)
```

### Code Changes
```
Only 2 changes to cart.html:
1. Added: <script src="js/email-service.js"></script>
2. Added: EmailService.sendOrderConfirmation(order);
```

### Template Variables
```
{{CUSTOMER_NAME}}      - Customer's full name
{{ORDER_NUMBER}}       - Order ID (AV1234567890)
{{ORDER_DATE}}         - When order was placed
{{DELIVERY_DATE}}      - Estimated delivery
{{ORDER_ITEMS}}        - HTML table of items
{{SUBTOTAL}}           - Item total
{{SHIPPING}}           - Shipping cost
{{TOTAL}}              - Order total
{{CUSTOMER_ADDRESS}}   - Street address
{{CUSTOMER_CITY}}      - City
{{CUSTOMER_POSTAL}}    - Postal code
{{PAYMENT_INFO}}       - Payment details
```

### Success Indicators
```
✓ EmailJS account created
✓ Credentials entered in js/email-service.js
✓ Test order placed
✓ Confirmation email received
✓ Admin notification received
✓ Email has all order details
✓ Professional formatting visible
```

### File Locations
```
js/email-service.js
templates/order-confirmation-email.html
templates/order-shipped-email.html
templates/invoice.html
templates/README.html
cart.html (updated)
```

### Email Content
```
Confirmation Email:
- Order number & date
- Items ordered
- Price breakdown
- Delivery address
- Contact info

Admin Email:
- Customer details
- Order summary
- Action needed note
```

### Configuration Places
```
https://dashboard.emailjs.com/admin/account
 → Get EMAILJS_PUBLIC_KEY

https://dashboard.emailjs.com/admin/services
 → Get EMAILJS_SERVICE_ID

https://dashboard.emailjs.com/admin/templates
 → Create templates, get IDs
```

### Next Actions
1. ⬜ Create EmailJS account
2. ⬜ Get credentials
3. ⬜ Update js/email-service.js
4. ⬜ Test order
5. ⬜ Verify emails received
6. ⬜ System live! 🎉

---

**Version:** 1.0  
**Status:** Ready for setup  
**Time to Deploy:** 12 minutes

**Start with:** START_HERE.md
