const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (error, user) => {
        if (error) throw error;
        resolve(user);
      }
    );
  });
}

app.get("/", (req, res) => {
  res.json("Working successfully");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.send({ user });
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        jwt.sign(
          { email: user.email, userId: user.userId },
          process.env.JWT_SECRET,
          {},
          (error, token) => {
            if (error) throw error;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("Incorrect password");
      }
    } else {
      res.status(404).json("User not found.");
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

app.get("/profile", async (req, res) => {
  const user = await getUserDataFromReq(req);
  try {
    const { name, email, userId } = await User.findOne({
      userId: user.userId,
    });
    res.json({ name, email, userId });
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpeg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({
  dest: "uploads/",
});

app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const user = await getUserDataFromReq(req);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    const place = await Place.create({
      owner: user.userId,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(place);
  } catch (error) {
    console.log(error);
  }
});

app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

app.get("/user-places", async (req, res) => {
  const user = await getUserDataFromReq(req);
  try {
    const places = await Place.find({ owner: user.userId });
    res.json(places);
  } catch (err) {
    console.log(err);
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findOne({ placeId: id });
  res.json(place);
});

app.put("/places/:id", async (req, res) => {
  const user = await getUserDataFromReq(req);
  const { id } = req.params;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    const place = await Place.find({ placeId: id });
    if (user.userId === place[0].owner) {
      const place = await Place.findOneAndUpdate(
        { placeId: id },
        {
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        }
      );
      res.json(place);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/bookings", async (req, res) => {
  const user = await getUserDataFromReq(req);
  const { checkIn, checkOut, numberOfGuests, name, mobile, place, price } =
    req.body;
  try {
    const booking = await Booking.create({
      placeId: place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      price,
      userId: user.userId,
    });
    res.json(booking);
  } catch (err) {
    console.log(err);
  }
});

app.get("/bookings", async (req, res) => {
  const user = await getUserDataFromReq(req);
  try {
    const bookings = await Booking.aggregate([
      {
        $match: {
          userId: user.userId,
        },
      },
      {
        $lookup: {
          from: "places",
          localField: "placeId",
          foreignField: "placeId",
          as: "place",
        },
      },
      {
        $unwind: {
          path: "$place",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.json(bookings);
  } catch (err) {
    console.log(err);
  }
});

app.get("/bookings/:id", async (req, res) => {
  const user = await getUserDataFromReq(req);
  const { id } = req.params;
  try {
    const booking = await Booking.aggregate([
      {
        $match: {
          userId: user.userId,
          bookingId: id,
        },
      },
      {
        $lookup: {
          from: "places",
          localField: "placeId",
          foreignField: "placeId",
          as: "place",
        },
      },
      {
        $unwind: {
          path: "$place",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.json(booking[0]);
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000);
