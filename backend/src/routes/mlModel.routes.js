import { Router } from "express";
import {
    diseasePrediction,
    heartAttackRiskPrediction,
    strokeRiskPrediction,
    diabetesRiskPrediction
} from '../services/ml.service.js';

const router = Router()

// secured routes
router.route("/disease-prediction").post(diseasePrediction)
router.route("/heart-attack-risk").post(heartAttackRiskPrediction)
router.route("/stroke-risk").post(strokeRiskPrediction)
router.route("/diabetes-risk").post(diabetesRiskPrediction)


export default router
