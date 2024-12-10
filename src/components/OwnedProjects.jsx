import './styles/OwnedProjects.css';

import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';

import useProjects from '../hooks/use-projects';
import DeleteProject from './DeleteProject';

const OwnedProjects = () => {
    const { auth } = useAuth();
    const userId = auth.user;

    const { projects } = useProjects();
    const [usersProjects, setUsersProjects] = useState([]);

    useEffect(() => {
        let list = [];
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].owner == userId) {
                list.push(projects[i]);
            }
        }
        setUsersProjects(list);
    }, [projects]);

    return (
        <div className='owned-projects'>
            <h1>My Projects</h1>
            <ul className='list'>
                {usersProjects.map((project, i) => (
                    <li key={i}>
                        <h3>{project.title}</h3>
                        <img src={project.image} alt="" />
                        <DeleteProject
                            projectId={project.id}
                            token={auth.token}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default OwnedProjects;
