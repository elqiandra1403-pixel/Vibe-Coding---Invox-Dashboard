'use client';

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const supabase = React.useMemo(() => createClient(), []);

  const handleOAuth = async (provider: "google" | "apple") => {
    setIsLoading(true);
    setError(null);

    try {
      if (supabase) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;
      } else {
        // Fallback demo mode redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in with provider.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError(null);

    try {
      if (supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      // Successfully authenticated or demo mode
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>iv</div>
          <span className={styles.logoText}>Invox</span>
        </div>
        <p className={styles.welcomeSubtitle}>WELCOME BACK</p>
        <h1 className={styles.title}>Sign in to Invox</h1>
        <p className={styles.description}>Pick up right where your cash flow left off.</p>
      </div>

      {error && (
        <div style={{
          padding: "10px 14px",
          marginBottom: "16px",
          borderRadius: "8px",
          backgroundColor: "#FEF2F2",
          border: "1px solid #FEE2E2",
          color: "#991B1B",
          fontSize: "13px"
        }}>
          {error}
        </div>
      )}

      <div className={styles.ssoButtons}>
        <Button 
          variant="outline" 
          className={styles.ssoButtonContent}
          onClick={() => handleOAuth("google")}
          disabled={isLoading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Button>
        <Button 
          variant="outline" 
          className={styles.ssoButtonContent}
          onClick={() => handleOAuth("apple")}
          disabled={isLoading}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.288 8.16C12.304 6.272 13.824 5.344 13.904 5.296C13.04 4.032 11.664 3.84 11.168 3.824C9.888 3.696 8.656 4.592 7.984 4.592C7.312 4.592 6.304 3.856 5.248 3.872C3.888 3.888 2.656 4.672 1.952 5.888C0.512 8.368 1.584 12.032 2.992 14.064C3.68 15.056 4.48 16.16 5.552 16.128C6.592 16.096 7 15.456 8.24 15.456C9.472 15.456 9.824 16.128 10.928 16.096C12.032 16.096 12.736 15.104 13.408 14.096C14.24 12.896 14.592 11.744 14.608 11.68C14.576 11.664 12.272 10.784 12.288 8.16ZM10.512 2.576C11.088 1.88 11.472 0.936 11.368 0C10.544 0.032 9.536 0.544 8.944 1.224C8.432 1.816 7.968 2.792 8.088 3.704C9.016 3.776 9.936 3.256 10.512 2.576Z" />
          </svg>
          Continue with Apple
        </Button>
      </div>

      <div className={styles.divider}>
        <span className={styles.dividerText}>OR</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
          type="email" 
          placeholder="you@company.com" 
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordInputWrapper}>
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <EyeOff 
              size={16} 
              className={styles.eyeIcon} 
              onClick={() => setShowPassword(false)} 
            />
          ) : (
            <Eye 
              size={16} 
              className={styles.eyeIcon} 
              onClick={() => setShowPassword(true)} 
            />
          )}
        </div>
        <Button variant="primary" type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" style={{ marginRight: 8 }} />
              Signing in...
            </>
          ) : (
            "Sign in →"
          )}
        </Button>
      </form>

      <p className={styles.signUpPrompt}>
        New to Invox? <Link href="/register" className={styles.link}>Create one</Link>
      </p>

      <div className={styles.footer}>
        <ShieldCheck size={14} className={styles.footerIcon} />
        <span>Encrypted end-to-end. By continuing you agree to Invox&apos;s terms & privacy.</span>
      </div>
    </div>
  );
}
