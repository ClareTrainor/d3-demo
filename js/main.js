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
      .attr("y", 50) //position from top on the y (vertical) axis
};
