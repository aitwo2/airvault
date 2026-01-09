# 🛠️ Admin Portal Guide - AirVault Accessories

## Access Admin Portal
**URL:** `http://localhost:8000/admin-portal.html`

---

## Features

### 📦 Product Management

#### Add New Products
1. Fill in the product details:
   - **Product Name**: e.g., "Nike Air Jordan 1 Retro High"
   - **Brand**: Select from dropdown (Nike, Adidas, Puma, New Balance, Reebok, Converse, Vans)
   - **Price**: Enter in Rand (R), e.g., 1499.99
   - **Product Image**: 
     - URL format: `https://example.com/image.jpg`
     - Emoji format: `👟` or any emoji
   - **Description** (optional): Brief product info

2. Click "Add Product" button
3. Product instantly syncs to shopping page!

#### Edit Products
1. Locate product in the "Manage Products" section
2. Click "Edit" button
3. Update information in the modal
4. Click "Save Changes"
5. Changes sync immediately to shopping page

#### Delete Products
1. Click "Delete" button next to the product
2. Confirm deletion
3. Product removed from store

---

### 🏦 Banking Details
Update your bank account information used for payment instructions:
- **Account Name**: Your business name
- **Bank Name**: Your bank
- **Account Number**: Full account number
- **Branch Code**: Banking branch code

When customers choose "Bank Transfer" at checkout, they'll see your updated banking details.

---

## Real-time Sync to Shopping Page

✓ **Automatic Syncing**: Products and prices sync instantly to the shopping page
✓ **No Refresh Needed**: Changes appear immediately without customer refresh
✓ **Cart Compatibility**: Customers can add/remove products seamlessly

---

## Product Statistics

The top of the portal shows:
- **Total Products**: Current number of products in store
- **Last Updated**: Timestamp of latest change

---

## Tips & Best Practices

1. **Image URLs**: Use high-quality product images
   - Format: PNG, JPG, JPEG, WebP
   - Size: 300x300px or larger recommended
   - Example: `https://cdn.example.com/product-image.jpg`

2. **Pricing**: Always use ZA Rand (R)
   - Example: 1499.99 for R1,499.99
   - Include decimal places

3. **Brand Consistency**: Use capitalized brand names for filters to work properly
   - ✓ Correct: "Nike", "Adidas"
   - ✗ Incorrect: "nike", "ADIDAS"

4. **Product Names**: Keep names clear and concise
   - Include size/color if applicable
   - Example: "Nike Air Max 90 White/Black"

5. **Regular Updates**: Add new stock regularly to keep store fresh

---

## Troubleshooting

### Products Not Appearing on Shopping Page
- **Check**: Admin portal shows products exist
- **Solution**: Wait 1-2 seconds for sync, then refresh shopping page

### Banking Details Not Showing at Checkout
- **Check**: Details were saved (success message appears)
- **Solution**: Customer must select "Bank Transfer" payment method

### Image Not Loading
- **Check**: URL is correct and publicly accessible
- **Solution**: Use emoji fallback (`👟`) or verify image URL works

---

## Data Storage

All admin data is stored locally in browser:
- Products: `localStorage.adminProducts`
- Banking Details: `localStorage.bankingDetails`
- Cart Data: `localStorage.cart`

**Note**: Data persists across browser sessions. Clear browser cache to reset.

---

## Security Notes

⚠️ **Important**: This is a local admin panel. For production use:
- Add password protection
- Use server-side database
- Implement user authentication
- Use secure API endpoints

---

## Support

For issues or feature requests:
- 📧 Email: airvaultaccessories@gmail.com
- 📱 WhatsApp: +27 (0)83 402 1278
- 📷 Instagram: @airvaultaccessories

---

**Last Updated**: January 9, 2026
