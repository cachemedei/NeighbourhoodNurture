import './styles/NewProjectForm.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';

import z from 'zod';

import postNewProject from '../api/post-project';

const NewProjectForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    // zod schema
    const createProjectSchema = z.object({
        title: z.string().min(1, { message: 'Please enter a title' }),
        description: z
            .string()
            .min(5, { message: 'Please give your project more description' }),
        goal: z.string().min(1, { message: 'Please enter a valid number' }),
        image: z.string().min(1, { message: 'Please provide a valid URL' }),
    });

    // state for new project
    const [projectDetails, setProjectDetails] = useState({
        title: '',
        description: '',
        goal: 0,
        image: '',
    });

    // checks for file or value
    const handleChange = (e) => {
        const { id, value } = e.target;

        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
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
                    : alert('please log in to create a project');
            } catch (error) {
                console.error('Error creating project: ', error);
                console.log('oopsies');
            }
        }
    };

//image url:
//https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png

    return (
        <section className='new-project-form'>
            <h1>Create Your Own Project</h1>
            <form onSubmit={handleSubmit}>
                {/* title */}
                <div className='input-container'>
                    <label htmlFor='title'>Project Title:</label>
                    <input onChange={handleChange} id='title' type='text' />
                </div>

                {/* description */}
                <div className='input-container'>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        onChange={handleChange}
                        name='description'
                        id='description'
                        rows='4'
                        placeholder='Please enter a detailed description of your project'
                    ></textarea>
                </div>

                {/* goal */}
                <div className='input-container'>
                    <label htmlFor='goal'>Goal:</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        placeholder='$'
                        id='goal'
                    />
                </div>

                {/* image */}
                <div className='input-container'>
                    <label htmlFor='image'>Image:</label>
                    <input
                        onChange={handleChange}
                        id='image'
                        type='url'
                        accept='image/*'
                    />
                </div>

                {/* is active */}
                <div className='input-cb'>
                    <label htmlFor='isActive'>Active</label>
                    <input
                        onChange={handleChange}
                        id='isActive'
                        type='checkbox'
                        defaultChecked='true'
                    />
                </div>
                <button type='submit'>Create Project</button>
            </form>
        </section>
    );
};
export default NewProjectForm;
