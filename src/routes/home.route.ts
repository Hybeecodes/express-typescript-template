import { Router } from 'express';
import serviceLocator from '../shared/DI/injector';
import {Constants} from "../shared/DI/constants";
import {HomeController} from "../controllers/home.controller";

const homeController = serviceLocator.get<HomeController>(Constants.HOME_CONTROLLER);

const router = Router();

/* GET home page. */
router.get('/', homeController.home);

export default router;
