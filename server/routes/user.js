import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js";


const router = express.Router();

// Get Trip List
router.get("/:userId/trips", async (req, res) => {
    try {
        const { userId } = req.params;
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");
        res.status(202).json(trips);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Can not find trips!", error: err.message });
    }
});

// Add Listing to Wishlist
router.patch("/:usesrId/:listingId", async (req, res) => {
    try {
        const { userId, listingId } = req.params;
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");

        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);

        if(favoriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
            await user.save();
            res.status(200).json({ message: "Listing removed from WishList", wishList:user.wishList });
        } else {
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({ message: "Listing is added to WishList", wishList:user.wishList });
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({  error: err.message });
    }
})

export default router;