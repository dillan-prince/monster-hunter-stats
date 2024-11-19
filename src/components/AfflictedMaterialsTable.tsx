import { Box, Typography } from "@mui/material";
import { useMonsterContext } from "../contexts/MonsterContext";
import { grey } from "@mui/material/colors";

type TableRowProps = {
  label: string;
  value: string | number;
  index: number;
};

const TableRow = ({ label, value, index }: TableRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: index % 2 ? grey[200] : "white"
      }}
    >
      <Typography variant="h6" sx={{ flex: 1, paddingLeft: 1 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ flex: 2 }}>
        {value}
      </Typography>
    </Box>
  );
};

const AfflictedMaterialsTable = () => {
  const { selectedMonster } = useMonsterContext();

  if (!selectedMonster || Object.keys(selectedMonster.afflictedMaterials).length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" mb={2}>
        Afflicted Materials
      </Typography>
      <TableRow label="Material" value="Investigation Level" index={1} />
      {Object.entries(selectedMonster.afflictedMaterials).map(([afflictedMaterial, investigationLevel], index) => (
        <TableRow key={afflictedMaterial} label={afflictedMaterial} value={investigationLevel} index={index} />
      ))}
    </Box>
  );
};

export default AfflictedMaterialsTable;
