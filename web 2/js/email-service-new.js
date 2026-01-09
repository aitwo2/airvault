/**
 * AirVault Accessories - Email Service
 * Handles sending confirmation emails using EmailJS
 */

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_je9upmy';
const EMAILJS_PUBLIC_KEY = 'gAVb28993k81lb7mS';
const EMAILJS_TEMPLATE_CUSTOMER = 'template_fxhnfm1';
const EMAILJS_TEMPLATE_ADMIN = 'template_y0c0aha';

const ADMIN_EMAIL = 'airvaultaccessories@gmail.com';

// Initialize EmailJS
let emailjsReady = false;

function waitForEmailJS() {
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            emailjsReady = true;
            console.log('✓ EmailJS initialized');
        } catch (e) {
            console.error('Error initializing EmailJS:', e);
            setTimeout(waitForEmailJS, 100);
        }
    } else {
        setTimeout(waitForEmailJS, 100);
    }
}

// Start waiting for EmailJS
waitForEmailJS();

class EmailService {
    
    /**
     * Build customer order confirmation email HTML
     */
    static buildCustomerEmail(order) {
        const orderDate = new Date(order.orderDate).toLocaleDateString('en-ZA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const deliveryDate = new Date(order.deliveryDate).toLocaleDateString('en-ZA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let itemsHTML = '';
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                const itemTotal = (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2);
                itemsHTML += `
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.name}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">R${parseFloat(item.price).toFixed(2)}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">R${itemTotal}</td>
                    </tr>
                `;
            });
        }

        let bankingSection = '';
        if (order.paymentMethod === 'banktransfer') {
            bankingSection = `
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                    <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px;">💳 Bank Transfer Payment Details</h3>
                    <p style="color: #856404; margin: 0 0 15px 0;"><strong>Please transfer the amount below using these details:</strong></p>
                    <table style="width: 100%; color: #856404; margin-bottom: 15px;">
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Account Name:</td>
                            <td style="padding: 8px;">AirVault Accessories</td>
                        </tr>
                        <tr style="background: #ffeaa7;">
                            <td style="padding: 8px; font-weight: bold;">Bank:</td>
                            <td style="padding: 8px;">First National Bank</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Account Number:</td>
                            <td style="padding: 8px;">1234567890</td>
                        </tr>
                        <tr style="background: #ffeaa7;">
                            <td style="padding: 8px; font-weight: bold;">Branch Code:</td>
                            <td style="padding: 8px;">250155</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Reference:</td>
                            <td style="padding: 8px;"><strong>${order.orderNumber}</strong></td>
                        </tr>
                    </table>
                    <p style="color: #ff6b6b; font-weight: bold; font-size: 18px; margin: 15px 0;">Amount to Transfer: R${order.total.toFixed(2)}</p>
                    <p style="color: #856404; font-size: 13px; margin: 10px 0 0 0; border-top: 1px solid #ffc107; padding-top: 10px;">
                        ⚠️ <strong>IMPORTANT:</strong> Please use your Order Number (<strong>${order.orderNumber}</strong>) as the payment reference. This helps us match your payment to your order.
                    </p>
                </div>
            `;
        } else {
            bankingSection = `
                <div style="background: #d4edda; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
                    <p style="color: #155724; margin: 0;"><strong>✓ Payment Processed</strong></p>
                    <p style="color: #155724; font-size: 14px; margin: 5px 0 0 0;">Your payment has been received and processed successfully. Thank you!</p>
                </div>
            `;
        }

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 32px; margin-bottom: 5px;">✓ Order Confirmed!</h1>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Order #${order.orderNumber}</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px; background: white;">
            
            <!-- Greeting -->
            <p style="margin: 0 0 20px 0; font-size: 16px;">Hi <strong>${order.customerName}</strong>,</p>
            <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.8;">
                Thank you for your order! We're excited to help you. Your order has been confirmed and will be processed shortly. Below are all the details of your purchase.
            </p>

            <!-- Order Summary Section -->
            <div style="margin: 30px 0; padding: 20px; background: #f0f8ff; border-left: 4px solid #3498db; border-radius: 4px;">
                <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Order Summary</h3>
                <table style="width: 100%; font-size: 14px;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Order Number:</strong></td>
                        <td style="padding: 8px 0; text-align: right;"><strong>${order.orderNumber}</strong></td>
                    </tr>
                    <tr style="background: #ffffff;">
                        <td style="padding: 8px 0;"><strong>Order Date:</strong></td>
                        <td style="padding: 8px 0; text-align: right;">${orderDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Expected Delivery:</strong></td>
                        <td style="padding: 8px 0; text-align: right;">${deliveryDate}</td>
                    </tr>
                </table>
            </div>

            <!-- Items Section -->
            <h3 style="color: #2c3e50; margin: 25px 0 15px 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Items Ordered</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="background: #ecf0f1; font-weight: bold;">
                    <td style="padding: 12px; border: 1px solid #ddd;">Product</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">Qty</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">Price</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">Total</td>
                </tr>
                ${itemsHTML}
            </table>

            <!-- Pricing Section -->
            <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                <table style="width: 100%; font-size: 15px;">
                    <tr>
                        <td style="padding: 8px 0;"><strong>Subtotal:</strong></td>
                        <td style="padding: 8px 0; text-align: right;">R${order.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;"><strong>Shipping:</strong></td>
                        <td style="padding: 8px 0; text-align: right;">R${order.shipping.toFixed(2)}</td>
                    </tr>
                    <tr style="border-top: 2px solid #ddd; font-weight: bold; font-size: 18px; color: #e74c3c;">
                        <td style="padding: 12px 0;"><strong>Total:</strong></td>
                        <td style="padding: 12px 0; text-align: right;"><strong>R${order.total.toFixed(2)}</strong></td>
                    </tr>
                </table>
            </div>

            <!-- Delivery Address -->
            <h3 style="color: #2c3e50; margin: 25px 0 15px 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Delivery Address</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px; font-size: 14px; line-height: 1.8;">
                <strong>${order.customerName}</strong><br>
                ${order.customerAddress}<br>
                ${order.customerCity}, ${order.customerPostal}<br><br>
                <strong>Phone:</strong> ${order.customerPhone}
            </div>

            <!-- Banking Details or Payment Confirmation -->
            ${bankingSection}

            <!-- Next Steps -->
            <div style="background: #e8f4f8; padding: 20px; border-radius: 4px; border-left: 4px solid #3498db; margin: 25px 0;">
                <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px;">📦 What's Next?</h3>
                <ul style="color: #2c3e50; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Your order will be processed within 24 hours</li>
                    <li style="margin-bottom: 8px;">You'll receive a shipping notification with tracking details</li>
                    <li style="margin-bottom: 8px;">Expected delivery within 7-10 business days</li>
                    <li>We're committed to getting your order to you safely and on time</li>
                </ul>
            </div>

            <!-- Contact Info -->
            <p style="margin: 30px 0 10px 0; border-top: 1px solid #ddd; padding-top: 20px; color: #666; font-size: 13px; text-align: center;">
                If you have any questions, please don't hesitate to contact us at <strong>airvaultaccessories@gmail.com</strong>
            </p>
            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
                AirVault Accessories | Thank you for your business!
            </p>
        </div>

        <!-- Footer -->
        <div style="background: #2c3e50; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© 2026 AirVault Accessories. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;

        return html;
    }

    /**
     * Build admin notification email HTML
     */
    static buildAdminEmail(order) {
        let itemsHTML = '';
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                const itemTotal = (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2);
                itemsHTML += `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 10px;">${item.name}</td>
                        <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${item.quantity}</td>
                        <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">R${parseFloat(item.price).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 10px; text-align: right;"><strong>R${itemTotal}</strong></td>
                    </tr>
                `;
            });
        }

        const html = `
<h2 style="color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">🔔 New Order Received!</h2>

<h3 style="color: #2c3e50;">Order Details</h3>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">Order Number</td>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>${order.orderNumber}</strong></td>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">Customer Name</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${order.customerName}</td>
    </tr>
    <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">Customer Email</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${order.customerEmail}</td>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">Customer Phone</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${order.customerPhone}</td>
    </tr>
    <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">Address</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${order.customerAddress}, ${order.customerCity}, ${order.customerPostal}</td>
    </tr>
</table>

<h3 style="color: #2c3e50;">Items Ordered</h3>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr style="background: #2c3e50; color: white; font-weight: bold;">
        <td style="border: 1px solid #ddd; padding: 10px;">Product</td>
        <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">Qty</td>
        <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">Price</td>
        <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">Total</td>
    </tr>
    ${itemsHTML}
</table>

<h3 style="color: #2c3e50;">Order Summary</h3>
<div style="background: #f5f5f5; padding: 15px; border-radius: 4px;">
    <p style="margin: 5px 0;"><strong>Subtotal:</strong> R${order.subtotal.toFixed(2)}</p>
    <p style="margin: 5px 0;"><strong>Shipping:</strong> R${order.shipping.toFixed(2)}</p>
    <p style="margin: 10px 0 0 0; font-size: 18px; color: #e74c3c;"><strong>Total: R${order.total.toFixed(2)}</strong></p>
</div>

<p style="margin-top: 20px; color: #666;"><strong>Payment Method:</strong> ${order.paymentMethod === 'banktransfer' ? 'Bank Transfer' : 'Credit/Debit Card'}</p>

<p style="margin-top: 20px; color: #999; font-size: 12px;">Order placed on: ${new Date(order.orderDate).toLocaleString()}</p>
        `;

        return html;
    }

    /**
     * Send order confirmation email to customer and admin
     */
    static async sendOrderConfirmation(order) {
        try {
            if (!order.customerEmail || !order.customerName) {
                console.error('Missing customer email or name');
                return false;
            }

            console.log('📧 Preparing to send order confirmation for:', order.orderNumber);

            // Wait for EmailJS to be ready
            let attempts = 0;
            while (!emailjsReady && attempts < 30) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }

            if (!emailjsReady || typeof emailjs === 'undefined') {
                console.error('❌ EmailJS is not ready');
                return false;
            }

            // Build emails
            const customerHtml = this.buildCustomerEmail(order);
            const adminHtml = this.buildAdminEmail(order);

            // Send to customer
            console.log('📧 Sending customer confirmation to:', order.customerEmail);
            const customerParams = {
                customerEmail: order.customerEmail,
                toName: order.customerName,
                messageHtml: customerHtml,
                subject: `Order Confirmation - ${order.orderNumber}`
            };

            const customerResponse = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_CUSTOMER,
                customerParams
            );

            console.log('✅ Customer email sent successfully:', customerResponse.status);

            // Send to admin
            console.log('📧 Sending admin notification');
            const adminParams = {
                customerEmail: ADMIN_EMAIL,
                toName: 'AirVault Admin',
                subject: `New Order: ${order.orderNumber} - ${order.customerName}`,
                messageHtml: adminHtml
            };

            const adminResponse = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_CUSTOMER,
                adminParams
            );

            console.log('✅ Admin email sent successfully:', adminResponse.status);

            return true;

        } catch (error) {
            console.error('❌ Error sending order confirmation:', error);
            return false;
        }
    }
}
