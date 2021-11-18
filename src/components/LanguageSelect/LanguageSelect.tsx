import { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Context } from '../LanguageWrapper/LanguageWrapper';

function LanguageSelect() {
  const context = useContext(Context);

  return (
    <Select
      className="multiLang-select"
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={context?.locale}
      // defaultValue={context?.locale ?? ''}
      inputProps={{
        name: 'language-select',
        id: 'uncontrolled-native',
      }}
      onChange={context?.selectLanguage}>
      <MenuItem value="en-US">EN</MenuItem>
      <MenuItem value="ru-RU">RU</MenuItem>
      <MenuItem value="uk-UA">UA</MenuItem>
    </Select>
  );
}

export default LanguageSelect;
