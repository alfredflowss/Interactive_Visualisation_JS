//using D3 to get json file
d3.json("static/data/samples.json").then((importeddata)=> {
    var data = importeddata;
    console.log(data);
    

});