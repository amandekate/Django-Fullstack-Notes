import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method, secondaryButtonText, onSecondaryButtonClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = {
    width: "24rem",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d", 
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <h1>{name}</h1>
      <input
        style={{
          width: "24rem",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        style={{
          width: "24rem",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button style={buttonStyle} type="submit">
        {name}
      </button>
      {secondaryButtonText && (
        <button
          type="button"
          style={secondaryButtonStyle}
          onClick={onSecondaryButtonClick}
        >
          {secondaryButtonText}
        </button>
      )}
    </form>
  );
}

export default Form;
