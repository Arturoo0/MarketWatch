const portfoliosDefaultState = [];

function portfoliosReducer(state = portfoliosDefaultState, action) {
    switch (action.type) {
        case 'REFRESH_PORTFOLIOS':
            return action.data.portfolios;
        case 'CREATE_PORTFOLIO':
            return [...state, action.data.portfolio];
        default:
            return state;
    }
}

export default portfoliosReducer;
