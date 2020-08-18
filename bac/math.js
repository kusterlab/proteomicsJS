
	var data = d3.layout.histogram().bins(xScale.ticks(numBins))(dataset);

	var bandwidth = 0.01;

	function kde(kernel, thresholds, data) {
		return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
	}
	function epanechnikov(bandwidth) {
		return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
	}
	var thresholds = xScale.ticks(numBins);
	density = kde(epanechnikov(bandwidth), thresholds, dataset);
	//	https://www.d3-graph-gallery.com/graph/density_basic.html
	// https://observablehq.com/@d3/kernel-density-estimation
	//	https://stats.stackexchange.com/questions/5819/kernel-density-estimate-takes-values-larger-than-1
	//	PDF can be > 1
	// estimate bandwith https://en.wikipedia.org/wiki/Kernel_density_estimation
	// which kernel https://www.bauer.uh.edu/rsusmel/phd/ec1-26.pdf


	function kernelDensityEstimator(kernel, X) {
		return function(V) {
			return X.map(function(x) {
				return [x, d3.mean(V, function(v) { return kernel(x - v); })];
			});
		};
	}
	function kernelEpanechnikov(k) {
		return function(v) {
			return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
		};
	}

	var kde1 = kernelDensityEstimator(kernelEpanechnikov(0.05), xScale.ticks(numBins))

	var density1 =  kde1( dataset )




	/* now update histogram bins to be cumulative to make cumulative histogram
	 *
	 * FYI: a cumulative histogram is a mapping that counts the cumulative number of
	 * observations in all of the bins up to the specified bin.
	 *
	 * The cumulative bin frequency pattern should roughly match the CDF line?
	 * Can compare with Python's Matplotlib cumulative histogram e.g.
	 * import matplotlib.pyplot as plt
	 * plt.hist(dataset, bins=(0,1,2,3,4,5,6,7,8,9), normed=True, cumulative=True)
	 * plt.title("Cumulative Histogram")
	 * plt.xlabel("Distance")
	 * plt.ylabel("Probability")
	 * plt.savefig("Cumulative Histogram.png", bbox_inches='tight')
	 */

	//for(var i = 1; i < data.length; i++){
	//	data[i].y += data[i-1].y;
	//}

	/* Calculative CDF using jStat - https://github.com/jstat/jstat
	 * We are replicating cumulative distribution/frequency line option that is
	 * available in Excel histograms
	 *
	 * Can validate CDF by calculating each percentile tick/unit (0.1-0.9 or 10-90th
	 * percentiles) against the dataset then comparing the resulting value against
	 * the matching value on the histogram. It should roughly match up if we are
	 * expecting Excel-like output. We can test this assertion by (1) loading same
	 * dataset used with Excel to here using d3.csv() and comparing histograms
	 * between the two, or (2) manually enter this sample dataset here into Excel to
	 * plot a histogram with CDF line then compare the two histograms.
	 */
	var jstat = this.jStat(dataset);
	for(var i=0; i < data.length; i++){
		data[i]['cum'] =  jstat.normal(jstat.mean(), jstat.stdev()).cdf(data[i].x);
	}



	var yhist = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d.y; })])
		.range([h, 0]);



	var yAxis = d3.svg.axis()
		.scale(yhist)
		.orient('left');
	data = data.map((el, i) => {
		el.ecdf = ys[i];
		el.x_more = dataset[i];
		return el;
	});

	var line = svg.append('path')
		.datum(data)
		.attr('d', guide)
		.attr('class', 'line');

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Count (Histogram)");

