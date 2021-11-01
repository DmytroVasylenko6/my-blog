import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('app.yup.validate.email')
    .required('app.yup.validate.required'),
  password: Yup.string()
    .min(6, 'app.yup.validate.password.min')
    .required('app.yup.validate.required'),
});

export default loginSchema;
