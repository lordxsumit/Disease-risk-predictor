import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    diseasePrediction,
    heartAttackRiskPrediction,
    strokeRiskPrediction,
    diabetesRiskPrediction
} from '../controllers/mlModel.controller.js';

const router = Router()

// secured routes
router.route("/disease-prediction").post(diseasePrediction)
router.route("/heart-attack-risk").post(heartAttackRiskPrediction)
router.route("/stroke-risk").post(strokeRiskPrediction)
router.route("/diabetes-risk").post(diabetesRiskPrediction)


export default router
