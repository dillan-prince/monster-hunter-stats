import { Button, ButtonGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SortMethod, useMonsterContext } from "../contexts/MonsterContext";

type SortButtonProps = {
  sortMethod: SortMethod;
};

const SortButton = ({ sortMethod }: SortButtonProps) => {
  const { isLoading, sortMethod: selectedSortMethod, setSortMethod } = useMonsterContext();

  return (
    <Button
      disabled={isLoading}
      sx={{ flex: 1, backgroundColor: sortMethod === selectedSortMethod ? grey[300] : "inherit" }}
      onClick={() => setSortMethod(sortMethod)}
    >
      {sortMethod}
    </Button>
  );
};

const SortButtons = () => {
  return (
    <ButtonGroup sx={{ display: "flex" }}>
      <SortButton sortMethod="ID" />
      <SortButton sortMethod="ALPHABETICAL" />
    </ButtonGroup>
  );
};

export default SortButtons;
