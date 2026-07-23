import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { api, getErrorMessage } from "../../services/api";


const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "", role: "buyer" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data: tokens } = await api.post("/users/login/", form);
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      const { data: profile } = await api.get("/users/profile/");
      login(profile, tokens);
      toast.success(`Welcome back, ${profile.username}.`);
      const requestedPath = location.state?.from?.pathname;
      navigate(requestedPath || (profile.role === "seller" ? "/seller-dashboard" : "/"), { replace: true });
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      toast.error(getErrorMessage(error, "Username, password, or account type is incorrect."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell grid min-h-[calc(100dvh-68px)] place-items-center py-4 sm:py-6">
      <Helmet><title>Sign in | Local Mart</title></Helmet>
      <section className="w-full max-w-sm rounded-[26px] border border-white/10 bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,.3)] sm:p-7">
        <p className="eyebrow">Welcome back</p>
        <h1 className="mt-1.5 text-2xl font-black tracking-[-.035em] text-slate-950 sm:text-[28px]">Sign in to Local Mart</h1>
        <p className="mt-1.5 text-sm leading-5 text-slate-500">Manage your marketplace account and orders.</p>

        <form className="mt-5 space-y-4" onSubmit={submit}>
          <fieldset>
            <legend className="label mb-1.5">Account type</legend>
            <div className="grid grid-cols-2 gap-2">
              {["buyer", "seller"].map((role) => (
                <label key={role} className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-bold capitalize transition ${form.role === role ? "border-[#78b800] bg-[#eff8e9] text-[#087c35] shadow-sm" : "border-slate-200 hover:border-[#b8dca5]"}`}>
                  <input className="sr-only" type="radio" name="role" value={role} checked={form.role === role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
                  {role}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="label block">
            Username
            <span className="relative mt-1 block">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input className="field w-full py-2.5 pl-10" autoComplete="username" required value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
            </span>
          </label>

          <label className="label block">
            Password
            <span className="relative mt-1 block">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input className="field w-full px-10 py-2.5" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
              <button type="button" className="icon-button absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>

          <button className="btn-primary w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">New to Local Mart? <Link to="/register" className="font-bold text-[#087c35] hover:text-[#075e2a]">Create an account</Link></p>
      </section>
    </div>
  );
};

export default LoginPage;
