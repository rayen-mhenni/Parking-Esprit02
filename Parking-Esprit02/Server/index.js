const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./database/connexion");
const jwt = require("jsonwebtoken");


const PORT = /*process.env.PORT || */ 5000;
//Import Routes
const userRouter = require("./routes/user-route");
const promotionRouter = require("./routes/promotion-route");
const parkingRouter = require("./routes/parking-route");
const parkingsRouter = require("./routes/parkings-route");
const loginRouter = require("./routes/login-route");
const resetPasswordRouter = require("./routes/resetPassword-route");
const car = require("./routes/car-route");
const pub = require("./routes/pub-route");

const factureRouter=require("./routes/facture-route")
const reclamationRouter=require("./routes/reclamation-router")

const sendMail = require("./services/emailService")

const { OAuth2Client } = require('google-auth-library');

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);





dotenv.config();

//Connect DB

connectDB();

//Middlewear

app.use(express.json());
//Route Middlewares


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }
    next();
  });



  const multer = require('multer');
  const path = require('path');


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../client/src/uploads')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}


const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})


// POST File
app.post('/api/upload', upload.single('image'), (req, res) => {

   if (req.file.location){
    return res.status(200).json({message:"Image Uploaded With Success"});
   }
  
   res.send(req.file.location)

});


//Login Google 

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, email, picture , sub } = ticket.getPayload();

  upsert(users, { name, email, picture });
  let Usertoken =   jwt.sign(
    { _id: sub , email: email },
    "ParkingReactApXXX2020",
    {
      expiresIn: "24h",
    }
  )
  res.status(201);
  res.json({ name, email, photo:picture,token:Usertoken,_id: sub });
});




app.use("/api/users", userRouter);
app.use("/api/users", loginRouter);
app.use("/api/users", resetPasswordRouter);
app.use("/api/promotions", promotionRouter)
app.use("/api/parking", parkingRouter)
app.use("/api/parkings", parkingsRouter)


app.use("/api/factures",factureRouter )
app.use("/api/reclamation",reclamationRouter )
app.use("/api/car",car )
app.use("/api/pub",pub )


app.listen(PORT, () => console.log("Running"));





