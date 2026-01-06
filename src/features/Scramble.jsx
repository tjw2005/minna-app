import { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';

export default function Scramble({ chapterId, data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // Game State
    const [availableParts, setAvailableParts] = useState([]);
    const [placedParts, setPlacedParts] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const { updateProgress } = useProgress();
    const currentQuestion = data[currentIndex];
    const totalQuestions = data.length;

    useEffect(() => {
        // Reset state when index changes
        setAvailableParts([...currentQuestion.parts]); // Copy array
        setPlacedParts([]);
        setIsChecked(false);
        setIsCorrect(false);
    }, [currentIndex, currentQuestion]);

    const handlePartClick = (part, fromPool) => {
        if (isChecked && isCorrect) return; // Locked if correct
        if (isChecked && !isCorrect) setIsChecked(false); // Reset check status on modification

        if (fromPool) {
            // Move from available to placed
            const newAvailable = [...availableParts];
            const idx = newAvailable.indexOf(part);
            if (idx > -1) {
                newAvailable.splice(idx, 1);
                setAvailableParts(newAvailable);
                setPlacedParts([...placedParts, part]);
            }
        } else {
            // Move from placed to available
            const newPlaced = [...placedParts];
            const idx = newPlaced.indexOf(part);
            if (idx > -1) {
                newPlaced.splice(idx, 1);
                setPlacedParts(newPlaced);
                setAvailableParts([...availableParts, part]);
            }
        }
    };

    const checkAnswer = () => {
        // Compare placedParts with correctOrder
        const isMatch = JSON.stringify(placedParts) === JSON.stringify(currentQuestion.correctOrder);
        setIsChecked(true);
        setIsCorrect(isMatch);
    };

    const nextQuestion = () => {
        if (isCorrect) setScore(s => s + 1);

        if (currentIndex + 1 < totalQuestions) {
            setCurrentIndex(c => c + 1);
        } else {
            finishGame();
        }
    };

    const finishGame = () => {
        // Need to account for the last question's score
        const finalScore = isCorrect ? score + 1 : score;
        updateProgress(chapterId, 'scramble', finalScore);
        setShowResult(true);
    };

    if (showResult) {
        return (
            <div className="result-container">
                <h2>Challenge Complete!</h2>
                <div className="score-display">
                    <span className="big-score">{score + (isCorrect ? 1 : 0)}</span> / {totalQuestions}
                </div>
                <Link to={`/chapter/${chapterId}`} className="btn-primary">Back to Chapter</Link>
            </div>
        );
    }

    return (
        <div className="scramble-container">
            <div className="progress-indicator">
                Question {currentIndex + 1} / {totalQuestions}
            </div>

            <div className="question-area">
                <h3>{currentQuestion.question}</h3>

                <div className={`answer-box ${isChecked ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
                    {placedParts.length === 0 && <span className="placeholder">Tap words below to build sentence</span>}
                    {placedParts.map((part, i) => (
                        <button key={i} className="word-chip placed" onClick={() => handlePartClick(part, false)}>
                            {part}
                        </button>
                    ))}
                </div>

                {isChecked && !isCorrect && (
                    <div className="feedback-msg">Not quite right. Try again!</div>
                )}
            </div>

            <div className="pool-area">
                {availableParts.map((part, i) => (
                    <button key={i} className="word-chip" onClick={() => handlePartClick(part, true)}>
                        {part}
                    </button>
                ))}
            </div>

            <div className="controls">
                {!isChecked || !isCorrect ? (
                    <button
                        className="btn-action"
                        onClick={checkAnswer}
                        disabled={placedParts.length === 0}
                    >
                        Check Answer
                    </button>
                ) : (
                    <button className="btn-next" onClick={nextQuestion}>
                        {currentIndex + 1 === totalQuestions ? 'Finish' : 'Next'}
                    </button>
                )}
            </div>

            <style>{`
        .scramble-container {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .progress-indicator {
          text-align: center;
          color: var(--text-muted);
        }

        .answer-box {
          min-height: 80px;
          background: rgba(0,0,0,0.2);
          border: 2px dashed rgba(255,255,255,0.2);
          border-radius: var(--radius-lg);
          padding: var(--space-md);
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }

        .answer-box.correct {
          border-color: var(--color-success);
          background: rgba(0, 230, 118, 0.1);
          border-style: solid;
        }

        .answer-box.wrong {
          border-color: var(--color-error);
        }

        .placeholder {
          color: rgba(255,255,255,0.3);
          font-style: italic;
        }

        .pool-area {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          justify-content: center;
          margin-bottom: var(--space-lg);
        }

        .word-chip {
          background: var(--bg-panel);
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--text-main);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 1.1rem;
          font-family: var(--font-japanese);
          cursor: pointer;
          user-select: none;
          transition: 0.2s;
        }
        .word-chip:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }
        .word-chip.placed {
          background: var(--color-secondary);
          color: #000;
          border-color: var(--color-secondary);
        }

        .btn-action {
          background: var(--color-accent);
          color: white;
          padding: 12px 32px;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 1.1rem;
          width: 100%;
          transition: 0.2s;
        }
        .btn-action:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }
        .btn-action:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-next {
          background: var(--color-success);
          color: #000;
          padding: 12px 32px;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 1.1rem;
          width: 100%;
        }

        .result-container {
           text-align: center;
           background: var(--bg-panel);
           padding: var(--space-xl);
           border-radius: var(--radius-lg);
        }
      `}</style>
        </div>
    );
}
