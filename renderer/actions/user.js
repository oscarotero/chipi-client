export const USER_LOGGED = 'USER_LOGGED';
export const USER_LOGGING = 'USER_LOGGING';
export const USER_LOGOUT = 'USER_LOGOUT';

export function login() {
    return function(dispatch) {
        dispatch({
            type: USER_LOGGING
        });

        setTimeout(
            () =>
                dispatch({
                    type: USER_LOGGED,
                    user: {
                        name: 'Paul',
                        avatar: 'img/avatar/005.jpg'
                    }
                }),
            1000
        );
    };
}

export function logout() {
    return {
        type: USER_LOGOUT
    };
}
