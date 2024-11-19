import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type MonsterData = {
  id: number;
  name: string;
  countHunted: number;
  huntedMini: boolean;
  huntedGold: boolean;
  weaknesses: {
    [bodyPart: string]: {
      fire: number;
      water: number;
      thunder: number;
      ice: number;
      dragon: number;
    };
  };
  ailments: {
    poison: number;
    stun: number;
    paralysis: number;
    sleep: number;
    blast: number;
  };
  afflictedMaterials: {
    [material: string]: number;
  };
};

export type SortMethod = "ID" | "ALPHABETICAL";

type MonsterContextType = {
  hasLoadedOnce: boolean;
  refreshData: () => Promise<void>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sortMethod: SortMethod;
  setSortMethod: React.Dispatch<React.SetStateAction<SortMethod>>;
  monsters: MonsterData[];
  selectedMonster: MonsterData | undefined;
  setSelectedMonster: React.Dispatch<React.SetStateAction<MonsterData | undefined>>;
};

const MonsterContext = createContext<MonsterContextType>({
  hasLoadedOnce: false,
  refreshData: async () => {},
  searchValue: "",
  setSearchValue: () => {},
  isLoading: false,
  setIsLoading: () => {},
  sortMethod: "ID",
  setSortMethod: () => {},
  monsters: [],
  selectedMonster: undefined,
  setSelectedMonster: () => {}
});

export const MonsterContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [searchValue, setSearchValue] = useState("");
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortMethod, setSortMethod] = useState<SortMethod>("ID");
  const [monsters, setMonsters] = useState<MonsterData[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<MonsterData>();

  const refreshData = async () => {
    setIsLoading(true);

    const response = await fetch("http://localhost:3001/monster");
    const data: MonsterData[] = await response.json();
    setMonsters(data);

    if (selectedMonster) {
      setSelectedMonster(data.find((monster) => monster.id === selectedMonster.id));
    }

    setIsLoading(false);
    setHasLoadedOnce(true);
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MonsterContext.Provider
      value={{
        hasLoadedOnce,
        refreshData,
        searchValue,
        setSearchValue,
        isLoading,
        setIsLoading,
        sortMethod,
        setSortMethod,
        monsters,
        selectedMonster,
        setSelectedMonster
      }}
    >
      {children}
    </MonsterContext.Provider>
  );
};

export const useMonsterContext = () => useContext(MonsterContext);
