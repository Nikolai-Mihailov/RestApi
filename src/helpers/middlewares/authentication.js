import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const isAuthenticated = (req, res, next) => {
	const authorization = req.headers['authorization'];

	try {
		if (!authorization) {
			throw new Error('Not authenticated');
		}

		const token = authorization.split(' ')[1];
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET, ['HS256']);

		req.user = payload;
	} catch (error) {
		return res.status(500).json({
			result: false,
			data: [],
			message: 'You are not authenticated'
		});
	}

	return next();
};

export const isAuthorizated = (req, res, next) => {
	const user = req.user;

	// Admin access only
	if (user.role !== 1) {
		return res.status(401).send('Access Denied');
	}
	return next();
};
