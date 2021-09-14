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
            c,
            h,
            l,
            o,
            s,
            t,
            v
        } = props.candles.data.candles.res;
        let series = [];
        for (let pos = 0; pos < c.length; pos++){
            series.push({
                x: new Date(t[pos]),
                y: [o[pos], l[pos], h[pos], c[pos]]
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
                    height={320} 
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
