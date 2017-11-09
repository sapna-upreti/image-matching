import AppError from '../../libs/app-error/index';
// import Promise from 'bluebird';
import AuthError from './auth.errors.js';
import Joi from 'joi';

const keys = {
  email: Joi.string().trim().email()
    .max(100)
    .required(),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+=,.])/).min(8)
    .max(15)
    .required(),
  token: Joi.string().required(),
};

const AuthValidate = {
  /**
   *
   * @param body
   * @returns {Promise}
   */
  signup(body) {
    if (!body.email || !body.password) {
      return Promise.reject(AuthError.missedNameLastNamePasswordOrEmail());
    }

    return Promise.resolve({
      email: `${body.email}`,
      password: `${body.password}`,
    });
  },

  /**
   *
   * @param body
   * @returns {Promise}
   */
  login(body) {
    if (!body.userId || !body.password) {
      return Promise.reject(AuthError.missedPasswordOrEmail());
    }

    return Promise.resolve({
      userId: `${body.userId}`,
      password: `${body.password}`,
    });
  },

  /**
   *
   * @param body
   * @returns {Promise}
   */
  forgotPassword({ userId }) {
    if (!userId) {
      return Promise.reject(AuthError.missedUserId());
    }

    return Promise.resolve({ userId });
  },

  /**
   *
   * @param body
   * @returns {Promise}
   */
  changePassword({ oldPassword, password, confirmPassword }, userId) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object().keys({ password: keys.password }, { convert: true });
      const regex = new RegExp(userId, 'i');

      if (!oldPassword) {
        return reject(AuthError.missedOldPassword());
      }
      if (!password || !confirmPassword) {
        return reject(AuthError.missedPassword());
      }

      if (password !== confirmPassword) {
        return reject(AuthError.passwordsMismatch());
      }

      if(regex.test(password)) {
        return reject(AuthError.passwordHasUserId());
      }

      Joi.validate({ password }, schema, (err) => {
        if (err) {
          return reject(new AppError.badRequest(
            'Password must have at least one uppercase, one lowercase letter, one digit and one special character'
          ));
        }

        return resolve({
          password,
          confirmPassword,
        });
      });
    });
  },

  /**
   *
   * @param body
   * @returns {Promise}
   */
  resetPasswordByUser({ password, confirmPassword }, userId) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object().keys({ password: keys.password }, { convert: true });
      const regex = new RegExp(userId, 'i');

      if (!password || !confirmPassword) {
        return reject(AuthError.missedPassword());
      }

      if (password !== confirmPassword) {
        return reject(AuthError.passwordsMismatch());
      }

      if(regex.test(password)) {
        return reject(AuthError.passwordHasUserId());
      }

      Joi.validate({ password }, schema, (err) => {
        if (err) {
          return reject(new AppError.badRequest(
            'Password must have at least one uppercase, one lowercase letter, one digit and one special character'
          ));
        }

        return resolve({
          password,
          confirmPassword,
        });
      });
    });
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  hasToken: (req, res, next) => {
    const schema = Joi.object().keys(
      {
        token: keys.token,
      },
      { convert: true }
    );

    Joi.validate(req.params, schema, (err, value) => {
      if (err) return next(new AppError.badRequest(err.message));
      // req.body = value;
      next();
    });
  },

  /**
   *
   * @param body
   * @returns {Promise}
   */
  onForgotPasswordLink({ userId }) {
    if (!userId) {
      return Promise.reject(AuthError.missedEmail());
    }

    return Promise.resolve({ userId });
  },

};

export default AuthValidate;
