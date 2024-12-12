import './styles/EditProject.css';
import useLoader from '../hooks/use-loader';
import SmlLoader from './SmlLoader';

const EditProject = () => {
    const { loading } = useLoader(400);
    if (loading) {
        return <SmlLoader />;
    }

    return <section className='edit-project'>EditProject</section>;
};
export default EditProject;
