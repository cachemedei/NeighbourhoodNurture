import './styles/OwnedProjects.css';

import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa6';

import useProjects from '../hooks/use-projects';
import DeleteProject from './DeleteProject';

const OwnedProjects = () => {
    const { projects } = useProjects();
    const { auth, setAuth } = useAuth();
    const [usersProjects, setUsersProjects] = useState([]);
    const userId = auth.user;
    const [showData, setShowData] = useState(false);
    const handleShowData = () => setShowData(!showData);

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
        <section className='owned-projects'>
            <h1 onClick={handleShowData} className='title'>
                my projects
                {!showData ? (
                    <FaChevronRight size={15} />
                ) : (
                    <FaChevronDown size={15} />
                )}
            </h1>
            {showData ? (
                <section className='list'>
                    {usersProjects.map((project, i) => (
                        <article className='item' key={i}>
                            <h3 className='subtitle'>{project.title}</h3>
                            <Link to={`/project/${project.id}`}>
                                <img
                                    className='image'
                                    src={project.image}
                                    alt=''
                                />
                            </Link>
                            <div className='project-btns'>
                                <DeleteProject
                                    projectId={project.id}
                                    token={auth.token}
                                />
                                <Link
                                    className='edit-btn'
                                    to='/account/editproject'
                                >
                                    Edit
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            ) : null}
        </section>
    );
};
export default OwnedProjects;
