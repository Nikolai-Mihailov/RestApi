import * as UsersService from "../services/users/index.js";
import {
	signupSchema,
	loginSchema,
	validate,
} from "../helpers/validation/index.js";
import {
	createAccessToken,
	createRefreshToken
} from "../helpers/auth/index.js";
import logger from "../helpers/config/logger.js";
import nodemailer from 'nodemailer';


const singnUp = async (req, res) => {

	try {

		const validateSchema = await validate(signupSchema, req.body);

		if (validateSchema instanceof Error) {
			return res.status(400).json({
				result: false,
				data: [],
				message: validateSchema.message,
			});
		}

		const { firstName, lastName, email, password, role } = req.body;
		const emailAccessToken = await UsersService.createUser({
			firstName,
			lastName,
			email,
			password,
			role,
		});

		if (emailAccessToken instanceof Error) {
			return res.status(401).json({
				result: false,
				message: emailAccessToken.message
			});
		}

		const url = `http://${process.env.DOMAIN}:${process.env.SERVER_PORT}/api/user/confirm-email/${emailAccessToken}`;
		const m = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: 'nikolay.nvalue@gmail.com',
				pass: 'NeveR256325'
			}
		});

		try {

			logger.info(`Sending verification email to: ${firstName}, ${lastName}, ${email}`);

			await m.sendMail({
				from: `"${process.env.EMAIL_NAME}" ${process.env.EMAIL_USER}`,
				to: email,
				subject: 'Email verification',
				html: `Please confirm your email by clicking on the link: <a href=${url}>${url}</a>`
			});

			return res.status(200).json({
				result: true,
				message: 'Email was sent successfully. Please check your email and verify your email.'
			});

		} catch (error) {
			logger.error(error.message);
			await UsersService.delateUser({ firstName, lastName, email, password, role })
			return res.status(200).json({
				result: false,
				message: 'Failed to send the email',
			});
		}


	} catch (error) {
		return res.status(401).json({
			result: false,
			message: error.message,
		});
	}
};

const logIn = async (req, res) => {

	const validateLoginSchema = await validate(loginSchema, req.body);

	if (validateLoginSchema instanceof Error) {
		return res.status(400).json({
			result: false,
			accessToken: "",
			message: validateLoginSchema.message,
		});
	}

	const { email, password } = req.body;
	const result = await UsersService.loginUser({ email, password });

	if (result instanceof Error) {
		return res.status(401).json({
			result: false,
			accessToken: "",
			message: result.message,
		});
	}

	res.cookie("jwt", result.refreshToken, { httpOnly: true });

	return res.status(200).json({
		result: true,
		accessToken: result.accessToken,
	});
};

const logOut = async (req, res) => {
	try {
		// TO DO
	} catch (error) {
		logger.error(error);
	}
};

const refreshToken = async (req, res) => {
	const token = req.cookies.jwt;

	if (!token) {
		res.status(404).json({ result: false, accessToken: "" });
	}

	try {
		const user = UsersService.createRefreshToken(token);

		if (user instanceof Error) {
			return res.status(404).json({ result: false, accessToken: "" });
		}

		const accessToken = createAccessToken(user);
		res.cookie("jwt", createRefreshToken(user), { httpOnly: true });

		res.status(404).json({ result: true, accessToken });
	} catch (error) {
		logger.error(error);
		res.status(404).json({ result: false, accessToken: "" });
	}
};

const confirmEmail = async (req, res) => {

	const token = req.params.token;

	try {

		const result = await UsersService.confirmEmail(token);

		if (result.is_verified) {
			return res.status(200).json({
				result: true,
				message: 'Verification successful'
			})
		} else {
			return res.status(200).json({
				result: false,
				message: result.message
			})
		}

	} catch (error) {

		logger.error(error.message || error);

		res.status(404).json({
			result: false,
			message: 'Confirmation error...'
		})

	}







}

export { singnUp, logIn, logOut, refreshToken, confirmEmail };
