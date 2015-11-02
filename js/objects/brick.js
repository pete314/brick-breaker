/* 
    Created on : Oct 20, 2015, 11:31:20 AM
    Author     : Peter Nagy
    Description: Brick && Bricks object
*/

"use strict";

class Brick
{
    constructor(ctx, height, width, xPos, yPos, color, id){
        this.ctx = ctx;
        this.height = height;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.id = id;
        this.isHit = false;
    }
    
    drawBrick(){
        ctx.beginPath();
        ctx.rect(this.yPos, this.xPos, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
    
    checkColliding(ball, currentBrick){
        if(currentBrick.isHit){
            return false;
        }
        
        var isColliding = false;
        var distX = Math.abs(ball.BallxPos - currentBrick.xPos - currentBrick.width / 2);
        var distY = Math.abs(ball.BallyPos - currentBrick.yPos - currentBrick.height / 2);
        
        if(distX > (currentBrick.width/2 + ball.Ballradius))
        {
            isColliding = false;
        }
        if(distY > (currentBrick.height/2 + ball.Ballradius)){
            isColliding = false;
        }
        if(distX <= (currentBrick.width/2))
        {
            isColliding = true;
        }
        if(distY <= (currentBrick.height/2))
        {
           isColliding = true;
        }
        
        var dx = distX - currentBrick.width / 2;
        var dy = distY - currentBrick.height / 2;
        isColliding = (dx*dx+dy*dy <= (ball.Ballradius*ball.Ballradius));
        
        if(isColliding){
            console.log(ball, currentBrick);
            currentBrick.color = "black";
            currentBrick.isHit = true;
            ball.cx *= -1;
        }
        
        return isColliding;
    }
}

/*
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

function Bricks(ctx){
    this.ctx = ctx;
    
    this.initBricks = function(){
        var bricks = [];
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
                        this.ctx, 
                        BRICK_CONSTANTS.height,
                        BRICK_CONSTANTS.width,
                        y === 0 ? 0 : y * (BRICK_CONSTANTS.height + (BRICK_CONSTANTS.gap /2)),
                        i === 0 ? 0 : i * (BRICK_CONSTANTS.width + (BRICK_CONSTANTS.gap /2)),
                        "yellow",
                        brick_id_cnt
                    );
                    brick.draw();
                    bricks[brick_id_cnt] = brick;
                    brick_id_cnt += 1;
                    brick_skip_cnt = 0;
                    bricksToSkip = this.getRandomNumToSkip(BRICK_CONSTANTS.min_skip, BRICK_CONSTANTS.max_skip);
                }else{
                    brick_skip_cnt +=1;
                }
            }
        }
        console.log("number of bricks " + brick_id_cnt);
        return bricks;
    };
    
    this.getRandomNumToSkip = function(min, max){
        return Math.floor(Math.random() * (max - min +1 )) + min;
    };
}
*/