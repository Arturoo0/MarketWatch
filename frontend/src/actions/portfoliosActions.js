import { get, post } from '../utils/baseRequest.js';

export function getPortfolios(userId) {
    return async (dispatch) => {
        const response = await get(`/users/${userId}/portfolios`);
        const { portfolios } = response.data;
        dispatch({
            type: 'REFRESH_PORTFOLIOS',
            data: {
                portfolios,
            },
        });    
    }
}

export function createPortfolio(userId, portfolioCreationData) {
    return async (dispatch) => {
        const response = await post(`/users/${userId}/portfolios`, portfolioCreationData);
        const { portfolio } = response.data;
        dispatch({
            type: 'CREATE_PORTFOLIO',
            data: {
                portfolio,
            },
        });    
    }
}
