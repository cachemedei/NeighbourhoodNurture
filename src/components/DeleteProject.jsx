import './styles/DeleteProject.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import deleteProject from '../api/delete-project';

const DeleteProject = ({ projectId, token }) => {
    const notify = (msg) => toast('Deleting project');
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        deleteProject(projectId, token);
        notify();
        setTimeout(() => {
            navigate(0);
        }, 2000);
    };

    return (
        <div className='delete-project'>
            <Toaster position='bottom-right' />
            {!confirmDelete ? (
                <p className='del-btn' onClick={() => setConfirmDelete(true)}>
                    Delete
                </p>
            ) : (
                <>
                    <p className='confirm-text'>Are you sure?</p>
                    <div className='confirm-btn-container'>
                        <p className='del-btn' onClick={handleDelete}>
                            Delete
                        </p>
                        <p
                            className='del-btn'
                            onClick={() => setConfirmDelete(false)}
                        >
                            Cancel
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};
export default DeleteProject;
