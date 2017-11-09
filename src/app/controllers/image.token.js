import jwt from 'jsonwebtoken';
import AuthError from './auth.errors.js';
import config from '../../config/main';
import AppError from '../../libs/app-error/index';
import Access from '../../models/utils/access.utils';

const AuthToken = {

  /**
   *
   * @param payload
   */
  generate(payload) {
    return jwt.sign(payload, config.jwt.secret, config.jwt.options);
  },

  /**
   *
   * @param token
   * @param done
   */
  verify(token, done) {
    jwt.verify(token, config.jwt.secret, config.jwt.options, (err, data) => {
      if (!err) return done(null, data);

      if (err.name === 'TokenExpiredError') {
        done(AuthError.expired());
      } else {
        done(AuthError.invalidToken());
      }
    });
  },

  /**
   *
   * @param res
   * @param data
   * @returns {String} token
   */
  set(res, data) {
    const token = AuthToken.generate(data);
    res.cookie('jwt-acl', token, { expires: 0, path: '/' });

    return token;
  },

  /**
   *
   * @param res
   */
  remove(res) {
    res.clearCookie('jwt-acl', { path: '/' });
  },

  /**
   *
   * @param req
   * @param done
   */
  extractFromCookie(req, done) {
    console.log(req.body)
    const token = req.cookies['jwt-acl'];
    if (!token) return done(AppError.unauthorized());

    AuthToken.verify(token, (err, data) => {
      if (err) return done(AuthError.invalidToken());
      req.user = data;
      // add Access Utils class to request
      req.access = new Access(data);

      done(null, data);
    });
  },

  /**
   *
   * @param req
   * @param done
   * @returns {*}
   */
  extractFromHeader(req, done) {
    const bearer = req.header('Authorization');

    if (!bearer) return done(AppError.unauthorized());

    if (bearer.indexOf('Bearer ') !== 0) return done(AuthError.invalidAuthorizationHeader());

    const token = bearer.replace('Bearer ', '').trim();
    if (!token) return done(AppError.unauthorized());

    AuthToken.verify(token, (err, data) => {
      if (err) return done(AuthError.invalidToken());
      req.user = data;
      // add Access Utils class to request
      req.access = new Access(data);

      done(null, data);
    });
  },
};

export default AuthToken;
