/**
 *
 * @param {*} param - object
 * @returns factory fucntion
 */

export const createRefreshTokenFactory = ({ prisma, verify }) => {
	/**
	 *
	 * @param {token} -String
	 */
	const createRefreshToken = async (token) => {
		//
		try {
			const user = verify(token, process.env.REFRESH_TOKEN_SECRET, ['HS256']);
			const userExsists = await prisma.users.findFirst({
				where: {
					user_id: user.userId
				}
			});

			if (!userExsists) {
				return new Error('There is no such user');
			}

			return {
				userid: userExsists.userId
			};
		} catch (error) {
			return error.message;
		}
	};

	return createRefreshToken;
};
