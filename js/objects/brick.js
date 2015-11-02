/* 
    Created on : Oct 20, 2015, 11:31:20 AM
    Author     : Peter Nagy
    Description: Brick && Bricks object
*/

'use strict';

function Brick(ctx, height, width, xPos, yPos, color, id){
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
    this.id = id;
    
    this.draw = function(){
        ctx.beginPath();
        ctx.rect(yPos, xPos, width, height);
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.lineWidth = 7;
        //ctx.strokeStyle = 'black';
        ctx.stroke();
    };
    
    this.setColor = function(color){
        console.log(color);
        this.color = color;
    };
    
    this.getBrickXpos = function(){
        return this.xPos;
    };
    
    this.getBrickYpos = function(){
        return this.yPos;
    };
    
}

//holding the bricks as an object
function Bricks(ctx){
    this.ctx = ctx;
    this.bricks = [];
    
    this.init = function(){
        var brick_id_cnt = 0;
        var brick_skip_cnt = 0;
        //constants
        var BRICK_CONSTANTS = {width: 65, height: 65, gap: 10, min_skip: 1, max_skip: 8};

        //calculate bricks per row based on dinamic width (remove 10pc margin both sides)
        var column_cnt =  Math.floor((this.ctx.canvas.width - 20) / (BRICK_CONSTANTS.width + (BRICK_CONSTANTS.gap / 2)));
        
        var bricksToSkip = this.getRandomNumToSkip(BRICK_CONSTANTS.min_skip, BRICK_CONSTANTS.max_skip);
        //var bricks = Array();
        for(var y = 0; y < 5; y++){
            for(var i = 0; i < column_cnt; i++){
                if(bricksToSkip === brick_skip_cnt){
                    var brick = new Brick(
                        ctx, 
                        BRICK_CONSTANTS.height,
                        BRICK_CONSTANTS.width,
                        y === 0 ? 0 : y * (BRICK_CONSTANTS.height + (BRICK_CONSTANTS.gap /2)),
                        i === 0 ? 0 : i * (BRICK_CONSTANTS.width + (BRICK_CONSTANTS.gap /2)),
                        "yellow",
                        brick_id_cnt
                    );
                    brick.draw();
                    this.bricks[brick_id_cnt] = brick;
                    brick_id_cnt += 1;
                    brick_skip_cnt = 0;
                    bricksToSkip = this.getRandomNumToSkip(BRICK_CONSTANTS.min_skip, BRICK_CONSTANTS.max_skip);
                }else{
                    brick_skip_cnt +=1;
                }
            }
        }
        console.log("number of bricks " + brick_id_cnt);
        return this.bricks;
    };
    
    this.redrawBricks = function(bricks){
        this.bricks = bricks;
        for(var i = 0; i < this.bricks.length; i++){
            this.bricks[i].draw();
        }
        return true;
    };
    
    this.getRandomNumToSkip = function(min, max){
        return Math.floor(Math.random() * (max - min +1 )) + min;
    };
}