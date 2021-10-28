import Joi from "joi";

export function formValidator(mainSchema, values) {
  let errors = {};
  const schema = Joi.object(mainSchema).options({ abortEarly: false });
  const { error } = schema.validate(values);

  if (error) error.details.map((item) => (errors[item.path[0]] = item.message));

  return errors;
}
