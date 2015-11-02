/* 
    Created on : Oct 20, 2015, 11:31:20 AM
    Author     : Peter Nagy
    Description: Brick objct  
*/

'use strict';

class Ball
{
    //constructor takes co-ordinates, radius, colour and the context (pencil) for the canvas.
    constructor(ctx, xPos, yPos, vx, vy, color, radius)
    {
        this.Ballctx = ctx;
        this.BallxPos = xPos;
        this.BallyPos = yPos;
        this.vx = 10;//vx;
        this.vy = 10;//vy;
        this.Ballcolor = color;
        this.Ballradius = radius;
    }
    
     //Draws the ball
    drawBall(){
        this.Ballctx.beginPath();
        this.Ballctx.arc(this.BallxPos, this.BallyPos, this.Ballradius, 0, this.Ballradius * Math.PI, false);
        this.Ballctx.fillStyle = this.Ballcolor;
        this.Ballctx.fill();
    }
    
    checkWallColision(){
        //check hit the floor
        if(this.BallyPos > (this.Ballctx.canvas.height - this.Ballradius)) {
            this.BallyPos = this.Ballctx.canvas.height - (this.Ballradius * 2);
            this.vy *= -1;
        }

        //check ceiling {avoid going under 0} 
        if(this.BallyPos < (this.Ballradius) && this.BallyPos > 0) {
            this.BallyPos = this.Ballradius + 2;
            this.vy *= -1;
        }

        //check right
        if(this.BallxPos > (this.Ballctx.canvas.width - this.Ballradius)) {
            this.BallxPos = this.Ballctx.canvas.width - (this.Ballradius * 2);
            this.vx *= -1;
        }

        //check left {avoid going under 0} 
        if(this.BallxPos < (this.Ballradius) && this.BallyPos > 0) {
            this.BallxPos = this.Ballradius + (this.Ballradius * 2);
            this.vx *= -1;
        }
    }
    
    getCtx(){
        return this.Ballctx;
    }
    
    updateBall(){
        this.BallxPos += this.vx;
        this.BallyPos += this.vy;
        this.checkWallColision();
        //redraw the pall with the new params {the canvas should be clean at this stage}
        //this.drawBall();
        return this;
    }
    
}


/*
function Ball(ctx, xPos, yPos, vx, vy, color, radius) {
    this.Ballctx = ctx;
    this.BallxPos = xPos;
    this.BallyPos = yPos;
    this.vx = 3;//vx;
    this.vy = 3;//vy;
    this.Ballcolor = color;
    this.Ballradius = radius;
    
    
    this.draw = function(){
        this.Ballctx.beginPath();
        this.Ballctx.arc(this.BallxPos, this.BallyPos, this.Ballradius, 0, this.Ballradius * Math.PI, false);
        this.Ballctx.fillStyle = this.Ballcolor;
        this.Ballctx.fill();
    };
    
    this.changeVx = function(){
        this.vx *= -1;
        this.vy *= -1;
    };
    
    this.get = function(){
        return this;
    };
    
    this.getXpos = function(){
        return this.BallxPos;
    };
    
    this.getYpos = function(){
        return this.BallyPos;
    };
    
    //update the this position use dwith frame animation
    this.update = function(){
        this.BallxPos += this.vx;
        this.BallyPos += this.vy;
        
        this.checkWallColision();
        //redraw the pall with the new params {the canvas should be clean at this stage}
        this.draw();
        return this;
    };
    
    //this checks the collisison with canvas edges
    this.checkWallColision = function(){
        //check hit the floor
        if(this.BallyPos > (this.Ballctx.canvas.height - this.Ballradius)) {
            this.BallyPos = this.Ballctx.canvas.height - (this.Ballradius * 2);
            this.vy *= -1;
        }

        //check ceiling {avoid going under 0} 
        if(this.BallyPos < (this.Ballradius) && this.BallyPos > 0) {
            this.BallyPos = this.Ballradius + 2;
            this.vy *= -1;
        }

        //check right
        if(this.BallxPos > (this.Ballctx.canvas.width - this.Ballradius)) {
            this.BallxPos = this.Ballctx.canvas.width - (this.Ballradius * 2);
            this.vx *= -1;
        }

        //check left {avoid going under 0} 
        if(this.BallxPos < (this.Ballradius) && this.BallyPos > 0) {
            this.BallxPos = this.Ballradius + (this.Ballradius * 2);
            this.vx *= -1;
        }
    };
}

*/