import express from  "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createCheckoutSession, getAllPurchaseedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controllers.js";
const router = express.Router();
    router.route("/checkout/create-checkout-session/").post(isAuthenticated,createCheckoutSession)
    router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook);
    router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);

    router.route("/").get(isAuthenticated,getAllPurchaseedCourse);

export default router;