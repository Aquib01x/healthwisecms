const requestPasswordReset = async (email) => {
    try {
        const response = await fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/user/request-password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to request password reset.');
        }

        return await response.json();
    } catch (error) {
     
        throw error;
    }
};

export default requestPasswordReset;