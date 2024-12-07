import './styles/NewProjectForm.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';

import z from 'zod';

import postNewProject from '../api/post-project';

const NewProjectForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const [projectDetails, setProjectDetails] = useState({
        title: '',
        description: '',
        goal: '',
        image: null,
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
        image: z.instanceof(File).optional(),
    });

    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        if (type === 'file') {
            setProjectDetails((prev) => ({
                ...prev,
                [id]: files[0],
            }));
        } else {
            setProjectDetails((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = createProjectSchema.safeParse(projectDetails);

        if (!result.success) {
            const error = result.error.errors?.[0]?.message;
            if (error) {
                alert(error);
            }
            return;
        }
        try {
            const projectData = new FormData();
            projectData.append('title', result.data.title);
            projectData.append('description', result.data.description);
            projectData.append('goal', result.data.goal);
            projectData.append('is_open', true);
            if (result.data.image) {
                projectData.append('image', result.data.image);
            }
            await postNewProject(projectData);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    // const createProjectSchema = z.object({
    //     title: z.string().min(1, { message: 'Please enter a title' }),
    //     description: z
    //         .string()
    //         .min(5, { message: 'Please give your project more description' }),
    //     goal: z.string().min(1, { message: 'Please enter a valid number' }),
    //     image: z.instanceof(File).optional(),
    // });

    // // state for new project
    // const [projectDetails, setProjectDetails] = useState({
    //     title: '',
    //     description: '',
    //     goal: 0,
    //     image: null,
    // });

    // // checks for file or value
    // const handleChange = (e) => {
    //     const { id, value, type, files } = e.target;
    //     if (type === 'file') {
    //         setProjectDetails((prevProjectDetails) => ({
    //             ...prevProjectDetails,
    //             [id]: files[0],
    //         }));
    //     } else {
    //         setProjectDetails((prevProjectDetails) => ({
    //             ...prevProjectDetails,
    //             [id]: value,
    //         }));
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = createProjectSchema.safeParse(projectDetails);

    //     if (!result.success) {
    //         const error = result.error.errors?.[0];
    //         if (error) {
    //             alert(error.message);
    //         }
    //         return;
    //     } else {
    //         try {
    //             auth.token
    //                 ? await postNewProject(
    //                       result.data.title,
    //                       result.data.description,
    //                       result.data.goal,
    //                       result.data.image,
    //                       auth.token
    //                   )
    //                 : alert('please log in to create a project');
    //         } catch (error) {
    //             console.error('Error creating project: ', error);
    //             console.log(result)
    //             console.log('oopsies');
    //         }
    //     }
    // };

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
                        value={projectDetails.description}
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
                        value={projectDetails.goal}
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
                        type='file'
                        accept='image/*'
                    />
                </div>

                <button type='submit'>Create Project</button>
            </form>
        </section>
    );
};
export default NewProjectForm;

//         try {
//             const formData = new FormData();
//             formData.append('title', result.data.title);
//             formData.append('description', result.data.description);
//             formData.append('goal', result.data.goal);
//             if (result.data.image) {
//                 formData.append('image', result.data.image);
//             }
//             console.log('FormData entries:');
//             await postNewProject(formData);
//             navigate('/');
//         } catch (error) {
//             alert(error.message);
//         }
//     };
// }
