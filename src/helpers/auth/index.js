import pkg from 'jsonwebtoken';
const { sign } = pkg;

export const createAccessToken = ({ first_name, last_name, email, role_id }) => {
	return sign({ firstName: first_name, lastName: last_name, email, role: role_id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
		algorithm: 'HS256'
	});
};

export const createEmailAccessToken = ({ first_name, last_name, email, role_id, userId: user_id }) => {
	return sign({ firstName: first_name, lastName: last_name, email, role: role_id, userId: user_id }, process.env.EMAIL_ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
		algorithm: 'HS256'
	});
};

export const createRefreshToken = ({ first_name, last_name, email, role_id }) => {
	return sign({ firstName: first_name, lastName: last_name, email, role: role_id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '5d',
		algorithm: 'HS256'
	});
};
