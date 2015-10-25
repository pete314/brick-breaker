/* 
    Created on : Oct 20, 2015, 11:31:20 AM
    Author     : Peter Nagy
    Description: Brick && Bricks object
*/

'use strict';

function Brick(ctx, height, width, xPos, yPos, color){
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
    
    this.draw = function(){
        ctx.beginPath();
        ctx.rect(yPos, xPos, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        //ctx.lineWidth = 7;
        //ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

//holding the bricks as an object
function Bricks(){
    this.bricks = Array();
    
    this.init = function(){
        //constants
        var BRICK_CONSTANTS = {width: 65, height: 20, gap: 10};

        //calculate bricks per row based on dinamic width (remove 10pc margin both sides)
        var column_cnt =  Math.floor((window.innerWidth - 20) / (BRICK_CONSTANTS.width + (BRICK_CONSTANTS.gap / 2)));
        
        //var bricks = Array();
        for(var y = 0; y < 5; y++){
            for(var i = 0; i < column_cnt; i++){
                var brick = new Brick(
                    ctx, 
                    BRICK_CONSTANTS.height,
                    BRICK_CONSTANTS.width,
                    y == 0 ? 0 : y * (BRICK_CONSTANTS.height + (BRICK_CONSTANTS.gap /2)),
                    i == 0 ? 0 : i * (BRICK_CONSTANTS.width + (BRICK_CONSTANTS.gap /2)),
                    "yellow"
                );
                brick.draw();
                this.bricks.push(brick);
            }
        }
        
        return bricks;
    }
    
    this.redrawBricks = function(){
        for(var key in this.bricks){
            var brick =this. bricks[key];
            brick.draw();
        }
    }
}