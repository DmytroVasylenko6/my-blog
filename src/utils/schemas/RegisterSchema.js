import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 3 characters')
    .required('Required field!'),
  email: Yup.string().email('Invalid Email!').required('Required field!'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required field!'),
  age: Yup.number('Invalid age!')
    .min(6)
    .max(120)
    .required('Required field!')
    .positive()
    .integer(),
});

export default registerSchema;
