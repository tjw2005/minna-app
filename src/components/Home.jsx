import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { useProgress } from '../context/ProgressContext';

export default function Home() {
    const { getChapterProgress } = useProgress();

    return (
        <div className="home-container">
            <section className="hero">
                <h1 className="title">
                    <span className="jp-text">みんなの日本語</span>
                    <span className="en-text">Companion</span>
                </h1>
                <p className="subtitle">Master Japanese step by step.</p>
            </section>

            <div className="chapter-grid">
                {chapters.map(chapter => {
                    const progress = getChapterProgress(chapter.id);
                    // Calculate arbitrary % based on activities usually
                    // For now, just show raw points or something.
                    // Let's count keys in progress object for that chapter?
                    const started = Object.keys(progress).length > 0;

                    return (
                        <Link
                            key={chapter.id}
                            to={`/chapter/${chapter.id}`}
                            className={`chapter-card ${chapter.locked ? 'locked' : ''}`}
                        >
                            <div className="card-content">
                                <span className="chapter-id">Chapter {chapter.id}</span>
                                <h3 className="chapter-title">{chapter.title}</h3>
                                <p className="chapter-jp">{chapter.subtitle}</p>
                                <div className="card-footer">
                                    {chapter.locked ? (
                                        <span className="status locked">Locked</span>
                                    ) : (
                                        <span className={`status ${started ? 'active' : ''}`}>
                                            {started ? 'In Progress' : 'Start'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <style>{`
        .home-container {
          animation: fade-in 0.5s ease-out;
        }

        .hero {
          text-align: center;
          margin-bottom: var(--space-xl);
          padding: var(--space-xl) 0;
        }

        .title {
          font-size: 3rem;
          margin-bottom: var(--space-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
        }
        .jp-text {
          font-family: var(--font-japanese);
          background: linear-gradient(to right, #fff, #a0a0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .en-text {
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-primary);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .chapter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-lg);
        }

        .chapter-card {
          background: var(--bg-panel);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          transition: all 0.3s var(--ease-spring);
          position: relative;
          overflow: hidden;
          display: block;
        }

        .chapter-card:hover {
          transform: translateY(-5px);
          background: var(--bg-panel-hover);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: var(--shadow-glow);
        }

        .chapter-id {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-secondary);
          display: block;
          margin-bottom: var(--space-xs);
        }

        .chapter-title {
          font-size: 1.4rem;
          margin-bottom: var(--space-xs);
        }

        .chapter-jp {
          font-family: var(--font-japanese);
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: var(--space-md);
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
        }

        .status {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
        }

        .status.active {
          background: var(--color-primary);
          color: #fff;
        }

        .chapter-card.locked {
          opacity: 0.5;
          pointer-events: none;
          filter: grayscale(0.8);
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
