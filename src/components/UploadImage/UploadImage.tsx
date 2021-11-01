import { useState } from 'react';
import { styled } from '@mui/material/styles';
import s from './UploadImage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import authSelectors from '../../redux/auth/auth-selectors';
import authOperations from '../../redux/auth/auth-operation';
import defaultAvatar from '../../images/default-user.png';
import Loader from 'react-loader-spinner';
import { FormattedMessage } from 'react-intl';

const Input = styled('input')({
  display: 'none',
});

interface Event<T = EventTarget> {
  target: T;
}

export default function UploadButton() {
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const user = useAppSelector(authSelectors.getUser);
  const avatar = useAppSelector(authSelectors.getAvatar);
  const dispatch = useAppDispatch();

  const onChangeInput = async (e: Event<HTMLInputElement>) => {
    if (user._id) {
      let files: any = e.target.files;
      setIsUpload(true);
      await dispatch(authOperations.uploadAvatar(files[0], user._id));
      setIsUpload(false);
    }
  };

  return (
    <div className={s.container}>
      <label htmlFor="contained-button-file">
        <Input
          readOnly
          accept="image/*"
          id="contained-button-file"
          multiple
          type={isUpload ? 'hidden' : 'file'}
          onChange={onChangeInput}
        />
        {isUpload ? (
          <Loader type="ThreeDots" color="#fc842d" height={80} width={80} />
        ) : avatar ? (
          <>
            <img className={s.avatar} src={avatar} alt="avatar" />
            <div className={s.buttonUpdate}>
              <span className={s.icon}>+</span>
              <span className={s.text}>
                <FormattedMessage
                  id="app.avatar.update"
                  defaultMessage="Update Avatar"
                />
              </span>
            </div>
          </>
        ) : (
          <>
            <img className={s.avatar} src={defaultAvatar} alt="avatar" />
            <div className={s.buttonUpload}>
              <span className={s.icon}>+</span>
              <span className={s.text}>
                <FormattedMessage
                  id="app.avatar.upload"
                  defaultMessage="Upload Avatar"
                />
              </span>
            </div>
          </>
        )}
      </label>
    </div>
  );
}
