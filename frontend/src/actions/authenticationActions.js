import { get } from '../utils/baseRequest'

export function refreshAuthentication() {
    return async (dispatch) => {
        const response = await get('/auth/is-valid-session');
        const { isAuthenticated, userId } = response.data;
        dispatch({
            type: 'AUTHENTICATION_REFRESH',
            data: {
                isAuthenticated,
                userId,
            },
        });
    }
}
