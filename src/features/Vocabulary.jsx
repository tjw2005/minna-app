export default function Vocabulary({ data }) {
    return (
        <div className="vocabulary-container">
            <h2>Vocabulary List</h2>
            <div className="vocab-grid">
                {data.map((word, index) => (
                    <div key={index} className="vocab-card">
                        <div className="jp">{word.jp}</div>
                        <div className="romaji">{word.romaji}</div>
                        <div className="en">{word.en}</div>
                    </div>
                ))}
            </div>

            <style>{`
        .vocabulary-container {
          max-width: 800px;
          margin: 0 auto;
        }

        h2 {
          text-align: center;
          margin-bottom: var(--space-lg);
        }

        .vocab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--space-md);
        }

        .vocab-card {
          background: rgba(255, 255, 255, 0.05);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          text-align: center;
          border: 1px solid transparent;
          transition: 0.2s;
        }

        .vocab-card:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--color-primary);
        }

        .jp {
          font-size: 1.5rem;
          margin-bottom: 4px;
          color: var(--color-secondary);
        }

        .romaji {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .en {
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}
