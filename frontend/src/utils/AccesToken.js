import jwt_decode from 'jwt-decode';


export function getAccessTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("user=")) {
            const userCookie = decodeURIComponent(cookie.substring("user=".length, cookie.length));
            try {
                const user = JSON.parse(userCookie);
                return user.token.accessToken ? user.token.accessToken : null;
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                return null;
            }
        }
    }
    return null;
}



export function getUserRoles() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("user=")) {
            try {
                const userCookie = decodeURIComponent(cookie.substring("user=".length));
                const user = JSON.parse(userCookie);

                if (user && user.token && user.token.accessToken) {
                    const decodedToken = jwt_decode(user.token.accessToken);


                    if (decodedToken && decodedToken.userId && decodedToken.userId.role) {
                        return decodedToken.userId.role;
                    } else {
                        return null; 
                    }
                } else {
                    return null; 
                }
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                return null;
            }
        }
    }

    return null; 
}
