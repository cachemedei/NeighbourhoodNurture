import './styles/DeleteEditBtns.css';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import deleteProject from '../api/delete-project';

const DeleteEditBtns = ({ projectId, token, link }) => {
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
        <div className='delete-edit'>
            <Toaster position='bottom-right' />

            {!confirmDelete ? (
                <div className='btn-container'>
                    {/* link to edit project */}
                    <Link className='edit-btn' to={link}>
                        Edit
                    </Link>
                    <p
                        className='del-btn'
                        onClick={() => setConfirmDelete(true)}
                    >
                        Delete
                    </p>
                </div>
            ) : (
                <div className='btn-container'>
                    <p className='confirm-text'>Are you sure?</p>
                    {/* <div className='confirm-btn-container'> */}
                        <p className='del-btn' onClick={handleDelete}>
                            Delete
                        </p>
                        <p
                            className='del-btn'
                            onClick={() => setConfirmDelete(false)}
                        >
                            Cancel
                        </p>
                    {/* </div> */}
                </div>
            )}
        </div>
    );
};
export default DeleteEditBtns;
