import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { iconfig } from "./config/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

const app = express();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: iconfig.GOOGLE_CLIENT_ID,
      clientSecret: iconfig.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (_, __, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
