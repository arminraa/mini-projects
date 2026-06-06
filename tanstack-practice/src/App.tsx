import { Route, Routes } from "react-router";
import Comments from "./components/Comments";
import Todos from "./components/Todos";
import Home from "./components/Home";
import Products from "./components/Products";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="todos/*" element={<Todos />} />
      <Route path="comments/*" element={<Comments />} />
      <Route path="products/*" element={<Products />} />
    </Routes>
  );
}
