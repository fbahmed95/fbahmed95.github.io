const getWeatherGraphURL = (time_arr, data_arr) => {
    const chart = new QuickChart();

    chart.setWidth(250)
    chart.setHeight(150);
    
    chart.setConfig({
        type: 'line',
        data: {
          labels: time_arr,
          datasets: [{
            data: data_arr,
            fill: false,
            borderColor: '#000000',
            borderWidth: 5,
            pointRadius: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }]
        },
        options: {
            title: {    
                display: true,
                text: 'Weather'
            },

          legend: {
            display: false
          },
          scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    callback: (val, index) => {
                      return index % 2 === 0 ? val : undefined;
                    },
                },     
                gridLines: {
                    display: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature',
                }
            }]
        },
        }
    });
    
    // return the chart URL
    return chart.getUrl();
    
}