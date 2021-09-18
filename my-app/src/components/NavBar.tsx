import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import { Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  Nav,
  RedSwitch,
} from "../styles/NavBarStyle";

interface NavBarProps {
  movie: boolean;
  handleSwitch: Function;
  handleSearch: Function;
  searchValue: string;
}

const NavBar = (props: NavBarProps) => {
  const { movie, handleSwitch, handleSearch, searchValue } = props;
  const pageTitle = "Movies app";
  const [checked, setChecked] = useState(!movie);

  const handleChange = (e: any) => {
    setChecked(e.target.checked);
    handleSwitch(e.target.checked);
  };

  const handleSearchChange = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    } else {
      handleSearch(e.target.value);
    }
  };

  return (
    <Nav>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "contents", sm: "block" } }}
          color="red"
          fontWeight={700}
        >
          {pageTitle.toUpperCase()}
        </Typography>
        <MovieIcon />
        <RedSwitch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          color="default"
        />
        <TvIcon />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
            onKeyPress={handleSearchChange}
            value={searchValue}
          />
        </Search>
      </Toolbar>
    </Nav>
  );
};

export default NavBar;
