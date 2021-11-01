import { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Context } from '../LanguageWrapper/LanguageWrapper';

function LanguageSelect() {
  const context = useContext(Context);

  let lang: any;
  if (context?.locale === 'en') {
    lang = 'EN';
  } else {
    if (context?.locale === 'ru') {
      lang = 'RU';
    } else {
      lang = 'UA';
    }
  }

  return (
    <Select
      className="multiLang-select"
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={context?.locale}
      defaultValue={context?.locale}
      inputProps={{
        name: lang,
        id: 'uncontrolled-native',
      }}
      onChange={context?.selectLanguage}>
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="ru">RU</MenuItem>
      <MenuItem value="uk-UA">UA</MenuItem>
    </Select>
  );
}

export default LanguageSelect;
