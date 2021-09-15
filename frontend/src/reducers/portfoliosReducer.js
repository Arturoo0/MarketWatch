const portfoliosDefaultState = [];

function portfoliosReducer(state = portfoliosDefaultState, action) {
    switch (action.type) {
        case 'REFRESH_PORTFOLIOS':
            return [...action.data.portfolios];
        default:
            return state;
    }
}

export default portfoliosReducer;
