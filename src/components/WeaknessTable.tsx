import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMonsterContext } from "../contexts/MonsterContext";

type TableRowProps = {
  label: string;
  fire: string | number;
  water: string | number;
  thunder: string | number;
  ice: string | number;
  dragon: string | number;
  index: number;
};

const TableRow = ({ label, fire, water, thunder, ice, dragon, index }: TableRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: index % 2 ? grey[200] : "white",
        "& p": { textAlign: "center" }
      }}
    >
      <Typography variant="h6" sx={{ flex: 2, paddingLeft: 1 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ flex: 1 }}>
        {fire}
      </Typography>
      <Typography variant="body1" sx={{ flex: 1 }}>
        {water}
      </Typography>
      <Typography variant="body1" sx={{ flex: 1 }}>
        {thunder}
      </Typography>
      <Typography variant="body1" sx={{ flex: 1 }}>
        {ice}
      </Typography>
      <Typography variant="body1" sx={{ flex: 1 }}>
        {dragon}
      </Typography>
    </Box>
  );
};

const WeaknessTable = () => {
  const { selectedMonster } = useMonsterContext();

  return selectedMonster ? (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" mb={2}>
        Weaknesses
      </Typography>
      <TableRow label="Body Part" fire="Fire" water="Water" thunder="Thunder" ice="Ice" dragon="Dragon" index={1} />
      {Object.entries(selectedMonster.weaknesses).map(([bodyPart, values], index) => (
        <TableRow key={bodyPart} label={bodyPart} {...values} index={index} />
      ))}
    </Box>
  ) : null;
};

export default WeaknessTable;
