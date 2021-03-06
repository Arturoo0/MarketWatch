import { useEffect, useState } from 'react';
import { PageSpinner, AddPortfolioForm } from '../components';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPortfolio, getPortfolios } from '../actions/portfoliosActions.js';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const controlContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1rem 0 1rem 0',
};

const Portfolios = () => {
    const dispatch = useDispatch();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        name: '',
        description: '',
        access: 'private',
    });
    const portfolios = useSelector(state => state.portfolios);
    const userId = useSelector(state => state.app.userId);

    useEffect(() => {
        dispatch(getPortfolios(userId));
    }, [userId, dispatch]);

    const openCreateModal = () => setShowCreateModal(true);
    const closeCreateModal = () => setShowCreateModal(false);

    const truncateString = (string, max) => string.length > max
        ? string.substring(0, max) + '...'
        : string

    function renderPortfolios() {
        if (portfolios.length === 0) {
            return <PageSpinner />;
        }
        const currentPortfolios = [...portfolios];
        currentPortfolios.sort((portfolioA, portfolioB) => portfolioB.lastEditedDate - portfolioA.lastEditedDate);
        const portfolioList = currentPortfolios.map((portfolio) => {
            return (
                <a key={portfolio._id} className='list-group-item list-group-item-action flex-column align-items-start'>
                    <div className='d-flex w-100 justify-content-between'>
                        <h4 className='mb-1'>{truncateString(portfolio.name, 30)}</h4>
                        <small>Last Edited: {timeAgo.format(portfolio.lastEditedDate)}</small>
                    </div>
                    {portfolio.description && <small className='mb-1'>{truncateString(portfolio.description, 60)}</small>}
                </a>
            );
        });

        return <ul className='list-group'>{portfolioList}</ul>;
    }

    function baseOnChangeCreatePortfolio(newData) {
        setCreateFormData({
            ...createFormData,
            ...newData,
        });
    }

    const onChangePortfolioName = (e) => baseOnChangeCreatePortfolio({ name: e.target.value });
    const onChangePortfolioDescription = (e) => baseOnChangeCreatePortfolio({ description: e.target.value });
    const onChangePortfolioAccess = (e) => baseOnChangeCreatePortfolio({ access: e.target.value });

    const createPortfolioOnClick = () => {
        dispatch(createPortfolio(userId, createFormData));
        closeCreateModal();
    }

    return (
        <div style={{ margin: '1rem', padding: '1rem' }}>
            <h2>Your Portfolios</h2>
            <div style={controlContainerStyle}>
                <Button variant='success' onClick={openCreateModal}>Create portfolio</Button>
            </div>
            {renderPortfolios()}
            <AddPortfolioForm config={{
                'showCreateModal': showCreateModal,
                'closeCreateModal': closeCreateModal,
                'onChangePortfolioName': onChangePortfolioName, 
                'onChangePortfolioDescription': onChangePortfolioDescription,
                'onChangePortfolioAccess': onChangePortfolioAccess,
                'createPortfolioOnClick': createPortfolioOnClick 
            }}/>
        </div>
    );
}

export default Portfolios;
