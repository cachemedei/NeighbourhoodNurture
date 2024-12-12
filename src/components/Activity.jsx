import './styles/Activity.css';

import useLoader from '../hooks/use-loader';

import OwnedPledges from '../components/OwnedPledges';
import OwnedProjects from '../components/OwnedProjects';
import SmlLoader from './SmlLoader';

const Activity = () => {
    const {loading} = useLoader(500)

    if (loading) {
        return <SmlLoader />
    }
    return (
        <section className='activity'>
            <OwnedProjects />
            <OwnedPledges />
        </section>
    );
};
export default Activity;
