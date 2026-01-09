const fs = require('fs');
const path = require('path');

// Path to data storage
const DATA_DIR = process.env.NETLIFY_BUILD_BASE || '/tmp';
const DATA_FILE = path.join(DATA_DIR, 'site-content.json');

// Default content data
const defaultContent = {
  hero: {
    title: 'Authentic Sneakers for Every Style',
    subtitle: 'Discover the world\'s most coveted sneaker brands at unbeatable prices',
    imageUrl: 'images/hero-sneaker.jpg'
  },
  brands: [
    {id: 1, name: 'Nike', image: 'https://via.placeholder.com/150?text=Nike', description: 'Air Jordan, Air Max & More'},
    {id: 2, name: 'Adidas', image: 'https://via.placeholder.com/150?text=Adidas', description: 'Yeezy, Boost & Originals'},
    {id: 3, name: 'Puma', image: 'https://via.placeholder.com/150?text=Puma', description: 'Rs-X, Suede & Classics'},
    {id: 4, name: 'New Balance', image: 'https://via.placeholder.com/150?text=New+Balance', description: '990v6, 550 & 574'}
  ]
};

function getContent() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.log('Using default content:', err.message);
  }
  return defaultContent;
}

function saveContent(content) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving content:', err);
    return false;
  }
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ok: true})
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const action = body.action;
    let content = getContent();

    switch(action) {
      case 'update-hero':
        content.hero = body.data;
        saveContent(content);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({success: true, hero: content.hero})
        };

      case 'update-brand':
        const brandIndex = content.brands.findIndex(b => b.id === body.brandId);
        if (brandIndex !== -1) {
          content.brands[brandIndex] = {...content.brands[brandIndex], ...body.data};
          saveContent(content);
        }
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({success: true, brands: content.brands})
        };

      case 'delete-brand':
        content.brands = content.brands.filter(b => b.id !== body.brandId);
        saveContent(content);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({success: true, brands: content.brands})
        };

      case 'add-brand':
        const newBrand = {...body.data, id: Date.now()};
        content.brands.push(newBrand);
        saveContent(content);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({success: true, brands: content.brands})
        };

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({error: 'Unknown action'})
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({error: 'Server error', message: error.message})
    };
  }
};
