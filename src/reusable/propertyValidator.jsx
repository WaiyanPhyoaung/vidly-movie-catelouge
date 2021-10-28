import Joi from "joi";

export function propetyValidator(mainSchema, name, value) {
  const obj = { [name]: value };

  const schema = Joi.object(mainSchema);
  const { error } = schema.validate(obj);
  return error ? error.details[0].message : "";
}
