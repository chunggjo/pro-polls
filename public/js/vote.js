const voteForm = document.querySelector('form')
const message = document.querySelector('#message')
const socketio = io()
//Labels and values meant for use in chart
const chartLabels = []
const chartValues = []
const voteOptions = document.getElementsByName('option')

voteForm.addEventListener('submit', e => {
	let selectedOption = ''

	e.preventDefault()

	for (let i = 0; i < voteOptions.length; i++) {
		if (voteOptions[i].checked) {
			selectedOption = voteOptions[i].value
		}
	}
	// Send patch request with selected option
	fetch('/polls/' + poll.id, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			option: selectedOption
		})
	}).then(response => {
		if (response.status === 200) {
			message.innerHTML =
				'Thanks for voting! <img src="../img/feelsgoodman.png" width="25px">'
			$('#voteButton').hide()
		} else if (response.status === 400) {
			message.textContent = "You've already voted on this poll"
			$('#voteButton').hide()
		}
		response.json().then(data => {
			// Send updated options to server
			socketio.emit('vote', {
				options: data.options,
				totalVotes: data.totalVotes
			})
		})
	})
})

// Loop to create arrays for labels and their values
for (let i = 0; i < voteOptions.length; i++) {
	chartLabels.push(voteOptions[i].value)
	chartValues.push(
		document.getElementById(voteOptions[i].value + '-votes').textContent
	)
}

// START GRAPH SECTION
const ctx = document.getElementById('pollChart').getContext('2d')
const pollChart = new Chart(ctx, {
	type: 'bar',
	data: {
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
	},
	options: {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		}
	}
})
// END GRAPH SECTION

socketio.on('vote', data => {
	let options = data.options
	for (let i = 0; i < options.length; i++) {
		document.getElementById(options[i].option + '-votes').textContent =
			options[i].votes
		pollChart.data.datasets[0].data[i] = options[i].votes
	}
	pollChart.update()
	document.querySelector('#totalVotes').textContent = data.totalVotes
})

socketio.emit('join', poll.id)
