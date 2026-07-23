import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ImagePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api, getErrorMessage } from "../../services/api";


const RegisterPage = () => {
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("password") !== form.get("confirm_password")) {
      toast.error("Passwords do not match.");
      return;
    }
    form.delete("confirm_password");
    form.set("role", role);
    if (!form.get("photo")?.size) form.delete("photo");
    setLoading(true);
    try {
      await api.post("/users/register/", form);
      toast.success("Account created. You can now sign in.");
      navigate("/login", { replace: true });
    } catch (error) {
      const fields = error.response?.data?.error?.fields;
      const firstFieldError = fields && Object.values(fields).flat()[0];
      toast.error(firstFieldError || getErrorMessage(error, "Account could not be created."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell grid min-h-[calc(100dvh-68px)] place-items-center py-4 sm:py-6">
      <Helmet><title>Create account | Local Mart</title></Helmet>
      <section className="w-full max-w-2xl rounded-[26px] border border-white/10 bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,.3)] sm:p-7">
        <p className="eyebrow">Join the marketplace</p>
        <h1 className="mt-1.5 text-2xl font-black tracking-[-.035em] text-slate-950 sm:text-[28px]">Create your Local Mart account</h1>
        <p className="mt-1.5 text-sm text-slate-500">A few details and you’re ready to {role === "seller" ? "start selling" : "shop local"}.</p>

        <form className="mt-5 space-y-4" onSubmit={submit}>
          <fieldset>
            <legend className="label mb-1.5">I want to</legend>
            <div className="grid grid-cols-2 gap-2.5">
              {[["buyer", "Shop products"], ["seller", "Sell products"]].map(([value, label]) => (
                <label key={value} className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-bold transition ${role === value ? "border-[#78b800] bg-[#eff8e9] text-[#087c35] shadow-sm" : "border-slate-200 hover:border-[#b8dca5]"}`}>
                  <input className="sr-only" type="radio" checked={role === value} onChange={() => setRole(value)} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            <label className="label">Username<input className="field mt-1 w-full py-2.5" name="username" autoComplete="username" minLength={3} maxLength={150} required /></label>
            <label className="label">Email<input className="field mt-1 w-full py-2.5" name="email" type="email" autoComplete="email" required /></label>
            {role === "seller" && <label className="label sm:col-span-2">Business name<input className="field mt-1 w-full py-2.5" name="businessName" maxLength={255} required /></label>}
            <label className="label">Phone<input className="field mt-1 w-full py-2.5" name="phone" type="tel" autoComplete="tel" pattern="[+0-9][0-9\- ()]{6,19}" /></label>
            <label className="label">Location<input className="field mt-1 w-full py-2.5" name="location" maxLength={255} placeholder="City or neighbourhood" /></label>
            <label className="label sm:col-span-2">Address<textarea className="field mt-1 min-h-16 w-full resize-y py-2.5" name="address" autoComplete="street-address" /></label>
            <label className="label">
              Password
              <input className="field mt-1 w-full py-2.5" name="password" type="password" autoComplete="new-password" minLength={8} required />
              <span className="mt-1 block text-[11px] font-normal text-slate-500">Use at least 8 characters and avoid common passwords.</span>
            </label>
            <label className="label">Confirm password<input className="field mt-1 w-full py-2.5" name="confirm_password" type="password" autoComplete="new-password" minLength={8} required /></label>
          </div>

          <label className="label block">
            Profile photo <span className="font-normal text-slate-400">(optional)</span>
            <span className="mt-1 flex min-h-16 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#cfe4c4] bg-[#f7fbf4] transition hover:border-[#78b800]">
              {preview ? (
                <img src={preview} className="h-20 w-full object-cover" alt="Profile preview" />
              ) : (
                <span className="flex items-center gap-2 px-3 text-center text-xs font-normal text-slate-500"><ImagePlus size={18} className="text-[#087c35]" /> JPEG, PNG, or WebP · max 5 MB</span>
              )}
              <input className="sr-only" name="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }} />
            </span>
          </label>

          <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating account…" : "Create account"}</button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">Already registered? <Link to="/login" className="font-bold text-[#087c35] hover:text-[#075e2a]">Sign in</Link></p>
      </section>
    </div>
  );
};

export default RegisterPage;
