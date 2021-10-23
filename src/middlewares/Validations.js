import Joi from "@hapi/joi";

export const userValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .trim()
      .min(3)
      .max(10)
      .regex(/[a-zA-Z0-9]/)
      .required()
      .messages({
        "string.base": "Username must contain letters only ",
        "string.empty": "Please fill in your username",
        "string.min": "Username must be at least {#limit} characters long",
        "string.max": "Username must be below {#limit} characters long",
        "any.required": "Username is required",
      }),
    password: Joi.string().trim().min(8).required().messages({
      "string.base": "Password must be string",
      "string.empty": "Please fill in your password",
      "string.min": "Password must be at least {#limit} characters long",
      "any.required": "Password is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
