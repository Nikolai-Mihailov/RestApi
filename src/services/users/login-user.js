/**
 *
 * @param {*} param - object
 * @returns factory fucntion
 */

export const loginUserFactory = ({ prisma, bycript, createAccessTokenFunction, createRefreshTokenFunction }) => {
	/**
	 *
	 * @param {*} param - object
	 * @param {param.firstName} param.firstName - string
	 * @param {param.lastName} param.lastName - string
	 * @param {param.email} param.email - string
	 * @param {param.password} param.password - string
	 *
	 */
	const loginUser = async ({ email, password }) => {
		//
		try {
			let matchingPassword = null;
			const user = await prisma.users.findFirst({
				where: {
					email
				}
			});

			if (user) {
				matchingPassword = await bycript.compare(password, user.password);
			}

			if (!user || !matchingPassword) {
				return new Error(`Incorrect email or password`);
			}

			const accessToken = createAccessTokenFunction(user);
			const refreshToken = createRefreshTokenFunction(user);

			return {
				accessToken,
				refreshToken
			};
		} catch (error) {
			return error.message;
		}
	};

	return loginUser;
};
