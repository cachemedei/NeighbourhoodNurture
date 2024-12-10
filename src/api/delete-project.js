async function deleteProject(projectId, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: projectId,
        })
    });

    if (!response.ok) {
        const fallbackError = `Error trying to delete project with id ${projectId}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default deleteProject;
