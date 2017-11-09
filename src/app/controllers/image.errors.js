import AppError from '../../libs/app-error/index';

/**
 * @apiDefine AuthErrors
 *
 * @apiError (Error code) 102 Email already used
 * @apiError (Error code) 103 Password mismatch
 * @apiError (Error code) 104 Password or email is not set
 * @apiError (Error code) 105 Invalid Authorization Header
 * @apiError (Error code) 106 Invalid token
 * @apiError (Error code) 107 Token Expired
 * @apiError (Error code) 107 Required invite code
 *
 */

const AuthErrors = {
  userExist() {
    return AppError.badRequest('Email already used', { code: 102 });
  },
  invalidCredentials() {
    return AppError.badRequest('Invalid e-mail or password!', { code: 103 });
  },
  passwordsMismatch() {
    return AppError.badRequest('Passwords do not match', { code: 103 });
  },
  missedNameLastNamePasswordOrEmail() {
    return AppError.badRequest('Name, Last Name, Password or Email is not set', { code: 104 });
  },
  missedEmail() {
    return AppError.badRequest('Email is not set', { code: 104 });
  },
  missedUserId() {
    return AppError.badRequest('User Id is not set', { code: 104 });
  },
  missedOldPassword() {
    return AppError.badRequest('Old Password is not set', { code: 104 });
  },
  missedPassword() {
    return AppError.badRequest('Password is not set', { code: 104 });
  },
  missedPasswordOrEmail() {
    return AppError.badRequest('Email or Password is not set', { code: 104 });
  },
  invalidAuthorizationHeader() {
    return AppError.badRequest('Invalid Authorization Header', { code: 105 });
  },

  invalidToken() {
    return AppError.unauthorized('Invalid token', { code: 106 });
  },

  expired() {
    return AppError.unauthorized('Token Expired', { code: 107 });
  },

  requiredInviteCode() {
    return AppError.badRequest('Required invite code', { code: 108 });
  },
  passwordHasUserId() {
    return AppError.badRequest('New Password should not contain User Id', { code: 109 });
  },

  emailNotConfirmed: () => AppError.forbidden('Please confirm your email address by clicking a link sent to your email'),
};

export default AuthErrors;
