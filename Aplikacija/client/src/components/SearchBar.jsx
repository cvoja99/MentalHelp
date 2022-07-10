import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

export const SearchBar = ({setSearchQuery,searchQuery,onSearch, radioValue, setRadioValue}) => (
    <form>
        <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={radioValue}
  >
    <FormControlLabel value="Title" control={<Radio  checked={radioValue === 'Title'}     onChange={(e) => setRadioValue(e.target.value)}
/>} label="Title" />
    <FormControlLabel value="Username" control={<Radio checked={radioValue === 'Username'}     onChange={(e) => setRadioValue(e.target.value)}
/>} label="Username" />
  </RadioGroup>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton onClick={() => onSearch(searchQuery)} aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );