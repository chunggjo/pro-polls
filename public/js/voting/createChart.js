const chartLabels = []
const chartValues = []

for (let i = 0; i < poll.options.length; i++) {
	chartLabels.push(poll.options[i].option)
	chartValues.push(
		poll.options[i].votes
	)
}

var chartData = {
	labels: chartLabels,
	datasets: [
		{
			label: '# of Votes',
			data: chartValues,
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(255, 20, 147, 0.2)',
				'rgba(0, 255, 0, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255, 20, 147, 1)',
				'rgba(0, 255, 0, 1)'
			],
			borderWidth: 1
		}
	]
}

const ctx = document.getElementById('pollChart')
const chartOptions = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					stepSize: 1
				}
			}
		]
	}
}

var pollChart = new Chart(ctx, {
	type: 'bar',
	data: chartData,
	options: chartOptions
})

// Changes Chart to specify input
document.getElementById('barButton').onclick = function() {
	if (pollChart.config.type !== 'bar') {
		pollChart.destroy()
		pollChart = new Chart(ctx, {
			type: 'bar',
			data: chartData,
			options: chartOptions
		})
	}
}

document.getElementById('pieButton').onclick = function() {
	if (pollChart.config.type !== 'pie') {
		pollChart.destroy()
		pollChart = new Chart(ctx, {
			type: 'pie',
			data: chartData
		})
	}
}

socketio.on('vote', data => {
	let options = data.options
	for (let i = 0; i < options.length; i++) {
		pollChart.data.datasets[0].data[i] = options[i].votes

	}
    pollChart.update()
})
