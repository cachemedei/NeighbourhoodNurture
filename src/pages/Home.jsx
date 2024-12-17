import './styles/Home.css';

import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import HeroImg from '/images/hero.jpg';
import useProjects from '../hooks/use-projects';
import ProjectCard from '../components/ProjectCard';
import LrgLoader from '../components/LrgLoader';
import NotFound from '../components/NotFound';

const Home = () => {
    const { showNav, setShowNav } = useOutletContext();
    const { projects, isLoading, error } = useProjects();
    const { auth } = useAuth();

    if (isLoading) {
        return <LrgLoader />;
    }
    if (error) {
        return <NotFound error={error.message} />;
    }

    return (
        <>
            <img className='hero-img' src={HeroImg} alt='' />

            {/* hero */}
            <section className='hero'>
                <h1 className='title'>
                    Start your own project here at{' '}
                    <span className='name'>NeighbourhoodNuture</span>
                </h1>
                <p className='description'>
                    Community connection, raising funds to support clean-up and
                    improvement projects across the City of Melville. Fostering
                    a cleaner, greener and more vibrant local community all
                    starts here, with you.
                </p>
                <button className='green-btn'>
                    {auth.token ? (
                        <Link
                            to='/newproject'
                            onClick={() => setShowNav(false)}
                        >
                            Create Project
                        </Link>
                    ) : (
                        <Link to='/login' onClick={() => setShowNav(false)}>
                            Get Started
                        </Link>
                    )}
                </button>
            </section>

            {/* projects */}
            <section className='projects'>
                <h1 className='title'>
                    What's happening on NeighbourhoodNuture
                </h1>
                <section className='projects-container'>
                    {projects.map((projectData, i) => {
                        return (
                            <ProjectCard key={i} projectData={projectData} />
                        );
                    })}
                </section>
            </section>
        </>
    );
};
export default Home;
