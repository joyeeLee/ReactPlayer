const express = require("express");
const process = require('process')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const {imgFontsRouter} = require('./router')
app.use('/imgFontsRouter',imgFontsRouter)
app.use('/assets/imgs/', express.static('assets/imgs/'));


process.on("uncaughtException", (err, origin) => {
  console.log(err.message);
 });
  

/* -------------------------------------------------------------------------- */
if (!module.parent) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Express server listening on port " + port + ".");
  });
}