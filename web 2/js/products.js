// Product filtering functionality
function filterProducts() {
    const brandFilter = document.getElementById('brandFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const brand = product.getAttribute('data-brand');
        const price = parseFloat(product.getAttribute('data-price'));
        
        let showBrand = !brandFilter || brand === brandFilter;
        let showPrice = true;

        if (priceFilter) {
            const maxPrice = parseFloat(priceFilter);
            if (maxPrice === 100) {
                showPrice = price < 100;
            } else if (maxPrice === 200) {
                showPrice = price >= 100 && price < 200;
            } else if (maxPrice === 500) {
                showPrice = price >= 200 && price < 500;
            } else if (maxPrice === 9999) {
                showPrice = price >= 500;
            }
        }

        if (showBrand && showPrice) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add event listeners for filters
document.addEventListener('DOMContentLoaded', function() {
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');

    if (brandFilter) {
        brandFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
});
