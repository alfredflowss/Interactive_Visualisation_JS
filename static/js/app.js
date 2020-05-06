//using D3 to get json file
function plotcharts(otuname) {
d3.json("static/samples.json").then((importedData) => {
    // console.log(importedData);
    for (var i = 0; i < importedData.samples.length; i++) {
      if (importedData.samples[i].id == otuname) {
        var data = importedData;
        console.log(data);

        var sampledata = data.samples[i].sample_values;
        
        //sorting values to from the dataset 
        var slicedsampledata = sampledata.slice(0,10)
        console.log(sampledata);

        var samplenames = data.samples[i].otu_ids;
        var slicedsamplenames = samplenames.slice(0,10)
        

        var labels = data.samples[i].otu_labels;
        

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
          //d3.select("bar") = "";
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
          
          //d3.select("bubble") = "";
          Plotly.newPlot('bubble', data, layout);

          var list = d3.select("#sample-metadata");
          
          

      };
      };
      });
};
function demographics(otuname) {

  var demographic_info = d3.select(`#sample-metadata`)
  d3.json("static/samples.json").then((importedData) => {
  for (var i = 0; i < importedData.metadata.length; i++) {
    if (importedData.metadata[i].id == otuname) {
    demographic_info.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
        Object.entries(importedData.metadata[i]).forEach(function([key,value]){
          var row = demographic_info.append("p");
          row.text(`${key}:${value}`)
        })
    }; 
  };
  });
};

function init() {
  //getting default input 
  var input_value = d3.select("#selDataset");

  d3.json("static/samples.json").then((importedData) => {
    importedData.names.forEach((otu) => {
     input_value
     .append("option")
     .text(otu)
     .property("value", otu);
     
    });
  });

};
function optionChanged(otuname) {
  // Fetch new data each time a new sample is selected
  plotcharts(otuname);
  //console.log(otuname);
  demographics(otuname);
}
// var otuname = 940
//demographics(otuname);
init()
