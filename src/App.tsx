import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Admin/Restaurantes/AdminRestaurantes';
import FormRestaurant from './paginas/Admin/Restaurantes/FormRestaurante';
import PaginaBaseAdmin from './paginas/Admin/PaginaBaseAdmin';
import AdminPratos from './paginas/Admin/Pratos/AdminPratos';
import FormPrato from './paginas/Admin/Pratos/FormPrato';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormRestaurant />} />
        <Route path="restaurantes/:id" element={<FormRestaurant />} />
        <Route path="pratos" element={<AdminPratos />} />
        <Route path="pratos/novo" element={<FormPrato />} />
        <Route path="pratos/:id" element={<FormPrato />} />
      </Route>

    </Routes>
  );
}

export default App;
