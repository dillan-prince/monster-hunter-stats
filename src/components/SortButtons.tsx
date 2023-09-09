import { Button, ButtonGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMonsterContext } from "../contexts/MonsterContext";

const SortButtons = () => {
  const { isLoading, sortMethod, setSortMethod } = useMonsterContext();

  return (
    <ButtonGroup sx={{ display: "flex" }}>
      <Button
        disabled={isLoading}
        sx={{ flex: 1, backgroundColor: sortMethod === "ID" ? grey[300] : "inherit" }}
        onClick={() => setSortMethod("ID")}
      >
        ID
      </Button>
      <Button
        disabled={isLoading}
        sx={{ flex: 1, backgroundColor: sortMethod === "ALPHABETICAL" ? grey[300] : "inherit" }}
        onClick={() => setSortMethod("ALPHABETICAL")}
      >
        Alphabetical
      </Button>
    </ButtonGroup>
  );
};

export default SortButtons;
