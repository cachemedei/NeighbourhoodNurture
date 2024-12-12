import NewProjectForm from '../components/NewProjectForm';
import useLoader from '../hooks/use-loader';
import LrgLoader from '../components/LrgLoader';

const NewProject = () => {
    const { loading } = useLoader(400);

    return loading ? <LrgLoader /> : <NewProjectForm />;
};
export default NewProject;
