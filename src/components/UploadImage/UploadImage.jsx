import { styled } from '@mui/material/styles';
import s from './UploadImage.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import authOperations from '../../redux/auth/auth-operation';
import defaultAvatar from '../../images/default-user.png';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButton() {
  const user = useSelector(authSelectors.getUser);
  const avatar = useSelector(authSelectors.getAvatar);
  const dispatch = useDispatch();

  const onChangeInput = e => {
    dispatch(authOperations.uploadAvatar(e.target.files[0], user._id));
  };

  return (
    <div className={s.container}>
      <label htmlFor="contained-button-file">
        <Input
          readOnly
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={onChangeInput}
        />

        {avatar ? (
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
