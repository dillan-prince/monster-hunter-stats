import { Box, Typography } from "@mui/material";
import { MonsterData } from "../contexts/MonsterContext";

type MonsterProps = {} & MonsterData;

const Monster = ({ name, huntedMini, huntedGold }: MonsterProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, justifyContent: "center", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flex: 1,
          alignItems: "center"
        }}
      >
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {huntedMini && <img src={`/images/mini-crown.png`} width={24} alt="mini" />}
        </Box>
        <Box sx={{ flex: 1 }}>
          <img height={60} src={`/images/${name.replaceAll(" ", "-").toLowerCase()}.png`} alt={name} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {huntedGold && <img src={`/images/gold-crown.png`} width={24} alt="gold" />}
        </Box>
      </Box>
      <Typography>{name}</Typography>
    </Box>
  );
};

export default Monster;
