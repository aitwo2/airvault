// Firebase Database Helper Functions

// Save hero section to Firebase
async function saveHeroToFirebase(heroData) {
    if (!isFirebaseReady || !HERO_REF) {
        console.log('Firebase not ready, skipping Firebase save');
        return false;
    }
    try {
        await HERO_REF.set(heroData);
        console.log('✓ Hero saved to Firebase:', heroData);
        return true;
    } catch (error) {
        console.error('✗ Error saving hero to Firebase:', error);
        return false;
    }
}

// Load hero section from Firebase
function loadHeroFromFirebase(callback) {
    if (!isFirebaseReady || !HERO_REF) {
        console.log('Firebase not ready, cannot load hero');
        return;
    }
    try {
        HERO_REF.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                console.log('✓ Hero loaded from Firebase:', data);
                callback(data);
            }
        }, error => {
            console.error('✗ Error loading hero from Firebase:', error);
        });
    } catch (error) {
        console.error('✗ Firebase error:', error);
    }
}

// Save brands to Firebase
async function saveBrandsToFirebase(brandsData) {
    if (!isFirebaseReady || !BRANDS_REF) {
        console.log('Firebase not ready, skipping Firebase save');
        return false;
    }
    try {
        await BRANDS_REF.set(brandsData);
        console.log('✓ Brands saved to Firebase:', brandsData);
        return true;
    } catch (error) {
        console.error('✗ Error saving brands to Firebase:', error);
        return false;
    }
}

// Load brands from Firebase
function loadBrandsFromFirebase(callback) {
    if (!isFirebaseReady || !BRANDS_REF) {
        console.log('Firebase not ready, cannot load brands');
        return;
    }
    try {
        BRANDS_REF.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                console.log('✓ Brands loaded from Firebase:', data);
                callback(data);
            }
        }, error => {
            console.error('✗ Error loading brands from Firebase:', error);
        });
    } catch (error) {
        console.error('✗ Firebase error:', error);
    }
}

// Save products to Firebase
async function saveProductsToFirebase(productsData) {
    if (!isFirebaseReady || !PRODUCTS_REF) {
        console.log('Firebase not ready, skipping Firebase save');
        return false;
    }
    try {
        await PRODUCTS_REF.set(productsData);
        console.log('✓ Products saved to Firebase:', productsData);
        return true;
    } catch (error) {
        console.error('✗ Error saving products to Firebase:', error);
        return false;
    }
}

// Load products from Firebase
function loadProductsFromFirebase(callback) {
    if (!isFirebaseReady || !PRODUCTS_REF) {
        console.log('Firebase not ready, cannot load products');
        return;
    }
    try {
        PRODUCTS_REF.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                console.log('✓ Products loaded from Firebase:', data);
                callback(data);
            }
        }, error => {
            console.error('✗ Error loading products from Firebase:', error);
        });
    } catch (error) {
        console.error('✗ Firebase error:', error);
    }
}

// Save reviews to Firebase
async function saveReviewsToFirebase(reviewsData) {
    if (!isFirebaseReady || !REVIEWS_REF) {
        console.log('Firebase not ready, skipping Firebase save');
        return false;
    }
    try {
        await REVIEWS_REF.set(reviewsData);
        console.log('✓ Reviews saved to Firebase:', reviewsData);
        return true;
    } catch (error) {
        console.error('✗ Error saving reviews to Firebase:', error);
        return false;
    }
}

// Load reviews from Firebase
function loadReviewsFromFirebase(callback) {
    if (!isFirebaseReady || !REVIEWS_REF) {
        console.log('Firebase not ready, cannot load reviews');
        return;
    }
    try {
        REVIEWS_REF.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                console.log('✓ Reviews loaded from Firebase:', data);
                callback(data);
            }
        }, error => {
            console.error('✗ Error loading reviews from Firebase:', error);
        });
    } catch (error) {
        console.error('✗ Firebase error:', error);
    }
}

// Save banking details to Firebase
async function saveBankingDetailsToFirebase(bankingData) {
    if (!isFirebaseReady || !BANKING_REF) {
        console.log('Firebase not ready, skipping Firebase save');
        return false;
    }
    try {
        await BANKING_REF.set(bankingData);
        console.log('✓ Banking details saved to Firebase:', bankingData);
        return true;
    } catch (error) {
        console.error('✗ Error saving banking details to Firebase:', error);
        return false;
    }
}

// Load banking details from Firebase
function loadBankingDetailsFromFirebase(callback) {
    if (!isFirebaseReady || !BANKING_REF) {
        console.log('Firebase not ready, cannot load banking details');
        return;
    }
    try {
        BANKING_REF.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                console.log('✓ Banking details loaded from Firebase:', data);
                callback(data);
            }
        }, error => {
            console.error('✗ Error loading banking details from Firebase:', error);
        });
    } catch (error) {
        console.error('✗ Firebase error:', error);
    }
}

// Stop listening to Firebase updates
function stopListeningToFirebase() {
    if (isFirebaseReady) {
        if (HERO_REF) HERO_REF.off();
        if (BRANDS_REF) BRANDS_REF.off();
        if (PRODUCTS_REF) PRODUCTS_REF.off();
        if (REVIEWS_REF) REVIEWS_REF.off();
        if (BANKING_REF) BANKING_REF.off();
    }
}
