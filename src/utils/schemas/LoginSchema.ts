import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email!').required('Required field!'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required field!'),
});
export default loginSchema;
