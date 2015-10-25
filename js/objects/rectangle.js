/* 
    Created on : Oct 20, 2015, 11:31:20 AM
    Author     : Peter Nagy
    Description: Rectangle class  
*/

"use strict";

function Rectangle(ctx, height, width, xPos, yPos, color){
    var ctx = ctx;
    var height = height;
    var width = width;
    var xPos = xPos;
    var yPos = yPos;
    var color = color;
    
    function draw(){
        ctx.beginPath();
        ctx.rect(yPos, xPos, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    };
};
