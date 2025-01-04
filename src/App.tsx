import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Admin/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurantes from "./paginas/Admin/Restaurantes/FormularioRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route
        path="/admin/restaurantes"
        element={<AdministracaoRestaurantes />}
      />
      <Route
        path="/admin/restaurantes/novo"
        element={<FormularioRestaurantes />}
      />
      <Route
        path="/admin/restaurantes/:id"
        element={<FormularioRestaurantes />}
      />
    </Routes>
  );
}

export default App;
