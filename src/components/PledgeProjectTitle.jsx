import useProject from "../hooks/use-project"

const PledgeProjectTitle = ({id}) => {
    const {project, isLoading} = useProject(id)

  return (
    <p>{project?.title}</p>
  )
}
export default PledgeProjectTitle