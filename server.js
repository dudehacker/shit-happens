//Install express server
const express = require('express');
const path = require('path');
const app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/fridaygame'));
app.get('/*', function(req,res) {
  const index = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(index);
});
// Start the app by listening on the default Heroku port
console.log("Server Started");
app.listen(process.env.PORT || 8080);
