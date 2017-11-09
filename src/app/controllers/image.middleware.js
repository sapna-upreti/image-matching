import AuthToken from './auth.token';
import AppError from '../../libs/app-error/index';

const AuthAccess = {
  cookie: {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    anyone(req, res, next) {
      AuthToken.extractFromCookie(req, (err) => {
        if (err) AuthToken.remove(res);
        next();
      });
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    logged(req, res, next) {
      AuthToken.extractFromCookie(req, (err) => {
        if (!err) {
          return next();
        }
        // Changed this to return response with status of error directly without going to next()
        AuthToken.remove(res);
        return res.status(403).send(err);
      });
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    admin(req, res, next) {
      this.logged(req, res, (err) => {
        if (err) return next(err);
        if (req.user.role !== 'admin') {
          return next(AppError.forbidden());
        }

        next();
      });
    },
  },

  header: {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    anyone(req, res, next) {
      AuthToken.extractFromHeader(req, (err) => {
        if (err) AuthToken.remove(res);
        next();
      });
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    logged(req, res, next) {
      AuthToken.extractFromHeader(req, (err) => {
        if (!err) return next();

        AuthToken.remove(res);
        next(err);
      });
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    admin(req, res, next) {
      this.logged(req, res, (err) => {
        if (err) return next(err);
        if (req.user.role !== 'admin') {
          return next(AppError.forbidden());
        }

        next();
      });
    },
  },
};

export default AuthAccess;
