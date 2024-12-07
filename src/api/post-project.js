async function postNewProject(title, description, goal, image) {
    const token = window.localStorage.getItem('token');

    const url = `${import.meta.env.VITE_API_URL}/projects/`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            goal: goal,
            image: image,
            is_open: true,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create project`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postNewProject;
