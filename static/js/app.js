//using D3 to get json file
d3.json("static/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    console.log(data);
    var sampledata = data.samples[0].sample_values;
    
    //sorting values to from the dataset 
    var slicedsampledata = sampledata.slice(0,10)
    console.log(sampledata);

    var samplenames = data.samples[0].otu_ids;
    var slicedsamplenames = samplenames.slice(0,10)
    

    var labels = data.samples[0].otu_labels;
    

    var newnames = [];
    slicedsamplenames.forEach(function(name) {
        newnames.push(`OTU ${name}`);  
    });


    console.log(newnames);
    // d3.select("selDataset").text = "test"
    newnames = newnames.reverse();
    slicedsampledata = slicedsampledata.reverse();

    
    var trace1 = {
        x: slicedsampledata,
        y: newnames,
        //text: data.map(row => row.greekName),
        name: "Greek",
        type: "bar",
        orientation: "h"
      };
    
      // data
      var chartData = [trace1];
    
      // Apply the group bar mode to the layout
      var layout = {
        title: "Top OTU Present in Belly Button",
      };
    
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", chartData, layout);

      var trace1 = {
        x: samplenames,
        y: sampledata,
        text : labels,
        mode: 'markers',
        marker: { color: samplenames,
          size: sampledata
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Bubble chart',
        showlegend: false,
        // height: 600,
        // width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);

      var list = d3.select("#sample-metadata");
      list.append("ul");
      data.metadata[0].entries(item).forEach(function([Key,value]) {
        var new_val = list.append("li");
        new_val.text(`${key}:${value}`);


        
      });
      

});  
