window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "My First Chart in CanvasJS"
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "spline",
			dataPoints: [
				{ label: "day 1",  y: 7500  },
				{ label: "day 2", y: 1500  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
			]
		}
		]
	});
	chart.render();
}