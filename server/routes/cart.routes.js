// routes/cart.route.js
import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controllers.js";
import authUser from "../middleware/userAuth.js";

const cartRouter = express.Router();

cartRouter.post("/add-cart", authUser, addToCart);
cartRouter.get("/get-cart", authUser, getCart);
cartRouter.post("/remove-item", authUser, removeFromCart);

export default cartRouter;
