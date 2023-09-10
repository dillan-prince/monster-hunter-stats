import { Button, ButtonGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PropsWithChildren } from "react";
import { SortMethod, useMonsterContext } from "../contexts/MonsterContext";

type SortButtonProps = {
  sortMethod: SortMethod;
};

const SortButton = ({ sortMethod, children }: PropsWithChildren<SortButtonProps>) => {
  const { isLoading, sortMethod: selectedSortMethod, setSortMethod } = useMonsterContext();

  return (
    <Button
      disabled={isLoading}
      sx={{ flex: 1, backgroundColor: sortMethod === selectedSortMethod ? grey[300] : "inherit" }}
      onClick={() => setSortMethod(sortMethod)}
    >
      {children}
    </Button>
  );
};

const SortButtons = () => {
  return (
    <ButtonGroup sx={{ display: "flex" }}>
      <SortButton sortMethod="ID">ID</SortButton>
      <SortButton sortMethod="ALPHABETICAL">Alphabetical</SortButton>
    </ButtonGroup>
  );
};

export default SortButtons;
