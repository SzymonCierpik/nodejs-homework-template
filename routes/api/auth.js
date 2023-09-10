const express = require('express');

const { validation, ctrlWrapper, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

router.get('/verify/:verificationToken', ctrlWrapper(email.verifyEmail));

router.post('/verify', validation(schemas.verifyEmailSchema), ctrlWrapper(email.resendVerifyEmail));

module.exports = router;

module.exports = router;