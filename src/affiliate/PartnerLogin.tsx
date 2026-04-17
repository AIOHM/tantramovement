import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { loginAffiliate } from "./auth";

const PartnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await loginAffiliate(email, password);
      toast({ title: "Welcome back!", description: "You are now signed in to the partner dashboard." });
      navigate("/affiliate/dashboard");
    } catch (error) {
      toast({ title: "Login failed", description: error instanceof Error ? error.message : "Unable to sign in.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="bg-[#592C66] text-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-[2rem] border border-white/10 bg-[#271338]/95 p-12 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)]">
            <h1 className="text-4xl font-display font-bold text-white">Partner sign in</h1>
            <p className="mt-4 text-white/75">Access your affiliate dashboard and manage your referral links.</p>
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <label className="block text-sm font-medium text-white/80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="you@example.com"
              required
            />
            <label className="block text-sm font-medium text-white/80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Enter your password"
              required
            />
            <button type="submit" disabled={loading} className="tantra-button inline-flex items-center justify-center gap-2 w-full">
              {loading ? <><Loader2 className="animate-spin" size={18} /> Signing in...</> : <>Sign in</>}
            </button>
            <p className="text-sm text-white/75">
              New partner? <Link to="/affiliate/signup" className="text-white underline-offset-2 hover:underline">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
      </section>
    </Layout>
  );
};

export default PartnerLogin;
