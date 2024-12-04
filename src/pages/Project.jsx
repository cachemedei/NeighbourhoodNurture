import './styles/Project.css';
import { Link, useParams } from 'react-router-dom';
import useProject from '../hooks/use-project';
import { useAuth } from '../hooks/use-auth';
import PledgeForm from '../components/PledgeForm';

const Project = () => {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
    const { auth, setAuth } = useAuth();

    //loader
    if (isLoading) {
        return <p className='loader'>Loading...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    //date formatter
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
            <PledgeForm projectId={project.id} />
        </section>
    );
};
export default Project;
