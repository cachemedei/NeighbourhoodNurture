async function postProject(title, description, goal, isActive) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            goal: goal,
            isActive: isActive,
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

export default postProject;
