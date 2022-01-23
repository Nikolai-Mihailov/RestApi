/**
 *
 * @param {*} param - object
 * @returns factory fucntion
 */

export const confirmEmailFactory = ({ prisma, verify }) => {
    /**
     *
     * @param {token} -String
     */
    const confirmEmail = async (token) => {

        try {
            const user = verify(token, process.env.EMAIL_ACCESS_TOKEN_SECRET, ['HS256']);
            const updateRecord = await prisma.users.update({
                where: {
                    user_id: user.userId
                },
                data: {
                    is_verified: 1
                }
            });

            return updateRecord;
        } catch (error) {
            return new Error('Invalid token');
        }
    };

    return confirmEmail;
};
