import { Box, Button, ButtonGroup, CircularProgress, Typography } from "@mui/material";
import { useCallback } from "react";
import { MonsterData, useMonsterContext } from "../contexts/MonsterContext";

const SelectedMonsterHeader = () => {
  const { selectedMonster, refreshData, isLoading, setIsLoading } = useMonsterContext();

  const updateMonster = useCallback(
    async (monster: MonsterData) => {
      setIsLoading(true);

      await fetch(`http://localhost:3001/monster/${selectedMonster?.id}`, {
        method: "PATCH",
        body: JSON.stringify(monster),
        headers: {
          "Content-Type": "application/json"
        }
      });

      await refreshData();

      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMonster?.id]
  );

  const handleMiniCrownClick = async () => {
    if (!selectedMonster) return;

    await updateMonster({
      ...selectedMonster,
      huntedMini: !selectedMonster.huntedMini
    });
  };

  const handleGoldCrownClick = async () => {
    if (!selectedMonster) return;

    await updateMonster({
      ...selectedMonster,
      huntedGold: !selectedMonster.huntedGold
    });
  };

  const handleAddClick = async () => {
    if (!selectedMonster) return;

    await updateMonster({
      ...selectedMonster,
      countHunted: selectedMonster.countHunted + 1
    });
  };

  const handleSubtractClick = async () => {
    if (!selectedMonster) return;

    await updateMonster({
      ...selectedMonster,
      countHunted: selectedMonster.countHunted - 1
    });
  };

  return !selectedMonster ? null : (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flex: 1, gap: 4, alignItems: "center" }}>
        <Typography variant="h4">{selectedMonster.name}</Typography>
        {isLoading && <CircularProgress size="2.125rem" />}
      </Box>
      <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
        <Button
          onClick={handleMiniCrownClick}
          disabled={isLoading}
          variant="outlined"
          color={selectedMonster.huntedMini ? "success" : "error"}
        >
          <img src={"/images/mini-crown.png"} width={24} alt="mini" />
        </Button>
        <Button
          onClick={handleGoldCrownClick}
          disabled={isLoading}
          variant="outlined"
          color={selectedMonster.huntedGold ? "success" : "error"}
        >
          <img src="/images/gold-crown.png" width={24} alt="gold" />
        </Button>
        <Typography variant="body1">{selectedMonster.countHunted}</Typography>
        <ButtonGroup variant="outlined">
          <Button onClick={handleSubtractClick} disabled={isLoading}>
            -
          </Button>
          <Button onClick={handleAddClick} disabled={isLoading}>
            +
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default SelectedMonsterHeader;
