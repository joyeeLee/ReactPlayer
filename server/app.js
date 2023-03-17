const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');
const upload = multer();
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get("/no-cors", (req, res) => {
  console.info("GET /no-cors",req.query);
  res.json({
    text: "You should not see this via a CORS request."
  });
});

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */

const issue2options = {
  origin: true,
  methods: ["POST","OPTIONS"],
  credentials: true,
  maxAge: 3600
};

app.options("/issue-2", cors(issue2options));
app.post("/issue-2",cors(issue2options),upload.single('files') ,(req, res) => {
  console.log(req)
  // fs.writeFileSync(path.join('./assets/imgs/'+req.file.originalname), req.file.buffer);
  res.json({
    text: "Issue #2 is fd."
  });
});

/* -------------------------------------------------------------------------- */

if (!module.parent) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Express server listening on port " + port + ".");
  });
}