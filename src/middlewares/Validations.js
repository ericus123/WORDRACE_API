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

export const scoreValidation = (req, res, next) => {
  const schema = Joi.object({
    level: Joi.number().min(1).max(3).required().messages({
      "any.base": "Level must be a number only",
      "any.empty": "Please fthe level",
      "any.min": "Level must at least be one",
      "any.max": "This is the last level of the game",
      "any.required": "Level is required",
    }),
    scores: Joi.number().min(1).required().messages({
      "any.base": "Score must be a number only",
      "any.empty": "Please fill in the score",
      "any.min": "Score must at least be one",
      "any.required": "Score is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
