
const appDefaultState = {
    checkingAuthentication: true,
    isAuthenticated: false,
    userId: null,
};

function appReducer(state = appDefaultState, action) {
    switch (action.type) {
        case 'AUTHENTICATION_REFRESH':
            const { isAuthenticated, userId } = action.data;
            return {
                isAuthenticated,
                userId,
                checkingAuthentication: false,
            };
        default:
            return state
    }
}

export default appReducer;
