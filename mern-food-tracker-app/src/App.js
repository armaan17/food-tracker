import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import FoodList from "./components/food-list.component";
import CreateUser from "./components/create-user.component";
import CreateFood from "./components/create-food.component";

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
        <Route path="/" exact element={<FoodList />} />
        <Route path="/create" element={<CreateFood />} />
        <Route path="/user" element={<CreateUser />} />
        </Routes>
    </Router>
  );
}
export default App;
