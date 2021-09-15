import { useEffect } from 'react';
import { PageSpinner } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolios } from '../actions/portfoliosActions.js';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const Portfolios = () => {
    const dispatch = useDispatch();
    const portfolios = useSelector(state => state.portfolios);

    useEffect(() => {
        getPortfolios(dispatch);
    }, [dispatch]);

    function renderPortfolios() {
        if (portfolios.length === 0) {
            return <PageSpinner />;
        }

        const portfolioList = portfolios.map((portfolio) => {
            return (
                <a key={portfolio._id} className='list-group-item list-group-item-action flex-column align-items-start'>
                    <div className='d-flex w-100 justify-content-between'>
                        <h5 className='mb-1'>{portfolio.name}</h5>
                        <small>Last Edited: {timeAgo.format(portfolio.lastEditedDate)}</small>
                    </div>
                    {portfolio.description && <p className='mb-1'>{portfolio.description}</p>}
                </a>
            );
        });

        return <ul className='list-group'>{portfolioList}</ul>;
    }

    return (
        <div style={{ margin: '1rem', padding: '1rem' }}>
            <h2>Your Portfolios</h2>
            {renderPortfolios()}
        </div>
    );
}

export default Portfolios
