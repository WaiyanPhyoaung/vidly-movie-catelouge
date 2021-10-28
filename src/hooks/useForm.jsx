import { useEffect, useState } from "react";

const useForm = (
  earlyData,
  schema,
  propertyValidator,
  formValidator,
  callback
) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (earlyData) setValues(earlyData);
  }, [earlyData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = formValidator(schema, values);
    console.log(errors);
    if (Object.keys(errors).length) return setErrors(errors);
    callback();
    setValues({});
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((values) => ({
      ...values,
      [name]: value,
    })); // {username : 'mg mg' , password : 'domgmg'}

    const propertySchema = {
      [name]: schema[name],
    };

    const errorMessage = propertyValidator(propertySchema, name, value);

    const error = { ...errors };
    if (errorMessage) {
      error[name] = errorMessage; // {username : 'is required'}
    } else delete error[name];
    setErrors(error);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    setErrors,
  };
};

export default useForm;
