import './styles/Home.css';
import useProjects from '../hooks/use-projects';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const Home = () => {
    const { projects, isLoading } = useProjects();
    const { auth } = useAuth();

    if (isLoading) {
        return <p className='loader'>Loading ...</p>;
    }

    return (
        <>
            {/* Hero Section */}
            <section className='hero'>
                <h1>hello?</h1>
                <h1 className='title'>
                    Start your own project here at{' '}
                    <span className='name'>NeighbourhoodNuture</span>
                </h1>
                <p>
                    Community connection, raising funds to support clean-up and
                    improvement projects across the City of Melville. Fostering
                    a cleaner, greener and more vibrant local community all
                    starts here, with you.
                </p>
                <button>
                    {auth.token ? (
                        <Link to='/newproject'>Create Project</Link>
                    ) : (
                        <Link to='/login'>Get Started</Link>
                    )}
                </button>
            </section>

            {/* Projects Section */}
            <section className='projects'>
                <h1>What's happening on NeighbourhoodNuture</h1>
                <div className='projects-container'>
                    {projects.map((projectData, i) => {
                        return (
                            <ProjectCard key={i} projectData={projectData} />
                        );
                    })}
                </div>
            </section>
        </>
    );
};
export default Home;
