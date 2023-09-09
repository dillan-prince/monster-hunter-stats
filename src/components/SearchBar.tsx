import { Clear } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useMonsterContext } from "../contexts/MonsterContext";

const SearchBar = () => {
  const { searchValue, setSearchValue } = useMonsterContext();

  return (
    <TextField
      type="search"
      placeholder="Monster name"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchValue ? (
          <IconButton onClick={() => setSearchValue("")}>
            <Clear />
          </IconButton>
        ) : undefined
      }}
    />
  );
};

export default SearchBar;
