//using D3 to get json file
d3.json("static/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    console.log(data);
    var sampledata = data.samples[0].sample_values;
    //sorting values to from the dataset 
    sampledata = sampledata.slice(0,10)
    console.log(sampledata);

    var samplenames = data.samples[0].otu_ids;
    samplenames = samplenames.slice(0,10)
    var newnames = [];
    samplenames.forEach(function(name) {
        newnames.append(`OTU ${name}`);  
    });
    console.log(newnames);

    var trace1 = {
        x: sampledata,
        y: samplenames,
        //text: data.map(row => row.greekName),
        name: "Greek",
        type: "bar",
        orientation: "h"
      };
    
      // data
      var chartData = [trace1];
    
      // Apply the group bar mode to the layout
      var layout = {
        title: "Greek gods search results",
      };
    
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", chartData, layout);

});  
