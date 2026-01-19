import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";
import useInput from "../hooks/useInput";
import { useLocaleContext } from "../context/LocaleContext";

const Register = () => {
  const navigate = useNavigate();

  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [confirmPassword, handleConfirmPasswordChange] = useInput("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useLocaleContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      console.log("Register data:", { name, email, password });

      navigate("/login");
    } catch (err) {
      setError("Gagal mendaftar, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md rounded-2xl px-4 py-8 sm:px-8 shadow-lg border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
          {t.makeNewAccount}
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          {t.registersubtitle}
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 dark:bg-red-900/20 text-red-400 dark:text-red-300 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t.fullName}
            value={name}
            onChange={handleNameChange}
            required
            className="w-full rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder={t.confirmPassword}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="w-full rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-800 dark:bg-gray-200 py-3 font-semibold text-white dark:text-gray-800 hover:bg-gray-900 dark:hover:bg-white cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.register + "..." : t.register}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {t.alreadyHaveAccount}{" "}
          <Link
            to="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors duration-200"
          >
            {t.login}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
