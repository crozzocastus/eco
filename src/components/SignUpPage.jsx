import React, { useState } from "react";
import Logo from "./Logo";

const SignUpPage = ({ onSignUp, onGoToLogin }) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        setSuccess(true);
        onSignUp && onSignUp(data.user); // <-- Passe o usuário retornado
      } else {
        setError(data.error || "Erro ao registrar");
      }
    } catch {
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="flex w-full h-screen min-h-screen items-center justify-center" style={{ backgroundColor: "#D5F7D2" }}>
      <form
        className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm space-y-6 mx-2 border"
        style={{ borderColor: "#BDBDBD" }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4">
         <Logo size="large" />
          <h2 className="text-2xl font-bold" style={{ color: "#2E7D32" }}>Sign Up</h2>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-[#212121] bg-[#F0F0F0]"
          style={{ borderColor: "#BDBDBD" }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
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
          <input
            type="checkbox"
            id="terms"
            className="mr-2 accent-[#4CAF50]"
            checked={terms}
            onChange={e => setTerms(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm" style={{ color: "#212121" }}>I accept the terms of service</label>
        </div>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        {success && (
          <div className="text-green-700 text-sm">Cadastro realizado com sucesso!</div>
        )}
        <button
          className="w-full py-2 rounded hover:brightness-95 font-semibold"
          style={{ backgroundColor: "#4CAF50", color: "#fff" }}
          type="submit"
          disabled={!terms}
        >
          Register
        </button>
        <div className="text-center text-sm mt-2" style={{ color: "#212121" }}>
          Already have an account?{" "}
          <button
            type="button"
            className="underline"
            style={{ color: "#2E7D32" }}
            onClick={onGoToLogin}
          >
            Login here!
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
