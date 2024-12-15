import useProject from "../hooks/use-project"

const PledgeProjectTitle = ({id}) => {
    const {project} = useProject(id)

  return (
    <p>{project?.title}</p>
  )
}
export default PledgeProjectTitle