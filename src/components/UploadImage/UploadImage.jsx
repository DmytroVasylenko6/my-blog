import { useState } from 'react';
import { styled } from '@mui/material/styles';
import s from './UploadImage.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import authOperations from '../../redux/auth/auth-operation';
import defaultAvatar from '../../images/default-user.png';
import Loader from 'react-loader-spinner';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButton() {
  const [isUpload, setIsUpload] = useState(false);

  const user = useSelector(authSelectors.getUser);
  const avatar = useSelector(authSelectors.getAvatar);
  const dispatch = useDispatch();

  const onChangeInput = async e => {
    setIsUpload(true);
    await dispatch(authOperations.uploadAvatar(e.target.files[0], user._id));
    setIsUpload(false);
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
              <span className={s.text}>Update Avatar</span>
            </div>
          </>
        ) : (
          <>
            <img className={s.avatar} src={defaultAvatar} alt="avatar" />
            <div className={s.buttonUpload}>
              <span className={s.icon}>+</span>
              <span className={s.text}>Upload Avatar</span>
            </div>
          </>
        )}
      </label>
    </div>
  );
}
