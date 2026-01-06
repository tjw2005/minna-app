import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';

export default function Quiz({ chapterId, data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const { updateProgress } = useProgress();

  const currentQuestion = data[currentIndex];
  const totalQuestions = data.length;

  const handleOptionClick = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setShowResult(true);
    updateProgress(chapterId, 'quiz', score);
  };

  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>Quiz Complete!</h2>
        <div className="score-display">
          <span className="big-score">{score}</span> / {totalQuestions}
        </div>
        <p>{score === totalQuestions ? 'Perfect!' : 'Keep practicing!'}</p>
        <Link to={`/chapter/${chapterId}`} className="btn-primary">Back to Chapter</Link>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div
          className="fill"
          style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
        ></div>
      </div>

      <div className="question-card">
        <h3 className="question-text jp">{currentQuestion.question}</h3>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            let className = "option-btn jp";
            if (isAnswered) {
              if (index === currentQuestion.correctIndex) className += " correct";
              else if (index === selectedOption) className += " wrong";
              else className += " dim";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="controls">
          <button className="btn-next" onClick={nextQuestion}>
            {currentIndex + 1 === totalQuestions ? 'Finish' : 'Next'}
          </button>
        </div>
      )}

      <style>{`
        .quiz-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-lg);
          overflow: hidden;
        }
        .fill {
          height: 100%;
          background: var(--color-primary);
          transition: width 0.3s ease;
        }

        .question-card {
          margin-bottom: var(--space-lg);
        }

        .question-text {
          font-size: 1.5rem;
          margin-bottom: var(--space-lg);
          text-align: center;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .option-btn {
          padding: var(--space-md);
          background: var(--bg-panel);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          text-align: left;
          font-size: 1.1rem;
          color: var(--text-main);
          transition: 0.2s;
        }

        .option-btn:hover:not(:disabled) {
          background: var(--bg-panel-hover);
          transform: translateX(5px);
        }

        .option-btn.correct {
          background: rgba(0, 230, 118, 0.2);
          border-color: var(--color-success);
          color: var(--color-success);
        }

        .option-btn.wrong {
          background: rgba(255, 23, 68, 0.2);
          border-color: var(--color-error);
          color: var(--color-error);
        }

        .option-btn.dim {
          opacity: 0.5;
        }

        .controls {
          display: flex;
          justify-content: flex-end;
        }

        .btn-next, .btn-primary {
          background: var(--color-primary);
          color: white;
          padding: 12px 32px;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 1.1rem;
          transition: 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-next:hover, .btn-primary:hover {
          background: var(--color-primary-hover);
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 64, 129, 0.4);
        }

        .quiz-result {
          text-align: center;
          background: var(--bg-panel);
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
        }
        .score-display {
          font-size: 2rem;
          margin: var(--space-lg) 0;
          color: var(--text-muted);
        }
        .big-score {
          font-size: 4rem;
          font-weight: 800;
          color: var(--color-secondary);
        }
      `}</style>
    </div>
  );
}
