import useUser from "../hooks/use-user";

const ProjectOwner = ({owner}) => {
    const {user} = useUser(owner)
    return (
        <h4>
            By {user?.first_name} {user?.last_name}
        </h4>
    );
};
export default ProjectOwner;
