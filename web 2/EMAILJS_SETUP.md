# EmailJS Setup Guide for AirVault Accessories

## Overview
The email system is now fully integrated into your AirVault Accessories website. To start sending customer confirmation emails and admin notifications, you need to configure EmailJS credentials.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS Website](https://www.emailjs.com)
2. Click **"Sign Up for Free"**
3. Create your account with your email
4. Verify your email address

## Step 2: Get Your Credentials

### Get Public Key
1. Log in to your EmailJS dashboard
2. Click on **"Account"** in the left sidebar
3. Copy your **Public Key** (looks like: `abcdef123456789xyz`)

### Create an Email Service
1. Click on **"Email Services"** in the left sidebar
2. Click **"Create New Service"**
3. Choose your email provider (Gmail recommended)
4. Follow the setup wizard to connect your email
5. Copy the **Service ID** (looks like: `service_abc123xyz`)

### Create Email Templates
1. Click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. For each template below, create a new one:

#### Template 1: Order Confirmation
- **Template Name:** Order Confirmation
- **Template ID:** Note this down (looks like: `template_abc123xyz`)
- **Subject:** `Order Confirmed - {{ORDER_NUMBER}}`
- **HTML Content:** Use the content from `templates/order-confirmation-email.html`

#### Template 2: Order Shipped
- **Template Name:** Order Shipped
- **Template ID:** Note this down
- **Subject:** `Your {{ORDER_NUMBER}} is on its way!`
- **HTML Content:** Use the content from `templates/order-shipped-email.html`

#### Template 3: Invoice
- **Template Name:** Invoice
- **Template ID:** Note this down
- **Subject:** `Invoice - {{ORDER_NUMBER}}`
- **HTML Content:** Use the content from `templates/invoice.html`

## Step 3: Update Configuration

Open the file: **js/email-service.js**

Find these lines at the top:
```javascript
const EMAILJS_SERVICE_ID = 'service_airvault'; // Replace with your service ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with your public key
const EMAILJS_TEMPLATE_CONFIRMATION = 'template_confirmation'; // Replace with your template ID
const EMAILJS_TEMPLATE_SHIPPED = 'template_shipped'; // Replace with your template ID
const EMAILJS_TEMPLATE_INVOICE = 'template_invoice'; // Replace with your template ID
const ADMIN_EMAIL = 'airvaultaccessories@gmail.com';
```

Replace them with your actual values from EmailJS:
```javascript
const EMAILJS_SERVICE_ID = 'service_your_actual_id_here';
const EMAILJS_PUBLIC_KEY = 'your_actual_public_key_here';
const EMAILJS_TEMPLATE_CONFIRMATION = 'template_your_confirmation_id';
const EMAILJS_TEMPLATE_SHIPPED = 'template_your_shipped_id';
const EMAILJS_TEMPLATE_INVOICE = 'template_your_invoice_id';
const ADMIN_EMAIL = 'your-admin-email@gmail.com'; // Change this to your actual admin email
```

## Step 4: Test the System

1. Open your website in a browser
2. Add items to your cart
3. Complete a test order
4. Check your email for confirmation email
5. Check your admin email for admin notification

## Email System Features

### Automatic Emails Sent

**1. Order Confirmation Email** - Sent to customer immediately when order is placed
   - Shows order number, items, pricing, and delivery address
   - Professional template with AirVault branding

**2. Admin Notification** - Sent to admin email when new order comes in
   - Alert about new order with customer details
   - Quick reference of order total

### Available Methods in EmailService

```javascript
// Send order confirmation to customer + admin notification
EmailService.sendOrderConfirmation(order);

// Send shipping notification to customer
EmailService.sendOrderShipped(orderData);

// Send invoice to customer
EmailService.sendInvoice(order);

// Send admin alert
EmailService.sendAdminNotification(subject, htmlContent);
```

## Troubleshooting

### Emails Not Sending?

1. **Check EmailJS is initialized**
   - Open browser console (F12)
   - You should NOT see error: "emailjs is not defined"

2. **Verify credentials are correct**
   - Double-check your public key and service ID
   - Make sure template IDs match exactly

3. **Check email templates exist**
   - Verify all 3 template files exist in `/templates/` folder:
     - `order-confirmation-email.html`
     - `order-shipped-email.html`
     - `invoice.html`

4. **Check browser console for errors**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for red error messages
   - Copy the error and check EmailJS documentation

5. **Verify email account allows sending**
   - Gmail requires "Less secure app access" to be enabled
   - Or use Gmail App Passwords instead

## Email Template Variables

All templates support these variables (using `{{VARIABLE_NAME}}` syntax):

### Order Confirmation Template
- `{{CUSTOMER_NAME}}` - Customer's full name
- `{{ORDER_NUMBER}}` - Order ID (e.g., AV1234567890)
- `{{ORDER_DATE}}` - Date order was placed
- `{{DELIVERY_DATE}}` - Estimated delivery date
- `{{ORDER_ITEMS}}` - HTML table of items ordered
- `{{SUBTOTAL}}` - Subtotal amount
- `{{SHIPPING}}` - Shipping cost
- `{{TOTAL}}` - Total order amount
- `{{CUSTOMER_ADDRESS}}` - Street address
- `{{CUSTOMER_CITY}}` - City
- `{{CUSTOMER_POSTAL}}` - Postal code
- `{{PAYMENT_INFO}}` - Payment method details

### Order Shipped Template
- `{{CUSTOMER_NAME}}`
- `{{ORDER_NUMBER}}`
- `{{TRACKING_NUMBER}}` - Tracking/Waybill number
- `{{CARRIER}}` - Shipping company name
- `{{SHIPPING_METHOD}}` - Shipping method (e.g., Express, Standard)
- `{{EXPECTED_DELIVERY}}` - Expected delivery date
- `{{PROCESS_DATE}}` - When order was processed
- `{{SHIP_DATE}}` - When order was shipped

### Invoice Template
- All variables from Order Confirmation plus:
- `{{DUE_DATE}}` - Payment due date
- `{{PAYMENT_METHOD}}` - How payment was made
- `{{PAYMENT_DETAILS}}` - Payment reference/details

## File Locations

```
/templates/
├── order-confirmation-email.html
├── order-shipped-email.html
├── invoice.html
└── README.html (variable reference guide)

/js/
├── email-service.js (Email sending code)
└── main.js (Cart functions)

cart.html (Updated to use EmailService)
```

## Next Steps

After setting up EmailJS, you can:

1. **Add Admin Dashboard** - Create an interface to manually send shipped notifications
2. **Add Email Logs** - Track which emails were sent and when
3. **Customize Templates** - Edit the HTML templates to match your brand
4. **Add More Templates** - Create additional email types as needed

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- Template Variables Guide: See `/templates/README.html`
- Error Messages: Check browser console (F12 → Console tab)

## Security Notes

- Never share your EmailJS Public Key publicly
- The Public Key in the code is visible but limited to sending emails only
- Your Service ID connects to your email account, keep it secure
- Consider limiting which domains can use your EmailJS service in dashboard settings
