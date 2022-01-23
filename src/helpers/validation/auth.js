import Joi from 'joi';

const email = Joi.string().min(8).max(254).message('Email must be at least 8 characters').lowercase().trim().required();
//  TO DO regex check for the password strenght
const password = Joi.string().min(8).max(72).message('"{#label}" must be at least 8 charecters').required();
const firstName = Joi.string().min(3).max(128).message('Firstname must be at least 3 charecters').lowercase().trim().required();
const lastName = Joi.string().min(3).message('Lastname  must be at least 3 charecters').max(128).lowercase().trim().required();
const role = Joi.number().min(1).max(2).message('"{#label}" must be at least 1 charecter').required();

export const signupSchema = Joi.object({
	firstName,
	lastName,
	email,
	password,
	passwordConfirmation: Joi.valid(Joi.ref('password')).required(),
	role
});

export const loginSchema = Joi.object({
	email,
	password
});
