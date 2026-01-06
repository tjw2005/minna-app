import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const STORAGE_KEY = 'minna-app-progress';

export function ProgressProvider({ children }) {
    const [progress, setProgress] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.error("Failed to load progress", e);
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const updateProgress = (chapterId, activityType, score) => {
        setProgress(prev => {
            const chapterData = prev[chapterId] || {};
            const currentScore = chapterData[activityType] || 0;

            // Only update if score is higher
            if (score > currentScore) {
                return {
                    ...prev,
                    [chapterId]: {
                        ...chapterData,
                        [activityType]: score
                    }
                };
            }
            return prev;
        });
    };

    const getChapterProgress = (chapterId) => {
        return progress[chapterId] || {};
    };

    const resetProgress = () => {
        setProgress({});
    };

    const value = {
        progress,
        updateProgress,
        getChapterProgress,
        resetProgress
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
