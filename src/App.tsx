import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./components/pages/HomePage";
import { MenuPage } from "./components/pages/MenuPage";
import { OrdersPage } from "./components/pages/OrdersPage";
import { CartProvider } from "./components/layout/CartContext";

export default function App() {
  return (
    <CartProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
    </Routes>
    </CartProvider>
  );
}