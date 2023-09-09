import { Box, List, ListItem, Typography } from "@mui/material";
import { useMonsterContext } from "../contexts/MonsterContext";

const AfflictedMaterials = () => {
  const { selectedMonster } = useMonsterContext();

  return !selectedMonster?.afflictedMaterials?.length ? null : (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">Afflicted Materials</Typography>
      <List sx={{ listStyleType: "disc", paddingLeft: 4 }}>
        {selectedMonster.afflictedMaterials.map((material) => (
          <ListItem key={material} sx={{ display: "list-item" }}>
            <Typography variant="body1">{material}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AfflictedMaterials;
