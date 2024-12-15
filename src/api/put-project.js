async function putProject(
    title,
    description,
    goal,
    image,
    projectId,
    token,
    project
) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;

    const newTitle = title ? title : project.title;
    const newDescription = description ? description : project.description;
    const newGoal = goal ? goal : project.goal;
    const newImage = image ? image : project.image;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            goal: newGoal,
            image: newImage,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to edit project`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default putProject;
