var barchart_url="http://127.0.0.1:5000/get_bar_chart_data/"

async function getJson(dataUrl){
    var response = await fetch(dataUrl,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true 
        }
    });
    return await response.json();
}


        
async function drawBarChart(country_name){

    var margin1 = {top: -40, right: 60, bottom: 0, left: 60},
    width1 = 800 - margin1.left - margin1.right,
    height1 = 500 - margin1.top - margin1.bottom;

var svg1 = d3.select("body")
    .append("svg")
    .attr("width", width1)
    .attr("height", height1)
    .attr("transform", "translate(10,20)")
    .attr("class","barchart");


    chart_url=barchart_url+country_name;
    console.log(chart_url);
    var bar_data=await getJson(chart_url);

    columns=["GDP per capita","Social support","Healthy life expectancy","Freedom to make life choices","Generosity",
    "Perceptions of corruption","Percentage","percentage_non_religious"]

    for (let index = 0; index < 8; index++) {
        const element = bar_data[0][columns[index]];
        console.log(element)
        
    }

    var x = d3.scaleLinear()
            .range([0, width1])
            .domain([0, 100]);

    var y = d3.scaleBand()
        .rangeRound([height1, 0])
        .padding(0.1)
        .domain(columns);

        //make y axis to show bar names
        var yAxis = d3.axisLeft(y)
            //no tick marks
            .tickSize(0);

        var gy = svg1.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .attr("transform", "translate(80,0)")
            .selectAll(".tick text")
            .call(wrap, y.bandwidth());

        console.log("---")
        console.log(y.bandwidth())

        var bars = svg1.selectAll(".bar")
            .data(columns)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d, i) {
                // console.log(columns[i])
                return y(columns[i]);
            })
            .attr("height", y.bandwidth())
            .attr("x", 80)
            .attr("width", function (d, i) {
                // console.log(bar_data[0][columns[i]])
                if (columns[i]=='Percentage' || columns[i]=='percentage_non_religious' || columns[i]=="GDP per capita"){
                    return x(bar_data[0][columns[i]]);
                }
                else
                    return x(bar_data[0][columns[i]])*100;
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d,i) {
                return y(columns[i]) + y.bandwidth() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d,i) {
                if (columns[i]=='Percentage' || columns[i]=='percentage_non_religious' || columns[i]=="GDP per capita"){
                    return x(bar_data[0][columns[i]])+30;
                }
                else
                    return x(bar_data[0][columns[i]])*100 + 30;
            })
            .text(function (d, i) {
                if (columns[i]=='Percentage' || columns[i]=='percentage_non_religious' || columns[i]=="GDP per capita"){
                    console.log('***');
                    console.log(bar_data[0][columns[i]]);
                    return (bar_data[0][columns[i]]);
                }
                else
                    return (bar_data[0][columns[i]])*100;
            })
            .attr('fill','white');

    // console.log("barchart");
    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
            }
        });
        }

}