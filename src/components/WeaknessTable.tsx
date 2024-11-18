import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MonsterData, useMonsterContext } from "../contexts/MonsterContext";

type TableRowProps = {
  label: string;
  fire: string | number | JSX.Element;
  water: string | number | JSX.Element;
  thunder: string | number | JSX.Element;
  ice: string | number | JSX.Element;
  dragon: string | number | JSX.Element;
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

type Element = keyof MonsterData["weaknesses"][string];

const WeaknessTable = () => {
  const { selectedMonster } = useMonsterContext();

  if (!selectedMonster) {
    return null;
  }

  const numBodyParts = Object.keys(selectedMonster.weaknesses).length;
  const weaknessSums = Object.values(selectedMonster.weaknesses).reduce(
    (elements, weaknesses) => ({
      fire: (elements.fire ?? 0) + weaknesses.fire,
      water: (elements.water ?? 0) + weaknesses.water,
      thunder: (elements.thunder ?? 0) + weaknesses.thunder,
      ice: (elements.ice ?? 0) + weaknesses.ice,
      dragon: (elements.dragon ?? 0) + weaknesses.dragon
    }),
    {} as Record<Element, number>
  );

  const averageWeakness: Record<Element, number> =
    numBodyParts === 0
      ? {
          fire: 0,
          water: 0,
          thunder: 0,
          ice: 0,
          dragon: 0
        }
      : {
          fire: weaknessSums.fire / numBodyParts,
          water: weaknessSums.water / numBodyParts,
          thunder: weaknessSums.thunder / numBodyParts,
          ice: weaknessSums.ice / numBodyParts,
          dragon: weaknessSums.dragon / numBodyParts
        };

  const { best: bestWeaknesses } = Object.entries(averageWeakness).reduce(
    (acc, [element, value]) =>
      value > acc.highestWeakness
        ? { highestWeakness: value, best: [element as Element] }
        : value === acc.highestWeakness
        ? { highestWeakness: value, best: [...acc.best, element as Element] }
        : acc,
    {
      highestWeakness: 0,
      best: []
    } as {
      highestWeakness: number;
      best: Element[];
    }
  );

  const elementLabels: Record<Element, string> = {
    fire: bestWeaknesses.includes("fire") ? "Fire*" : "Fire",
    water: bestWeaknesses.includes("water") ? "Water*" : "Water",
    thunder: bestWeaknesses.includes("thunder") ? "Thunder*" : "Thunder",
    ice: bestWeaknesses.includes("ice") ? "Ice*" : "Ice",
    dragon: bestWeaknesses.includes("dragon") ? "Dragon*" : "Dragon"
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" mb={2}>
        Weaknesses
      </Typography>
      <TableRow label="Body Part" {...elementLabels} index={1} />
      {Object.entries(selectedMonster.weaknesses).map(([bodyPart, values], index) => (
        <TableRow key={bodyPart} label={bodyPart} {...values} index={index} />
      ))}
    </Box>
  );
};

export default WeaknessTable;
