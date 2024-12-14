import './styles/NewProjectForm.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';

import z from 'zod';

import postNewProject from '../api/post-project';

const NewProjectForm = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [projectDetails, setProjectDetails] = useState({
        title: '',
        description: '',
        goal: '',
        image: '',
    });

    const createProjectSchema = z.object({
        title: z
            .string()
            .min(1, { message: 'Please give your project a title' }),
        description: z
            .string()
            .min(10, { message: 'Give your project a good description' }),
        goal: z
            .string()
            .min(1, { message: 'Please provide a goal for your project' }),
        image: z.string().url(),
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProjectDetails((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = createProjectSchema.safeParse(projectDetails);

        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                alert(error.message);
            }
            return;
        } else {
            try {
                auth.token
                    ? await postNewProject(
                          result.data.title,
                          result.data.description,
                          result.data.goal,
                          result.data.image,
                          auth.token
                      )
                    : alert('Please log in to create a project');
                navigate('/');
            } catch (error) {
                console.error('Error creating project: ', error);
            }
        }
    };

    return (
        <section className='new-project'>
            <h1 className='title'>Create Your Own Project</h1>
            <form onSubmit={handleSubmit}>
                {/* title */}
                <div className='input-container'>
                    <label htmlFor='title'>Project Title</label>
                    <input onChange={handleChange} id='title' type='text' />
                </div>

                {/* description */}
                <div className='input-container'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        onChange={handleChange}
                        name='description'
                        id='description'
                        value={projectDetails.description}
                        rows='8'
                        placeholder='Please enter a detailed description of your project'
                    ></textarea>
                </div>

                {/* goal */}
                <div className='input-container'>
                    <label htmlFor='goal'>Goal</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        value={projectDetails.goal}
                        placeholder='$'
                        id='goal'
                    />
                </div>

                {/* image */}
                <div className='input-container'>
                    <label htmlFor='image'>Image</label>
                    <input
                        onChange={handleChange}
                        value={projectDetails.image}
                        id='image'
                        type='url'
                        placeholder='URL to an image'
                    />
                </div>
                <div className='btn-container'>
                    <button className='green-btn' type='submit'>
                        Create Project
                    </button>
                </div>
            </form>

            {/* URL */}
            <div className='url-container'>
                <p>Placeholder URL</p>
                <p>
                    https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png
                </p>
            </div>
        </section>
    );
};
export default NewProjectForm;
