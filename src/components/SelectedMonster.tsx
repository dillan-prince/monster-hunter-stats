import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMonsterContext } from "../contexts/MonsterContext";
import AfflictedMaterials from "./AfflictedMaterials";
import AilmentsTable from "./AilmentsTable";
import SelectedMonsterHeader from "./SelectedMonsterHeader";
import WeaknessTable from "./WeaknessTable";

const SelectedMonster = () => {
  const { selectedMonster } = useMonsterContext();

  return (
    <Box sx={{ flex: 3, border: `1px solid ${grey[500]}`, borderRadius: 1, padding: 2 }}>
      {!selectedMonster ? (
        <Typography>Select a monster</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <SelectedMonsterHeader />
          <WeaknessTable />
          <AilmentsTable />
          <AfflictedMaterials />
        </Box>
      )}
    </Box>
  );
};

export default SelectedMonster;
