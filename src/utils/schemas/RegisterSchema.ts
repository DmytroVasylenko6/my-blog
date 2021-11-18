import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'app.yup.validate.name.min')
    .max(20, 'app.yup.validate.name.max')
    .required('app.yup.validate.required'),
  email: Yup.string()
    .email('app.yup.validate.email')
    .required('app.yup.validate.required'),
  password: Yup.string()
    .min(6, 'app.yup.validate.password.min')
    .required('app.yup.validate.required'),
  age: Yup.number()
    .min(5, 'app.yup.validate.age.min')
    .max(120, 'app.yup.validate.age.max')
    .required('app.yup.validate.required'),
});

export default registerSchema;
