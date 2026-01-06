import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <Link to="/" className="brand-link">
                        <div className="logo-placeholder">M</div>
                        <span className="brand-text">Minna App</span>
                    </Link>
                    {!isHome && (
                        <Link to="/" className="nav-back">
                            Dashboard
                        </Link>
                    )}
                </div>
            </header>

            <main className="app-main">
                {children}
            </main>

            <footer className="app-footer">
                <p>© 2026 Minna Companion</p>
            </footer>

            <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: radial-gradient(circle at top right, #1a1b4b, #0f1020);
        }

        .app-header {
          height: 64px;
          backdrop-filter: blur(12px);
          background: rgba(15, 16, 32, 0.6);
          border-bottom: 1px solid var(--bg-panel-hover);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-md);
        }

        .brand-link {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--text-main);
        }

        .logo-placeholder {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          box-shadow: var(--shadow-glow);
        }

        .nav-back {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .nav-back:hover {
          color: var(--text-main);
        }

        .app-main {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-lg) var(--space-md);
        }

        .app-footer {
          padding: var(--space-lg);
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8rem;
          border-top: 1px solid var(--bg-panel);
        }
      `}</style>
        </div>
    );
}
