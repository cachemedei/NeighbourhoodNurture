import './styles/Activity.css';

import useLoader from '../hooks/use-loader';
import SmlLoader from './SmlLoader';
import OwnedPledges from '../components/OwnedPledges';
import OwnedProjects from '../components/OwnedProjects';

const Activity = () => {
    const { loading } = useLoader(1100);

    if (loading) {
        return <SmlLoader />;
    }
    return (
        <section className='activity'>
            <OwnedProjects />
            <OwnedPledges />
        </section>
    );
};
export default Activity;
