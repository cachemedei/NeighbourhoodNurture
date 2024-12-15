import './styles/Project.css';

import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from '../hooks/use-auth';

import useUser from '../hooks/use-user';
import useProject from '../hooks/use-project';
import PledgeForm from '../components/PledgeForm';
import LrgLoader from '../components/LrgLoader';
import NotFound from '../components/NotFound';

const Project = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const { project, isLoading, error } = useProject();

    //couldn't figure out how to make use of both errors
    const { user, userError } = useUser(project?.owner);

    const [showPledgeForm, setShowPledgeForm] = useState(false);
    const handlePledge = () => setShowPledgeForm(!showPledgeForm);

    //loader and error handling
    if (isLoading) {
        return <LrgLoader />;
    }

    if (error) {
        return <NotFound error={error.message} />;
    }

    //date formatter
    const isoDate = project.date_created;
    const date = new Date(isoDate);
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-AU', options).format(
        date
    );

    return (
        <section className='project-page'>
            <img src={project.image} />

            {/* project info */}
            <section className='project-info'>
                <h2>{project.title}</h2>
                <h3>Goal: ${project.goal}</h3>
                <p>{project.description}</p>
                <div className='date-owner'>
                    <h4>Launched {formattedDate}</h4>
                    <h4>
                        By {user?.first_name} {user?.last_name}
                    </h4>
                </div>
            </section>

            {/* pledge data */}
            <section className='pledge-data'>
                <h3>Pledges</h3>
                <ul>
                    {project.pledges?.map((pledgeData, i) => {
                        return (
                            <li key={i}>
                                ${pledgeData.amount} from{' '}
                                {pledgeData.anonymous === true
                                    ? 'anonymous'
                                    : pledgeData.supporter.username}
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* pledge form */}
            {auth.token ? (
                <section className='pledge'>
                    {!showPledgeForm ? (
                        <button className='green-btn' onClick={handlePledge}>
                            Pledge Now
                        </button>
                    ) : (
                        <div className='close-pledge'>
                            <IoMdClose
                                size={30}
                                className='icon'
                                onClick={handlePledge}
                            />
                        </div>
                    )}
                    {showPledgeForm ? (
                        <PledgeForm projectId={project.id} />
                    ) : null}
                </section>
            ) : (
                <p className='text'>
                    If you would like to pledge to this project
                    <Link className='login-link' to='/login'>
                        {' '}
                        log in here{' '}
                    </Link>
                    or
                    <Link className='signup-link' to='signup'>
                        {' '}
                        create an account today!
                    </Link>
                </p>
            )}
        </section>
    );
};
export default Project;
