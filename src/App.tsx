import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Admin/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurantes from "./paginas/Admin/Restaurantes/FormularioRestaurantes";
import LayoutAdmin from "./paginas/Admin/LayoutAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<LayoutAdmin/>}>
        <Route
          path="restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route
          path="restaurantes/novo"
          element={<FormularioRestaurantes />}
        />
        <Route
          path="restaurantes/:id"
          element={<FormularioRestaurantes />}
        />
      </Route>
      
    </Routes>
  );
}

export default App;
