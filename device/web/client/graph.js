var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%I:%M:%S %p");

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(+d.temperature); });

d3.json("http://localhost:5000/api/ProbeReading/Session/1/interval/7", function(error, data) {
  if (error) throw error;

    var probes = data.map(function(item) {
        return item.probeId;
    }).filter(function(value, index, self) {
        return self.indexOf(value) === index
    });

    console.log(probes);

    // Shape the data for the graph
    var probeData = probes.map(function(p) {
        return {
            probeId: p,
            readings: data.filter(function(x) {
                return x.probeId === p;
            }).map(function(d) {
                return { date: parseTime(d.readingTime), unparsedDate: d.readingTime, temperature: +d.temperature };
            })
        };
    });

  console.log(probeData);

  x.domain(d3.extent(probeData[0].readings, function(d) { return d.date; }));

  y.domain([
    d3.min(probeData, function(c) { return d3.min(c.readings, function(d) { return d.temperature; }); }),
    d3.max(probeData, function(c) { return d3.max(c.readings, function(d) { return d.temperature; }); })
  ]);

   z.domain(probes.map(function(c) { return c; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Temperature, ºF");

  var probe = g.selectAll(".reading")
    .data(probeData)
    .enter().append("g")
      .attr("class", "reading");

  probe.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.readings); })
      .style("stroke", function(d) { return z(d.probeId); });

  probe.append("text")
      .datum(function(d) { return {probeId: d.probeId, readings: d.readings[d.readings.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.readings.date) + "," + y(d.readings.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.probeId; });
});