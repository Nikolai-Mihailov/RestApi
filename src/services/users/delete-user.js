/**
 *
 * @param {*} param - object
 * @returns factory fucntion
 */

export const deleteUserFactory = ({ prisma, logger }) => {

    return async ({ email }) => {

        try {
            logger.info(`Deleting user whit email ${email}`)
            let deletedUser = await prisma.users.delete({
                where: {
                    email
                }
            });

            logger.info(`User with id:${deletedUser.user_id} was deleted`)
            return;

        } catch (error) {

            return error.message;
        }
    };


};
