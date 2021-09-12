
const appDefaultState = {
    checkingAuthentication: true,
    isAuthenticated: false,
};

function appReducer(state = appDefaultState, action) {
    switch (action.type) {
        case 'SET_AUTHENTICATED':
          return {
            ...state,
            isAuthenticated: action.data.isAuthenticated,
            checkingAuthentication: false,
          };
        default:
          return { ...state, isAuthenticated: false };
    }
}

export default appReducer;
