import './styles/OwnedProjects.css'

import { useNavigate } from "react-router-dom"

import deleteProject from '../api/delete-project'

const DeleteProject = ({projectId, token}) => {

    const navigate = useNavigate

    const handleDelete = () => {
        deleteProject(projectId, token)
    }

  return (
    <p className='delete' onClick={handleDelete}>Delete?</p>
  )
}
export default DeleteProject