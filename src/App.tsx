import { Box, Container, CssBaseline, LinearProgress, ThemeProvider, Typography, createTheme } from "@mui/material";
import MonsterList from "./components/MonsterList";
import SearchBar from "./components/SearchBar";
import SelectedMonster from "./components/SelectedMonster";
import SortButtons from "./components/SortButtons";
import { MonsterContextProvider, useMonsterContext } from "./contexts/MonsterContext";

const theme = createTheme({
  palette: {
    mode: "light"
  }
});

const Content = () => {
  const { hasLoadedOnce } = useMonsterContext();

  return !hasLoadedOnce ? (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography>Fetching monster data...</Typography>
      <LinearProgress sx={{ width: "20%", height: "0.5rem", borderRadius: 1 }} />
    </Box>
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <SearchBar />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        <Box sx={{ flex: 1, maxHeight: "60vh", display: "flex", flexDirection: "column", gap: 1 }}>
          <SortButtons />
          <MonsterList />
        </Box>
        <SelectedMonster />
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MonsterContextProvider>
        <Container sx={{ paddingY: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
          <Content />
        </Container>
      </MonsterContextProvider>
    </ThemeProvider>
  );
};

export default App;
