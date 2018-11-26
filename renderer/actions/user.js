export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export function login() {
    return function(dispatch, getState) {
        dispatch({
            type: USER_LOGIN,
            user: {
                name: 'Paul',
                avatar: 'img/avatar/005.jpg'
            }
        });
    };
}

export function logout() {
    return {
        type: USER_LOGOUT
    };
}
