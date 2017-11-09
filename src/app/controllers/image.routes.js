import { Router } from 'express';
import * as AuthController from './auth.controller';
import AuthValidate from './auth.validate';
import AuthAccess from '../auth/auth.middleware';

const AuthRouter = new Router();

AuthRouter.route('/auth/login').post(AuthController.login);
AuthRouter.route('/auth/logout').post(AuthAccess.cookie.anyone, AuthController.logout);
AuthRouter.route('/auth/change-password').post(AuthAccess.cookie.logged, AuthController.changePassword);
AuthRouter.route('/auth/verify-email/:token').get(AuthValidate.hasToken, AuthController.onVerifyEmailLink);

AuthRouter.route('/auth/forgot-password').post(AuthController.forgotPassword);
AuthRouter.route('/auth/forgot-password/:token').get(AuthValidate.hasToken, AuthController.onForgotPasswordLink);

AuthRouter.route('/auth/reset-password').post(AuthController.resetPasswordByUser);
AuthRouter.route('/auth/reset-password/:token').get(AuthValidate.hasToken, AuthController.onResetPasswordLink);

export default AuthRouter;
