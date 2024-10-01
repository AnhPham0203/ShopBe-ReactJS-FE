import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { useState } from "react";
import { AppProvider } from "./Context/AppProvider ";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import Payment from "./components/Payment";

function App() {
  return (
    <div>
      <AppProvider>
        <Router>
          <div>
            {/* Header luôn hiển thị */}
            <Header />

            <Routes>
              {/* Route cho trang danh sách sản phẩm */}
              <Route path="/" element={<ProductList />} />

              {/* Route cho trang chi tiết sản phẩm */}
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>

            {/* Footer luôn hiển thị */}
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
