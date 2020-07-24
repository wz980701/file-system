import React, { useEffect } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import echarts from 'echarts';
import api from 'helpers/api';

const HotRank = () => {
    useDocumentTitle('热度排行榜');

    useEffect(() => {
        api.getHotRank().then(res => {
            const list = res.hotRankList;
            const hotChart = echarts.init(document.getElementById('main') as HTMLDivElement);
            hotChart.setOption({
                title: {
                    text: '热度排行榜'
                },
                tooltip: {},
                legend: {
                    data: ['热度']
                },
                xAxis: {
                    data: list.map((item: any) => (item.fileName)),
                    axisLabel: {
                        formatter: function(value: string) {
                            var res = value;
                            if(res.length > 10) {
                                res = res.substring(0, 9) + "..";
                            }
                            return res;
                        }
                    }
                },
                yAxis: {},
                series: [{
                    name: '热度',
                    type: 'bar',
                    data: list.map((item: any) => (item.hotRate))
                }]
            })
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div id="main" style={{width: '100%', height: '100%'}}></div>
    )
}

export default HotRank;