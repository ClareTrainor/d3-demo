/* 575 d3 main.js */

//execute script when window is loaded
window.onload = function(){
    var w = 900, h = 500;
    //like jquery where we select something on the page and do something to it
    //this creates an empty array for us
    var container = d3.select("body")
    //this puts an svg into the body
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      //give something the same class name as the variable name (so class name is container)
      //only add a semicolon after we make all of our appends to the container
      .attr("class", "container");

    var rectangle = container.append("rect")
      .datum(400)
      .attr("width", function(d){//this is the pass of the datum)
        return d * 2
      })
      .attr("height", function(d){ //rectangle height
            return d;
      })
      .attr("class", "rectangle")
      .attr("x", 50) //position from left on the x (horizontal) axis
      .attr("y", 50); //position from top on the y (vertical) axis

      var cityPop = [
             {
                 city: 'Fresno',
                 population: 515986
             },
             {
                 city: 'Sacramento',
                 population: 485199
             },
             {
                 city: 'San Francisco',
                 population: 852469
             },
             {
                 city: 'San Jose',
                 population: 1015785
             }
         ];

   //find the minimum value of the array
   var minPop = d3.min(cityPop, function(d){
       return d.population;
   });

   //find the maximum value of the array
   var maxPop = d3.max(cityPop, function(d){
       return d.population;
   });

   //scale for circles center y coordinate
   var y = d3.scale.linear()
       .range([450, 50])
       .domain([0, 1400000]);

   //color scale generator
   var color = d3.scale.linear()
       .range([
           "#FDBE85",
           "#D94701"
       ])
       .domain([
           minPop,
           maxPop
       ]);

    var x = d3.scale.linear() //create the scale
      .range([100, 710]) //output min and max
      .domain([0, 3.1]) //input min and max

    var circles = container.selectAll(".circles") //but wait--there are no circles yet!
      .data(cityPop) //here we feed in an array
      .enter() //one of the great mysteries of the universe
      .append("circle") //add a circle for each datum
      .attr("class", "circles") //apply a class name to all circles
      .attr("id", function(d){
          return d.city;
      })
      .attr("r", function(d){
          //calculate the radius based on population value as circle area
          var area = d.population * 0.01;
          return Math.sqrt(area/Math.PI);
      })
      .attr("cx", function(d, i){
          //use the index to place each circle horizontally
          return x(i);
      })
      .attr("cy", function(d){
          //subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG
          return y(d.population);
      })
      .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
      })
      .style("stroke", "#000"); //black circle stroke

      //creates a y axis generator
      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        //create axis g element and add axis
      var axis = container.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(50, 0)")
          .call(yAxis);

      var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");

      var labels = container.selectAll(".labels")
         .data(cityPop)
         .enter()
         .append("text")
         .attr("class", "labels")
         .attr("text-anchor", "left")
         .attr("x", function(d,i){
             //horizontal position to the right of each circle
             return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
         })
         .attr("y", function(d){
             //vertical position centered on each circle
             return y(d.population) ;
         });

         //first line of label
       var nameLine = labels.append("tspan")
           .attr("class", "nameLine")
           .attr("x", function(d,i){
               //horizontal position to the right of each circle
               return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
           })
           .text(function(d){
               return d.city;
           });

       //create format generator
       var format = d3.format(",");

       //second line of label
       var popLine = labels.append("tspan")
           .attr("class", "popLine")
           .attr("x", function(d,i){
               //horizontal position to the right of each circle
               return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
           })
           .attr("dy", "17") //vertical offset
           .text(function(d){
               return "Pop. " + format(d.population);
           });


};
