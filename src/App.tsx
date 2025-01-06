import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Admin/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurantes from "./paginas/Admin/Restaurantes/FormularioRestaurantes";
import LayoutAdmin from "./paginas/Admin/LayoutAdmin";
import AdministracaoPratos from "./paginas/Admin/Pratos/AdministracaoPratos";
import FormularioPratos from "./paginas/Admin/Pratos/FormularioPratos";

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
        <Route
          path="pratos"
          element={<AdministracaoPratos />}
        />
        <Route
          path="pratos/novo"
          element={<FormularioPratos />}
        />
      </Route>
      
    </Routes>
  );
}

export default App;
