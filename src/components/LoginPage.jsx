import React, { useState } from "react";
import Logo from "./Logo";

const LoginPage = ({ onLogin, onGoToSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        onLogin && onLogin(data.user);
      } else {
        setError(data.error || "Erro ao autenticar");
      }
    } catch {
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div
      className="relative w-full h-screen min-h-screen flex items-center justify-end"
      style={{
        background: "#D5F7D2",
        overflow: "hidden",
      }}
    >
      {/* Imagem de fundo com efeito visual */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `url('/planta.webp') center center / cover no-repeat`,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {/* Efeito visual da metade para a direita */}
        <div
          className="absolute right-0 top-0 h-full"
          style={{
            width: "60vw",
            minWidth: 320,
            background: "linear-gradient(to left, rgba(34,139,34,0.85) 0%, rgba(34,139,34,0.6) 60%, rgba(34,139,34,0.0) 100%)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            zIndex: 1,
          }}
        />
        {/* Escurece levemente toda a imagem para contraste */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(0,0,0,0.10)",
            zIndex: 1,
          }}
        />
      </div>
      {/* Formulário de login alinhado à direita */}
      <div
        className="relative z-10 flex items-center justify-center w-full max-w-md h-full"
        style={{
          minHeight: "100vh",
          marginRight: 0,
        }}
      >
        <form
          className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm space-y-6 mx-2 border"
          style={{ borderColor: "#BDBDBD" }}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center gap-4">
            <Logo size="large" />
            <h2 className="text-2xl font-bold" style={{ color: "#2E7D32" }}>Login</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-[#212121] bg-[#F0F0F0]"
            style={{ borderColor: "#BDBDBD" }}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-[#212121] bg-[#F0F0F0]"
            style={{ borderColor: "#BDBDBD" }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2 accent-[#4CAF50]" />
            <label htmlFor="remember" className="text-sm" style={{ color: "#212121" }}>Remember me</label>
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <button
            className="w-full py-2 rounded hover:brightness-95 font-semibold"
            style={{ backgroundColor: "#4CAF50", color: "#fff" }}
            type="submit"
          >
            Sign In
          </button>
          <div className="text-center text-sm mt-2" style={{ color: "#212121" }}>
            Don't have an account?{" "}
            <button
              type="button"
              className="underline"
              style={{ color: "#2E7D32" }}
              onClick={onGoToSignUp}
            >
              Sign up here!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
