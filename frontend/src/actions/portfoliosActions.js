import { get } from '../utils/baseRequest.js';

export function getPortfolios() {
    return async (dispatch) => {
        const { data } = await get('/users/me/portfolios');
        dispatch({
            type: 'REFRESH_PORTFOLIOS',
            data: {
                portfolios: data.portfolios,
            },
        });    
    }
}
