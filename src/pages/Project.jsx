import './styles/Project.css';
import { useParams } from 'react-router-dom';
import useProject from '../hooks/use-project';

const Project = () => {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return <p className='loader'>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    const isoDate = project.date_created;
    const date = new Date(isoDate);
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-AU', options).format(
        date
    );

    return (
        <section className='project-page'>
            <h2>{project.title}</h2>
            <img src={project.image} />
            <h3>{formattedDate}</h3>
            <p>{project.description}</p>
            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, i) => {
                    return (
                        <li key={i}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );
                })}
            </ul>
            {project.is_open ? (
                <p>This project is currently active</p>
            ) : (
                <p>This project is no longer active</p>
            )}
        </section>
    );
};
export default Project;
