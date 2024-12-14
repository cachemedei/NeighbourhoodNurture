import './styles/OwnedProjects.css';

import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa6';

import useProjects from '../hooks/use-projects';
import OwnedProjectCard from './OwnedProjectCard';

const OwnedProjects = () => {
    const { projects } = useProjects();
    const { auth } = useAuth();
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
                    {usersProjects.map((projectData, i) => {
                        return <OwnedProjectCard key={i} projectData={projectData} />
                    })}
                </section>
            ) : null}
        </section>
    );
};
export default OwnedProjects;
