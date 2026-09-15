function AuthLayout({ children }) {
  return <div className="auth-page"><section className="auth-intro"><div className="brand-mark">P</div><h1>Placement Portal</h1><p>A focused campus recruitment workspace for students, recruiters, and university administrators.</p></section><main className="auth-form-wrap"><section className="auth-card">{children}</section></main></div>;
}

export default AuthLayout;
