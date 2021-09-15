import { get } from '../utils/baseRequest.js';

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
