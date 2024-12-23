import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import Templates from "./pages/Templates/Templates";
import AddTemplate from "./pages/Templates/AddTemplate";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/add-template" element={<AddTemplate />} />
      </Routes>
    </MantineProvider>
  );
}
