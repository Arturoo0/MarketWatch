import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'

const CandlestickCompanyView = (props) => {
    const options = {
        chart: {
            type: 'candlestick'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    };

    const shapePassedCandleData = (props) => {
        const {
            closePrice,
            highPrice,
            lowPrice,
            openPrice,
            responseStatus,
            timestamp,
            volume 
        } = props.candles.data.candles;
        let series = [];
        for (let pos = 0; pos < timestamp.length; pos++){
            series.push({
                x: new Date(timestamp[pos]),
                y: [openPrice[pos], lowPrice[pos], highPrice[pos], closePrice[pos]]
            });
        }
        return [{data: series}]
    };

    const renderCandles = () => {
        if (props.candles === null) return;
        const shapedData = shapePassedCandleData(props);
        return (
            <div>
                <Chart 
                    options={options} 
                    series={shapedData} 
                    type='candlestick' 
                    width={500} 
                    height={335} 
                /> 
            </div>
        );
    };
    
    return (
        <div>
            {renderCandles()}
        </div>
    );
};

export default CandlestickCompanyView;
