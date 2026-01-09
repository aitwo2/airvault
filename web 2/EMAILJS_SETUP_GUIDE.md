# EmailJS Setup Guide for AirVault Accessories

## Current Configuration

Your website uses EmailJS for sending transactional emails:
- **Service ID**: `service_bmlh2ak`
- **Customer Template ID**: `template_19xkkeh`
- **Admin Template ID**: `template_oa4povb`

## Required Template Variables

### Template 1: Customer Order Confirmation (template_19xkkeh)

This template should accept the following variables:

```
{{to_name}}
{{customer_name}}
{{customer_email}}
{{order_number}}
{{order_date}}
{{delivery_date}}
{{items}}
{{subtotal}}
{{shipping}}
{{total}}
{{address}}
{{phone}}
{{payment_method}}
{{message}}
```

**Template Example:**
```
Subject: {{subject}}

Hi {{customer_name}},

{{message}}

Order Details:
- Order Number: {{order_number}}
- Date: {{order_date}}
- Delivery: {{delivery_date}}

Items:
{{items}}

Summary:
Subtotal: {{subtotal}}
Shipping: {{shipping}}
Total: {{total}}

Delivery Address:
{{address}}
Phone: {{phone}}

Payment Method: {{payment_method}}

Thank you for shopping with AirVault!
```

---

### Template 2: Admin Order Notification (template_oa4povb)

This template should accept the following variables:

```
{{to_name}}
{{customer_name}}
{{customer_email}}
{{customer_phone}}
{{order_number}}
{{order_date}}
{{items}}
{{total}}
{{payment_method}}
{{message}}
```

**Template Example:**
```
Subject: {{subject}}

{{message}}

Customer: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

Items:
{{items}}

Total: {{total}}
Payment: {{payment_method}}

Order ready for processing.
```

---

## Setup Steps

1. **Log in to EmailJS Dashboard**: https://dashboard.emailjs.com/

2. **Create/Update Templates**:
   - Go to Email Templates
   - Create two templates with the IDs above
   - Add the variables shown above
   - Set up your email layout

3. **Verify Variables**:
   - Make sure variable names in templates match exactly (case-sensitive)
   - Use double braces: `{{variable_name}}`

4. **Test**:
   - Place an order on the website
   - Check both customer and admin email inboxes
   - Monitor browser console for any errors

## Contact Form Template

For contact form emails, uses:
- Template ID: `template_oa4povb`
- Variables: `to_email`, `from_name`, `from_email`, `subject`, `message`

## Troubleshooting

If you get a **400 error**:
1. Check that all template variable names match exactly
2. Verify template IDs are correct
3. Ensure service ID is correct
4. Open DevTools Network tab and check the exact error message

If emails aren't sending:
1. Orders will still complete (email is non-blocking)
2. Check EmailJS dashboard for quota limits
3. Verify your service plan is active
