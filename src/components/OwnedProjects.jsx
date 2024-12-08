import './styles/OwnedProjects.css';

import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';

import useProjects from '../hooks/use-projects';

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
        setUsersProjects(list)
      }, [projects]);
      

    return (
        <div className='owned-projects'>
            <h3>My Projects</h3>
            <ul>
                {usersProjects.map((project, i) => (
                    <section key={i}>
                        <p>{project.title}</p>
                    </section>
                ))}
            </ul>
        </div>
    );
};
export default OwnedProjects;
