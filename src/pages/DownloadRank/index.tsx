import React, { useEffect } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import echarts from 'echarts';
import api from 'helpers/api';

const DownloadRank = () => {
    useDocumentTitle('下载排行榜');
    useEffect(() => {
        api.getDownloadRank().then(res => {
            const list = res.downloadRankList;
            const downloadChart = echarts.init(document.getElementById('main') as HTMLDivElement);
            downloadChart.setOption({
                title: {
                    text: '下载排行榜'
                },
                tooltip: {},
                legend: {
                    data: ['下载量']
                },
                xAxis: {
                    data: list.map((item: any) => (item.fileName)),
                    axisLabel: {
                        formatter: function (value: string) {
                            var res = value;
                            if (res.length > 10) {
                                res = res.substring(0, 9) + "..";
                            }
                            return res;
                        }
                    }
                },
                yAxis: {},
                series: [{
                    name: '下载量',
                    type: 'bar',
                    data: list.map((item: any) => (item.downloadAmount))
                }]
            })
        }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <div id="main" style={{ width: '100%', height: '100%' }}></div>
    )
}

export default DownloadRank;