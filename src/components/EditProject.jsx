import './styles/EditProject.css';
import useLoader from '../hooks/use-loader';
import SmlLoader from './SmlLoader';
import { useAuth } from '../hooks/use-auth';

const EditProject = () => {
    const { loading } = useLoader(400);
    const {auth} = useAuth()
    
    const handleChange = (e) => {

    }

    if (loading) {
        return <SmlLoader />;
    }

    return (
      <section>
        <h1>Edit Project</h1>
        <form></form>
      </section>
    )
};
export default EditProject;
