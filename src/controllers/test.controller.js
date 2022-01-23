import logger from '../helpers/config/logger.js';

const adminTest = async (req, res) => {
	logger.info('adminTest method');
	res.status(200).json({
		result: true,
		data: [],
		message: 'Collecting admin data is successful'
	});
};

const userTest = async (req, res) => {
	logger.info('userTest method');
	res.status(200).json({
		result: true,
		data: [],
		message: 'Collecting user data is successful'
	});
};

export { adminTest, userTest };
