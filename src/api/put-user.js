async function putUser(userId, token, fName, lName, email, username, password) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name: fName,
            last_name: lName,
            email: email,
            username: username,
            password: password,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to sign up`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default putUser;
