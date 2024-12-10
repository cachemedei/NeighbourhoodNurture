import { Link } from 'react-router-dom';
import '../pages/styles/Home.css';

const ProjectCard = ({ projectData }) => {
    const projectLink = `project/${projectData.id}`;

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ` . . .`
        } else return str
    }

    return (
        <Link to={projectLink} className='project-card'>
            <img src={projectData.image} alt='' />
            <h1>{projectData.title}</h1>
            <p>{truncateString(projectData.description, 200)}</p>
        </Link>
    );
};
export default ProjectCard;
