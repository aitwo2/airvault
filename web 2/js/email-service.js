
// AirVault Accessories - Simplified Email Service
// Direct EmailJS integration without template dependency

const EMAILJS_SERVICE_ID = 'service_bmlh2ak';
const EMAILJS_TEMPLATE_CUSTOMER = 'template_19xkkeh';
const EMAILJS_TEMPLATE_ADMIN = 'template_oa4povb';
const EMAILJS_PUBLIC_KEY = 'tWUi0IgaLjXbqHpwc';
const ADMIN_EMAIL = 'info@airvault.com';

// Initialize EmailJS when DOM is ready
let emailjsReady = false;
document.addEventListener('DOMContentLoaded', function() {
    if (window.emailjs) {
        try {
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
            emailjsReady = true;
            console.log('✓ EmailJS initialized successfully');
        } catch (e) {
            console.error('Error initializing EmailJS:', e);
        }
    }
});

class EmailService {
    // Send order confirmation with standardized parameters
    static async sendOrderConfirmation(order) {
        if (!window.emailjs) {
            console.error('EmailJS not available');
            return false;
        }

        try {
            // Build items list
            const itemsList = (order.items || []).map(item => 
                `${item.name} (${item.quantity}x) - R${(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}`
            ).join('\n');

            // Customer confirmation email
            console.log('Sending customer email to:', order.customerEmail);
            
            const customerParams = {
                email: order.customerEmail,
                customer_name: order.customerName,
                customer_email: order.customerEmail,
                order_number: order.orderNumber,
                order_date: new Date(order.orderDate).toLocaleDateString(),
                delivery_date: new Date(order.deliveryDate).toLocaleDateString(),
                items: itemsList,
                subtotal: order.subtotal.toFixed(2),
                shipping: order.shipping.toFixed(2),
                total: order.total.toFixed(2),
                address: `${order.customerAddress}, ${order.customerCity}, ${order.customerPostal}`,
                phone: order.customerPhone,
                payment_method: order.paymentMethod === 'banktransfer' ? 'Bank Transfer' : 'Credit Card',
                message: `Thank you for your order! Order #${order.orderNumber} has been confirmed.`,
                subject: `Order Confirmation #${order.orderNumber}`,
                from_name: 'AirVault Accessories',
                from_email: ADMIN_EMAIL,
                reply_to: ADMIN_EMAIL
            };

            await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CUSTOMER, customerParams);
            console.log('✓ Customer confirmation email sent');

            // Admin notification
            console.log('Sending admin notification to:', ADMIN_EMAIL);
            
            const adminParams = {
                email: ADMIN_EMAIL,
                customer_name: order.customerName,
                customer_email: order.customerEmail,
                customer_phone: order.customerPhone,
                order_number: order.orderNumber,
                order_date: new Date(order.orderDate).toLocaleDateString(),
                items: itemsList,
                total: order.total.toFixed(2),
                payment_method: order.paymentMethod === 'banktransfer' ? 'Bank Transfer' : 'Credit Card',
                message: `New order received! Order #${order.orderNumber} from ${order.customerName}`,
                subject: `[NEW ORDER] #${order.orderNumber}`,
                from_name: 'AirVault Order System',
                from_email: ADMIN_EMAIL,
                reply_to: order.customerEmail
            };

            await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, adminParams);
            console.log('✓ Admin notification sent');
            return true;

        } catch (error) {
            console.error('Error sending emails:', error);
            console.error('Error details:', error.message);
            // Don't fail the order if email fails - still return success
            return true;
        }
    }
}
