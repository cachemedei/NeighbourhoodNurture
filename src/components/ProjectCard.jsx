import './styles/ProjectCard.css';

import { Link } from 'react-router-dom';

const ProjectCard = ({ projectData }) => {
    const projectLink = `project/${projectData.id}`;

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ` . . .`;
        } else return str;
    };

    return (
        <Link to={projectLink} className='project-card'>
            <img src={projectData.image} alt='' />
            <h1 className='card-title'>{projectData.title}</h1>
            <p className='description'>
                {truncateString(projectData.description, 160)}
            </p>
        </Link>
    );
};
export default ProjectCard;
