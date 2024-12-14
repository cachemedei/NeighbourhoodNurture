import { useAuth } from '../hooks/use-auth';

import NewProjectForm from '../components/NewProjectForm';
import useLoader from '../hooks/use-loader';
import LrgLoader from '../components/LrgLoader';
import ErrorPage from '../components/ErrorPage';

const NewProject = () => {
    const { loading } = useLoader(400);
    const {auth} = useAuth()

    if (!auth.token) {
        return <ErrorPage />
    } else if (loading) {
        return <LrgLoader />
    } else return <NewProjectForm />
};

export default NewProject;
