async function postPledge (supporter, amount, comment, project, token) {
    console.log(token)
    const url = `${import.meta.env.VITE_API_URL}/pledges/`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
            supporter: supporter,
            amount: amount,
            comment: comment,
            project: project,
            anonymous: false,
        }),
    });

    if(!response.ok) {
        const fallbackError = `Error trying to pledge`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }

    return await response.json()
}
export default postPledge