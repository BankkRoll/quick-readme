const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dist', 'index.js');
const shebang = '#!/usr/bin/env node\n';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Could not read the file:', err);
    process.exit(1);
  }

  const updatedContent = shebang + data;

  fs.writeFile(filePath, updatedContent, 'utf8', writeErr => {
    if (writeErr) {
      console.error('Could not write to the file:', writeErr);
      process.exit(1);
    }

    console.log('Shebang added successfully.');
  });
});
