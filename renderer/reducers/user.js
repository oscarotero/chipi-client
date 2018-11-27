import { USER_LOGGING, USER_LOGGED, USER_LOGOUT } from '../actions/user.js';

export function user(state = null, action) {
    switch (action.type) {
        case USER_LOGGED:
        return action.user;
        
        case USER_LOGGING:
        case USER_LOGOUT:
            return null;

        default:
            return state;
    }
}
