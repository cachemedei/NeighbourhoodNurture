import './styles/Project.css';

import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import useProject from '../hooks/use-project';
import Loader from '../components/Loader';
import PledgeForm from '../components/PledgeForm';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const Project = () => {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);

    const [showPledgeForm, setShowPledgeForm] = useState(false);
    const handlePledge = () => setShowPledgeForm(!showPledgeForm);

    //loader
    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <p>{error.message}</p>;
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
                <h4>Launched {formattedDate}</h4>
            </section>

            {/* pledge data */}
            <section className='pledge-data'>
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges?.map((pledgeData, i) => {
                        return (
                            <li key={i}>
                                ${pledgeData.amount} from {pledgeData.supporter}
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* pledge form */}
            <section className='pledge'>
                {!showPledgeForm ? (
                    <button className='btn' onClick={handlePledge}>Pledge Now</button>
                ) : (
                    <div className='close-pledge'>
                        <IoMdClose
                        size={25}
                        className='icon'
                            onClick={handlePledge}
                        />
                    </div>
                )}
                {showPledgeForm ? <PledgeForm projectId={project.id} /> : null}
            </section>
        </section>
    );
};
export default Project;
