import AboutUs from "./pages/static/AboutUs";
import CreateUser from "./pages/user/CreateUser";
import EditUser from "./pages/user/EditUser";
import RemoveUser from "./pages/user/RemoveUser";
import RetrieveUser from "./pages/user/RetrieveUser";
import UsersList from "./pages/user/UsersList";
import CreateProduct from "./pages/product/CreateProduct";
import EditProduct from "./pages/product/EditProduct";
import RemoveProduct from "./pages/product/RemoveProduct";
import RetrieveProduct from "./pages/product/RetrieveProduct";
import ProductsList from "./pages/product/ProductsList";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<UsersList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:userId" element={<EditUser />} />
          <Route path="/remove/:userId" element={<RemoveUser />} />
          <Route path="/users/:userId" element={<RetrieveUser />} />
          
          {/* Product routes */}
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:productId" element={<EditProduct />} />
          <Route path="/products/remove/:productId" element={<RemoveProduct />} />
          <Route path="/products/:productId" element={<RetrieveProduct />} />
          
          {/* Static pages */}
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
