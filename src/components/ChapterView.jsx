import { useParams, Link, Navigate } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { useProgress } from '../context/ProgressContext';

export default function ChapterView() {
    const { id } = useParams();
    const chapter = chapters.find(c => c.id === parseInt(id));
    const { getChapterProgress } = useProgress();

    if (!chapter) return <Navigate to="/" />;

    const progress = getChapterProgress(chapter.id);

    // Define activity types and their display names
    // We only show them if data exists in the chapter object
    const activityTypes = [
        { key: 'vocabulary', label: 'Vocabulary List', icon: '📖', type: 'reader' }, // Reader isn't a game, just a view
        { key: 'quiz', label: 'Grammar Quiz', icon: '❓', type: 'game' },
        { key: 'scramble', label: 'Sentence Scramble', icon: '🧩', type: 'game' },
        { key: 'conjugation', label: 'Conjugation Drill', icon: '⚡', type: 'game' },
    ];

    return (
        <div className="chapter-view">
            <header className="chapter-header">
                <h1 className="chapter-title">{chapter.title}</h1>
                <p className="chapter-desc">{chapter.description}</p>
            </header>

            <div className="activities-grid">
                {activityTypes.map(activity => {
                    const hasContent = chapter.activities[activity.key] && chapter.activities[activity.key].length > 0;
                    if (!hasContent) return null;

                    const score = progress[activity.key];

                    return (
                        <Link
                            key={activity.key}
                            to={`/chapter/${id}/${activity.key}`}
                            className="activity-card"
                        >
                            <div className="icon-wrapper">{activity.icon}</div>
                            <div className="activity-info">
                                <h3>{activity.label}</h3>
                                {score !== undefined && (
                                    <div className="score-badge">Best: {score}</div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            <style>{`
        .chapter-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        .chapter-title {
          font-size: 2.5rem;
          margin-bottom: var(--space-sm);
        }
        .chapter-desc {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
          max-width: 900px;
          margin: 0 auto;
        }

        .activity-card {
          background: var(--bg-panel);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          display: flex;
          align-items: center;
          gap: var(--space-md);
          transition: all 0.2s var(--ease-spring);
        }

        .activity-card:hover {
          background: var(--bg-panel-hover);
          transform: scale(1.02);
          border-color: var(--color-primary);
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .activity-info h3 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .score-badge {
          font-size: 0.8rem;
          color: var(--color-success);
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}
