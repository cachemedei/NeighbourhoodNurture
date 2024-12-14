import './styles/OwnedProjects.css';

import { useAuth } from '../hooks/use-auth';
import { Link } from 'react-router-dom';

import DeleteProject from './DeleteProject';

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

            <div className='project-btns'>
                {/* link to edit project */}
                <Link className='edit-btn' to={editProjectLink}>
                    Edit
                </Link>

                {/* button to delete */}
                <DeleteProject projectId={projectData.id} token={auth.token} />

            </div>
        </article>
    );
};
export default OwnedProjectCard;
