import { Router } from "express";
import * as controller from "../controllers/controller.js";
const router = Router();

/** Start Routes API*/
router.route('/appstate')
  .get(controller.getQuizState)
  .post(controller.insertQuizState);

/** Questions Routes API*/
router.route('/questions')
  .get(controller.getQuestions)
  .post(controller.insertQuestions)
  .delete(controller.deleteQuestions);

  /** Result Routes API*/
router.route('/result')
  .get(controller.getResult)
  .post(controller.storeResult)
  .delete(controller.deleteResult);

export default router;