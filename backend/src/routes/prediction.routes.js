import {Router} from 'express';
import {
    createPrediction,
    getMyPredictions,
    getPredictionsById
} from '../controllers/prediction.controller.js';
import {verifyJWT, optionalAuth} from '../middlewares/auth.middleware.js';

const router = Router()

// Un-secured routes
router.route("/create").post(optionalAuth, createPrediction)

// secured routes
router.route("/history").get(verifyJWT, getMyPredictions)
router.route("/:id").get(verifyJWT, getPredictionsById)

export default router
