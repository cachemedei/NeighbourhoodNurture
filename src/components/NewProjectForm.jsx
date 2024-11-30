import { useNavigate } from 'react-router-dom';
import postProject from '../api/post-project';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';

const NewProjectForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const [projectDetails, setProjectDetails] = useState({
        title: '',
        description: '',
        goal: null,
        image: '',
        isActive: true,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(projectDetails)
    };

    return (
        <section>
            <h1>Create Your Own Project</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor=''>Project Title:</label>
                    <input onChange={handleChange} type='text' />
                </div>
                <div>
                    <label htmlFor=''>Description:</label>
                    <input onChange={handleChange} type='text' name='' id='' />
                </div>
                <div>
                    <label htmlFor=''>Goal:</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        placeholder='$'
                    />
                </div>
                <div>
                    <label htmlFor=''>Image:</label>
                    <input onChange={handleChange} type='text' />
                </div>
                <div>
                    <label htmlFor=''>Active</label>
                    <input onChange={handleChange} type='checkbox' />
                </div>
                <button type='submit'>Create Project</button>
            </form>
        </section>
    );
};
export default NewProjectForm;
