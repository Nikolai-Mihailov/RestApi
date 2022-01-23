/**
 *
 * @param {*} param - object
 * @returns factory fucntion
 */

export const createUserFactory = ({ prisma, bycript, createEmailAccessTokenFunction, SALT, decode }) => {
	/**
	 *
	 * @param {*} param - object
	 * @param {param.firstName} param.firstName - string
	 * @param {param.lastName} param.lastName - string
	 * @param {param.email} param.email - string
	 * @param {param.password} param.password - string
	 *
	 */
	const createUserFactory = async ({ firstName, lastName, email, password, role }) => {

		try {

			const hashedPassword = await bycript.hash(password, +SALT);
			const userExsists = await prisma.users.findFirst({
				where: {
					email
				}
			});

			if (userExsists) {
				return new Error(`User with email: ${userExsists.email} already exists!`);
			}

			const user = await prisma.users.create({
				data: {
					first_name: firstName,
					last_name: lastName,
					email,
					password: hashedPassword,
					role_id: role
				}
			});

			return createEmailAccessTokenFunction({ firstName, lastName, email, role, userId: user.user_id });

		} catch (error) {
			return error.message;
		}
	};

	return createUserFactory;
};


	// const insertRefreshToken = await prisma.refresh_tokens.create({
			// 	data: {
			// 		user_id: user.user_id,
			// 		refresh_token: refreshToken,
			// 		valid_untill: new Date(decodedToken.exp * 1000)
			// 	}
			// });

			// else {
			// 	//  IF something went wrong delete the inserted user
			// 	await prisma.users.delete({
			// 		where: {
			// 			user_id: user.user_id
			// 		}
			// 	});

			// 	return new Error('Something went wrong... please check the createUser service!');
			// }