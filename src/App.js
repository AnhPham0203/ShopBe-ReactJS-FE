import ProductList from "./components/ProductList";
import { AppProvider } from "./Context/AppProvider ";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductDetail from "./components/ProductDetail";
import Payment from "./components/Payment";

import Register from "./components/Register";
import Layout from "./components/Layout";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      <Router>
        <AppProvider>
          <div>
            <Routes>
              {/* Các route không yêu cầu Header và Footer */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Các route có Header và Footer */}
              <Route element={<Layout />}>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile" element={<UserProfile />} />
              </Route>
            </Routes>
          </div>
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
