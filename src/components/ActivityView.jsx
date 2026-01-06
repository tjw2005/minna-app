import { useParams, Navigate } from 'react-router-dom';
import { chapters } from '../data/chapters';
import Quiz from '../features/Quiz';
import Scramble from '../features/Scramble';
import Vocabulary from '../features/Vocabulary';
import Conjugation from '../features/Conjugation';

export default function ActivityView() {
    const { id, type } = useParams();
    const chapter = chapters.find(c => c.id === parseInt(id));

    if (!chapter) return <Navigate to="/" />;

    const data = chapter.activities[type];

    if (!data) return <Navigate to={`/chapter/${id}`} />;

    // Render based on type
    if (type === 'quiz') {
        return <Quiz chapterId={chapter.id} data={data} />;
    }
    if (type === 'scramble') {
        return <Scramble chapterId={chapter.id} data={data} />;
    }
    if (type === 'vocabulary') {
        return <Vocabulary data={data} />;
    }
    if (type === 'conjugation') {
        return <Conjugation chapterId={chapter.id} data={data} />;
    }

    return <div>Unknown Activity Type</div>;
}
