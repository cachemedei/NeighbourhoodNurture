import { Link } from 'react-router-dom';

const ProjectCard = ({ projectData }) => {
    const projectLink = `project/${projectData.id}`
    return (
        <div>
            <Link to={projectLink}>
                <img src={projectData.image} alt='' />
                <h1>{projectData.title}</h1>
            </Link>
        </div>
    );
};
export default ProjectCard;
