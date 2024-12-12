import './styles/OwnedProjects.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import deleteProject from '../api/delete-project';

const DeleteProject = ({ projectId, token }) => {
    const notify = (msg) => toast('Deleting project');
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);


    const handleDelete = () => {
        deleteProject(projectId, token)
        notify();
        setTimeout(() => {
            navigate(0);
        }, 2000);
    };

    return (
        <>
            <Toaster position='bottom-right' />
            {!confirmDelete ? (
                <p className='del-btn' onClick={() => setConfirmDelete(true)}>
                    Delete
                </p>
            ) : (
                <>
                    <p>Are you sure?</p>
                    <p className='del-btn' onClick={handleDelete}>
                        Yes, delete
                    </p>
                    <p
                        className='del-btn'
                        onClick={() => setConfirmDelete(false)}
                    >
                        Cancel
                    </p>
                </>
            )}
        </>
    );
};
export default DeleteProject;
