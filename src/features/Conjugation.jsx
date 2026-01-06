import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';

export default function Conjugation({ chapterId, data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null

  const { updateProgress } = useProgress();
  const currentDrill = data[currentIndex];
  const totalDrills = data.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback) return; // Already answered

    const answer = inputValue.trim().toLowerCase();
    const correctAnswers = currentDrill.b.map(a => a.toLowerCase()); // Support multiple valid answers

    if (correctAnswers.includes(answer)) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }
  };

  const nextDrill = () => {
    if (currentIndex + 1 < totalDrills) {
      setCurrentIndex(c => c + 1);
      setInputValue('');
      setFeedback(null);
    } else {
      finishDrill();
    }
  };

  const finishDrill = () => {
    updateProgress(chapterId, 'conjugation', score);
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="result-container">
        <h2>Drill Complete!</h2>
        <div className="score-display">
          <span className="big-score">{score}</span> / {totalDrills}
        </div>
        <Link to={`/chapter/${chapterId}`} className="btn-primary">Back to Chapter</Link>
      </div>
    );
  }

  return (
    <div className="conjugation-container">
      <div className="progress-indicator">Drill {currentIndex + 1} / {totalDrills}</div>

      <div className="card">
        <div className="prompt-label">Convert to {currentDrill.form}</div>
        <div className="word-display jp">
          <div className="jp">{currentDrill.a}</div>
          <div className="sub">{currentDrill.hint}</div>
        </div>

        <form onSubmit={handleSubmit} className="input-area">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={feedback !== null}
            placeholder="Type answer..."
            className={`drill-input jp ${feedback === 'correct' ? 'correct' : ''} ${feedback === 'wrong' ? 'wrong' : ''}`}
            autoFocus
          />
          <button type="submit" className="btn-check" disabled={!inputValue || feedback !== null}>
            Check
          </button>
        </form>

        {feedback && (
          <div className={`feedback-panel ${feedback}`}>
            {feedback === 'correct' ? (
              <div>Correct! <span className="jp">{currentDrill.b[0]}</span></div>
            ) : (
              <div>
                Incorrect. Answer: <span className="jp">{currentDrill.b[0]}</span>
              </div>
            )}
            <button className="btn-next" onClick={nextDrill} autoFocus>
              {currentIndex + 1 === totalDrills ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .conjugation-container {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }

        .card {
          background: var(--bg-panel);
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .prompt-label {
          color: var(--color-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          margin-bottom: var(--space-md);
        }

        .word-display {
          margin-bottom: var(--space-xl);
        }
        .word-display .jp {
          font-size: 2.5rem;
          font-weight: 800;
        }
        .sub {
          color: var(--text-muted);
        }

        .drill-input {
          width: 100%;
          padding: 16px;
          font-size: 1.2rem;
          border-radius: var(--radius-md);
          border: 2px solid rgba(255,255,255,0.2);
          background: rgba(0,0,0,0.3);
          color: white;
          text-align: center;
          margin-bottom: var(--space-md);
          outline: none;
        }
        .drill-input:focus {
          border-color: var(--color-primary);
        }
        .drill-input.correct {
          border-color: var(--color-success);
          color: var(--color-success);
        }
        .drill-input.wrong {
          border-color: var(--color-error);
          color: var(--color-error);
        }

        .btn-check {
          width: 100%;
          padding: 12px;
          background: var(--color-primary);
          border-radius: var(--radius-full);
          font-weight: bold;
          font-size: 1.1rem;
          color: white;
        }
        .btn-next {
          margin-top: var(--space-md);
          width: 100%;
          padding: 12px;
          background: var(--bg-panel-hover);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: var(--radius-full);
          color: white;
          cursor: pointer;
        }
        .btn-next:hover {
          background: var(--bg-panel);
        }

        .feedback-panel {
          margin-top: var(--space-lg);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          background: rgba(0,0,0,0.2);
        }
        .feedback-panel.correct {
          color: var(--color-success);
        }
        .feedback-panel.wrong {
          color: var(--color-error);
        }
        
        .result-container {
           text-align: center;
           background: var(--bg-panel);
           padding: var(--space-xl);
           border-radius: var(--radius-lg);
        }
        .score-display {
           font-size: 3rem;
           margin: var(--space-lg) 0;
        }
      `}</style>
    </div>
  );
}
