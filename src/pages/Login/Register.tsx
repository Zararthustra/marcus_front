import { Input } from 'antd';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@components/index';
import { tickets, logologin } from '@assets/index';
import { useMutationRegister } from '@queries/index';

import './Login.scss';

const Register = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError } = useMutationRegister();

  const onSubmitHandler = async (values: {
    username: string;
    password: string;
  }) => {
    mutate({ password: values.password, username: values.username });
  };

  const { errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: onSubmitHandler,
    validationSchema: object({
      username: string().required('Compte requis'),
      password: string().required('Mot de passe requis')
    })
  });

  return (
    <div className="login flex justify-center align-center">
      <main className="w-50 flex-col justify-center align-center gap-5">
        <img
          src={logologin}
          onClick={() => navigate('/')}
          alt="Logo Marcus"
          className="login__logo"
        />

        <form className="form" onSubmit={handleSubmit}>
          {/* Compte */}
          <div className="form__field">
            <label className="form__label" htmlFor="username">
              Compte
            </label>
            <Input
              id="username"
              autoComplete="username"
              status={touched.username && errors.username ? 'error' : ''}
              {...getFieldProps('username')}
            />
            {touched.username && errors.username && (
              <p className="form__error">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="form__field">
            <label className="form__label" htmlFor="password">
              Mot de passe
            </label>
            <Input.Password
              id="password"
              autoComplete="current-password"
              status={touched.password && errors.password ? 'error' : ''}
              {...getFieldProps('password')}
            />
            {touched.password && errors.password && (
              <p className="form__error">{errors.password}</p>
            )}
          </div>

          <Button
            primary
            type="submit"
            disabled={!!errors.username || !!errors.password}
            loading={isLoading}
            className="my-3 w-100 px-0">
            Créer mon compte
          </Button>

          <div className="login__no-account flex-col align-center my-1">
            <p>Déjà un compte ?</p>
            <Link to={'/login'}>Se connecter</Link>
          </div>
        </form>
        <div className="login__version">Version: {APP_VERSION}</div>
      </main>

      <img src={tickets} alt="Sièges de cinéma" className="login__img w-50" />
    </div>
  );
};

export default Register;
