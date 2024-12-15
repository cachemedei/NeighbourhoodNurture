import './styles/OwnedProjects.css';

import { useAuth } from '../hooks/use-auth';
import { Link } from 'react-router-dom';

import DeleteEditBtns from './DeleteEditBtns';

const OwnedProjectCard = ({ projectData }) => {
    const editProjectLink = `editproject/${projectData.id}`;
    const { auth } = useAuth();

    return (
        <article className='owned-card'>
            <h3 className='subtitle'>{projectData.title}</h3>

            {/* link to view project */}
            <Link to={`/project/${projectData.id}`}>
                <img className='image' src={projectData.image} alt='' />
            </Link>
            <DeleteEditBtns
                projectId={projectData.id}
                token={auth.token}
                link={editProjectLink}
            />
        </article>
    );
};
export default OwnedProjectCard;
