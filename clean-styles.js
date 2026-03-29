const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Regex to remove <style jsx>{` ... `}</style> precisely
  const replaced = content.replace(/<style jsx>\{`[\s\S]*?`\}<\/style>/g, '');
  if (replaced !== content) {
    fs.writeFileSync(filePath, replaced);
    console.log(`Cleaned ${filePath}`);
  }
}

const files = [
  'components/layout/Navbar.tsx',
  'components/layout/Footer.tsx',
  'components/layout/CartDrawer.tsx',
  'app/shop/page.tsx',
  'app/product/[id]/page.tsx',
  'app/page.tsx'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, 'src', f);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
