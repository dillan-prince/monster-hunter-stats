import { Box, Button } from "@mui/material";
import { green, grey, lightGreen } from "@mui/material/colors";
import { useCallback } from "react";
import { MonsterData, SortMethod, useMonsterContext } from "../contexts/MonsterContext";
import Monster from "./Monster";

const getBackgroundColor = (selectedMonster: MonsterData | undefined, monster: MonsterData) => {
  const isSelected = selectedMonster?.id === monster.id;
  const hasScroll = monster.countHunted >= 10;
  const hasMiniAndGold = monster.huntedMini && monster.huntedGold;

  if (hasScroll) {
    if (hasMiniAndGold) {
      return isSelected ? "#D2AC47" : "#EDC967";
    }

    return isSelected ? green[200] : lightGreen[200];
  }

  return isSelected ? grey[300] : "#ffffff";
};

const sortMethods: Record<SortMethod, (a: MonsterData, b: MonsterData) => number> = {
  ID: (a, b) => a.id - b.id,
  ALPHABETICAL: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
};

const MonsterList = () => {
  const { searchValue, isLoading, sortMethod, monsters, selectedMonster, setSelectedMonster } = useMonsterContext();

  const matchesFilter = useCallback(
    (monster: MonsterData) => {
      if (!searchValue) {
        return true;
      }

      if (monster.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      if (monster.afflictedMaterials.some((material) => material.toLowerCase().includes(searchValue.toLowerCase()))) {
        return true;
      }

      return false;
    },
    [searchValue]
  );

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: "100%", overflowY: "auto", direction: "rtl" }}
    >
      {monsters
        .filter(matchesFilter)
        .sort(sortMethods[sortMethod])
        .map((monster) => (
          <Button
            key={monster.id}
            disabled={isLoading}
            onClick={() => setSelectedMonster(monster)}
            variant="outlined"
            disableRipple
            sx={(theme) => ({
              direction: "ltr",
              borderRadius: 1,
              padding: theme.spacing(1, 0),
              textTransform: "none",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              backgroundColor: getBackgroundColor(selectedMonster, monster),
              color: grey[900]
            })}
          >
            <Monster {...monster} />
          </Button>
        ))}
    </Box>
  );
};

export default MonsterList;
