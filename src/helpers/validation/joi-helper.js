export const validate = async (schema, payload) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    return new Error(error);
  }
};
