const fs = require('fs');
const path = require('path');

// Path to data storage in Netlify build directory
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
    console.log('Loading default content:', err.message);
  }
  return defaultContent;
}

exports.handler = async (event, context) => {
  try {
    const content = getContent();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(content)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get content' })
    };
  }
};
