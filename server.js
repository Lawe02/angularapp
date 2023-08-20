const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(__dirname + '/dist/angularapp'));

// Handle all other routes and return the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/angularapp/index.html'));
});

// Start the server
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
