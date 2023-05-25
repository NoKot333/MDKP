import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import { fetchAuth, fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';

export const Settings = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {register, 
    handleSubmit,
    setError, 
    formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
  
    if (!data.payload) {
      alert('Не удалось зарегистрироваться');
    }
  
    if ('token' in data.payload) {
      window.localStorage.setItem('token',data.payload.token);
    }
  };

  if (!isAuth) {
    return <Navigate to ="/" />;
  };

  return (
    <>
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <Button classes={{ root: styles.buttons }} variant="outlined" size="large">
        Загрузить аватар
      </Button>
      <Typography classes={{ root: styles.title }} variant="h5">
        Михаил Иванович
      </Typography>

      <TextField error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'Укажите почту'})}
        className={styles.field} label="E-Mail" fullWidth />

      <TextField error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', {required: 'Укажите пароль'})}
        className={styles.field} label="Пароль" fullWidth />

      <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
        Изменить информацию
      </Button>
      </form>
    </Paper>
    <Grid xs={8} item>
      {[...Array(2)].map(() => (
        <Post
          id={1}
          title="Roast the code #1 | Rock Paper Scissors"
          user={{
            avatarUrl:
              'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
            fullName: 'Михаил Иванович',
          }}
          createdAt={'12 мая 2023 г.'}
          viewsCount={150}
          commentsCount={3}
          tags={['react', 'fun', 'Ява']}
          isEditable
        />
      ))}
    </Grid>
    </>
  );
};
