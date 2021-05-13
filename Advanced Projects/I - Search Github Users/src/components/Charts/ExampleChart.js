import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);



const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: 'column2d',
    width: 400,
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Linguagens usadas',
        subCaption: 'Em ordem ai',
        xAxisName: 'Linguagem',
        yAxisName: 'Porcentagem',
        numberSuffix: '%',
        theme: 'fusion',
      },
      data,
    },
  };

    return <ReactFC {...chartConfigs} />;
}

export default ChartComponent