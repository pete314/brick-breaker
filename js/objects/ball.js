/* 
    Created on : Oct 20, 2015, 11:31:20 AM
    Author     : Peter Nagy
    Description: Brick objct  
*/

'use strict';

function Ball(ctx, xPos, yPos, vx, vy, color, radius) {
    this.ctx = ctx;
    this.xPos = xPos;
    this.yPos = yPos;
    this.vx = 10;//vx;
    this.vy = 10;//vy;
    this.color = color;
    this.radius = radius;
    
    
    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.arc(this.xPos, this.yPos, this.radius, 0, this.radius * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    
    this.changeVx = function(){
        this.vx *= -1;
    }
    
    this.get = function(){
        return this;
    }
    
    //update the this position use dwith frame animation
    this.update = function(){
        this.xPos += this.vx;
        this.yPos += this.vy;
        
        this.checkWallColision();
        //redraw the pall with the new params {the canvas should be clean at this stage}
        this.draw();
    }
    
    //this checks the collisison with canvas edges
    this.checkWallColision = function(){
        //check hit the floor
        if(this.yPos > (this.ctx.canvas.height - this.radius)) {
            this.yPos = this.ctx.canvas.height - (this.radius * 2);
            this.vy *= -1;
        }

        //check ceiling {avoid going under 0} 
        if(this.yPos < (this.radius) && this.yPos > 0) {
            this.yPos = this.radius + 2;
            this.vy *= -1;
        }

        //check right
        if(this.xPos > (this.ctx.canvas.width - this.radius)) {
            this.xPos = this.ctx.canvas.width - (this.radius * 2);
            this.vx *= -1;
        }

        //check left {avoid going under 0} 
        if(this.xPos < (this.radius) && this.yPos > 0) {
            this.xPos = this.radius + (this.radius * 2);
            this.vx *= -1;
        }
    }
}