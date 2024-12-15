import './styles/EditProject.css';

import { useAuth } from '../hooks/use-auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import useLoader from '../hooks/use-loader';
import useProject from '../hooks/use-project';
import putProject from '../api/put-project';
import LrgLoader from './LrgLoader';
import toast, { Toaster } from 'react-hot-toast';

const EditProject = () => {
    const { loading } = useLoader(400);
    const { id } = useParams();
    const { project } = useProject(id);
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [editingProject, setEditingProject] = useState({
        title: '',
        description: '',
        goal: '',
        image: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditingProject((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await putProject(
                editingProject?.title,
                editingProject?.description,
                editingProject?.goal,
                editingProject?.image,
                project.id,
                auth.token,
                project
            );
            navigate(`/project/${project.id}`, { replace: true });
            navigate(0);
        } catch (error) {
            toast(error.message);
        }
    };

    if (loading) {
        return <LrgLoader />;
    }

    return (
        <section className='edit-project'>
            <Toaster position='bottom-center' />

            <h1>Edit Project</h1>

            <form onSubmit={handleSubmit}>
                {/* title */}
                <div className='input-container'>
                    <label htmlFor='title'>Title</label>
                    <input
                        className='project-title'
                        onChange={handleChange}
                        type='text'
                        id='title'
                        placeholder={project?.title}
                    />
                </div>

                {/* description */}
                <div className='input-container'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        className='description'
                        onChange={handleChange}
                        type='text'
                        id='description'
                        rows={6}
                        placeholder={project?.description}
                    />
                </div>

                {/* goal */}
                <div className='input-container'>
                    <label htmlFor='goal'>Goal</label>
                    <input
                        className='project-goal'
                        onChange={handleChange}
                        type='number'
                        id='goal'
                        placeholder={project?.goal}
                    />
                </div>

                {/* image */}
                <div className='input-container'>
                    <label htmlFor='image'>Image</label>
                    <input
                        className='project-image'
                        onChange={handleChange}
                        type='url'
                        id='image'
                        placeholder='URL to an image'
                    />
                </div>
                <div className='btn-container'>
                    <button className='green-btn' type='submit'>
                        Save Changes
                    </button>
                    <Link to='/account' className='green-btn'>
                        Discard
                    </Link>
                </div>
            </form>
        </section>
    );
};
export default EditProject;
