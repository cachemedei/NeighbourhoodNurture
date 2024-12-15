import './styles/Project.css';

import { useAuth } from '../hooks/use-auth';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import useProject from '../hooks/use-project';
import PledgeForm from '../components/PledgeForm';
import LrgLoader from '../components/LrgLoader';
import NotFound from '../components/NotFound';
import GoalStatusBar from '../components/GoalStatusBar';
import ProjectOwner from '../components/ProjectOwner';

const Project = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);

    //pledge total
    const pledgeTotal = project?.pledges.reduce(
        (acc, pledge) => acc + pledge.amount,
        0
    );
    const remainder = project?.goal - pledgeTotal;
    const pledgePercent = Math.floor((pledgeTotal / project?.goal) * 100);
    const remainderPercent = Math.floor((remainder / project?.goal) * 100);

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
                <div className='header'></div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className='date-owner'>
                    <h4>Launched {formattedDate}</h4>
                    <ProjectOwner owner={project?.owner} />
                </div>
            </section>
            <div className='goal-container'>
                <GoalStatusBar
                    pledgePercent={pledgePercent}
                    remainderPercent={remainderPercent}
                />
                <h3 className='goal'>
                    ${pledgeTotal} of ${project.goal} raised so far
                </h3>
            </div>

            {/* pledge data */}
            <section className='pledge-data'>
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
