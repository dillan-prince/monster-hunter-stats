import { Box, Typography } from "@mui/material";
import { deepOrange, deepPurple, grey, lightBlue, yellow } from "@mui/material/colors";
import { MonsterData, useMonsterContext } from "../contexts/MonsterContext";

const AILMENTS: Record<keyof MonsterData["ailments"], { name: string; color: string }> = {
  poison: {
    name: "Poison",
    color: deepPurple[400]
  },
  stun: {
    name: "Stun",
    color: yellow[200]
  },
  paralysis: {
    name: "Paralysis",
    color: yellow[600]
  },
  sleep: {
    name: "Sleep",
    color: lightBlue[200]
  },
  blast: {
    name: "Blast",
    color: deepOrange[300]
  }
};

type AilmentProps = {
  name: string;
  count: number;
  color: string;
  index: number;
};

const Ailment = ({ name, count, color, index }: AilmentProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", backgroundColor: index % 2 === 0 ? grey[200] : "white" }}>
      <Typography variant="h6" sx={{ flex: 1, paddingLeft: 1 }}>
        {name}
      </Typography>
      <Box sx={{ flex: 4, display: "flex", gap: 1 }}>
        {Array.from(Array(count).keys()).map((index) => (
          <Box
            key={`${name}-${index}`}
            sx={{ height: "1.5rem", width: "7rem", borderRadius: 1, backgroundColor: color }}
          />
        ))}
      </Box>
    </Box>
  );
};

const AilmentsTable = () => {
  const { selectedMonster } = useMonsterContext();

  return selectedMonster ? (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" mb={2}>
        Ailments
      </Typography>
      {Object.entries(selectedMonster.ailments).map(([key, count], index) => (
        <Ailment
          key={key}
          count={count}
          index={index}
          name={AILMENTS[key as keyof MonsterData["ailments"]].name}
          color={AILMENTS[key as keyof MonsterData["ailments"]].color}
        />
      ))}
    </Box>
  ) : null;
};

export default AilmentsTable;
