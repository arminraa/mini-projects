import { Link } from "react-router";

export default function Home() {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "6px"
    }}>
      <button style={{
        padding: "1rem"
      }}>
        <Link to="/todos">Todos</Link>
      </button>
      <button style={{
        padding: "1rem"
      }}>
        <Link to="/products">Products</Link>
      </button>
      <button style={{
        padding: "1rem"
      }}>
        <Link to="/comments">Comments</Link>
      </button>
    </div>
  )
}
