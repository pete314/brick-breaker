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
    }
    
    this.setColor = function(color){
        console.log(color);
        this.color = color;
    }
}

//holding the bricks as an object
function Bricks(){
    this.bricks = Array();
    
    this.init = function(){
        var brick_id_cnt = 0;
        //constants
        var BRICK_CONSTANTS = {width: 65, height: 20, gap: 10};

        //calculate bricks per row based on dinamic width (remove 10pc margin both sides)
        var column_cnt =  Math.floor((window.innerWidth - 20) / (BRICK_CONSTANTS.width + (BRICK_CONSTANTS.gap / 2)));
        
        //var bricks = Array();
        for(var y = 0; y < 5; y++){
            for(var i = 0; i < column_cnt; i++){
                brick_id_cnt += 1;
                var brick = new Brick(
                    ctx, 
                    BRICK_CONSTANTS.height,
                    BRICK_CONSTANTS.width,
                    y == 0 ? 0 : y * (BRICK_CONSTANTS.height + (BRICK_CONSTANTS.gap /2)),
                    i == 0 ? 0 : i * (BRICK_CONSTANTS.width + (BRICK_CONSTANTS.gap /2)),
                    "yellow",
                    brick_id_cnt
                );
                brick.draw();
                this.bricks.push(brick);
            }
        }
    }
    
    this.redrawBricks = function(){
        for(var key in this.bricks){
            //var brick = this.bricks[key];
            //brick.draw();
            this.bricks[key].draw();
        }
        return true;
    }
    
    this.checkAllColliding = function(ball){
        //check all bricks
        for(var key in this.bricks){
            //var brick =this.bricks[key];
            //should check if a brick was cilliding already
            
            var doesCollide = this.checkColliding(ball, this.bricks[key]);
            if(doesCollide){
                ball.changeVx();
                this.bricks[key].setColor("red");
            }
        }
        return ball;
    }
    
    // return false if not colliding
    this.checkColliding = function(ball, brick){
        var distX = Math.abs(ball.xPos - brick.xPos - brick.width / 2);
        var distY = Math.abs(ball.yPos - brick.yPos - brick.height / 2);
       
        if(distX > (brick.width/2 + ball.radius))
        {
            return false;
        }
        if(distY > (brick.height/2 + ball.radius))
        {
            return false;
        }
        if(distX <= (brick.width/2))
        {
            return true;
        }
        if(distY <= (brick.height/2))
        {
            return true;
        }
        
        console.log(brick, ball);
       
        var dx = distX - brick.width / 2;
        var dy = distY - brick.height / 2;
        return(dx*dx+dy*dy <= (ball.radius*ball.radius));
        /*
        var distX = Math.abs(ball.xPos - brick.xPos - (brick.width / 2));
        var distY = Math.abs(ball.yPos - brick.yPos - (brick.height / 2));

        if (distX > (brick.width/2 + ball.radius)) { return false; }
        if (distY > (brick.height/2 + ball.radius)) { return false; }

        if (distX <= (brick.width/2)) { return true; } 
        if (distY <= (brick.height/2)) { return true; }
        
        console.log(brick, ball);

        var dx=distX-brick.width/2;
        var dy=distY-brick.height/2;
        return (dx*dx+dy*dy<=(ball.radius*ball.radius));   
        */
    }
}