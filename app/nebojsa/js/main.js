/*========================*\
	#Canvas setup
\*========================*/
// window.onload(function(){
//
// })


var canvas = document.getElementById("context");
var context = canvas.getContext("2d"),
	width = window.innerWidth - 200,
	height = window.innerHeight - 300;
canvas.width = width;
canvas.height = height;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
var score = 0;
var gameIsOver = false;

  // Add keys to array

  window.addEventListener("keydown", function(e){
  	keys[e.keyCode] = true;
  }, false);

  // Remove keys from array

  window.addEventListener("keyup", function(e){
  	delete keys[e.keyCode];
  }, false);

  window.addEventListener("mousemove", function(e){
		mouseX = event.clientX-document.getElementById("context").offsetLeft;
		mouseY = event.clientY-document.getElementById("context").offsetTop;
		findMouseAngle();
  }, false);
	window.addEventListener("click", function(e){
		shoot();
		console.log(bullets);
	}, false);
/*========================*\
  #Sprite animations and etc.
\*========================*/
var enemyColors = [ '#BE1E2D', '#00AEEF','#8DC63F','#662D91','#Asd97C50','#FFF200','#726658','#F7941E','#F1F2F2', "#1C75BC"];
var explosionImages = getImages(['image/Burst-particles-3.png','image/death1.png','image/death2.png','image/death3.png','image/death4.png','image/death5.png','image/death6.png','image/death7.png','image/death8.png','image/death9.png','image/Hero.png']);
var playerImage = getImages(['image/Hero.png']);

var italianoImage = new Image();
italianoImage.src = "image/Burst-particles-1.png";
var playerSpriteImage = new Image();
playerSpriteImage.src = "image/Burst-particles-1.png";
function sprite (options) {

    var that = {},
		frameIndex = 0,
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 1;;
		numberOfFrames = options.numberOfFrames || 1;
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
		that.loop = options.loop;
		that.x = options.x;
		that.y = options.y;
		that.done = false;
		that.update = function () {

			tickCount += 1;

			if (tickCount > ticksPerFrame) {

				tickCount = 0;

				// If the current frame index is in range
        if (frameIndex < numberOfFrames - 1) {
            // Go to the next frame
            frameIndex += 1;
				} else if (that.loop) {
            frameIndex = 0;
        } else {
					that.done = true;
				}
			}
		};
		that.render = function () {

		// Draw the animation
		context.drawImage(
			 that.image,
			 frameIndex * that.width / numberOfFrames,
			 0,
			 that.width / numberOfFrames,
			 that.height,
			 that.x,
			 that.y,
			 that.width / numberOfFrames,
			 that.height);
		 };

    return that;
}











/*========================*\
  #Variables
\*========================*/
var loop,
    counter = 0,
    gameIsOver =false,
    enemies = [],
		bullets = [],
    gameSpeed = 1,
    keys = [],
    bgpos = 0,
    deltaX = 1,
    deltaY = 1,
    speed = 5,
    // Init images
  	images = [],
		explosions = [],
  	requiredImages = 0,
		mouseX,
		mouseY,
  	doneImages = 0;
	var vB,
	 vBx,
	 vBy;
var player = {
  width:24,
  height:24,
  y:100,
  x:50,
	health:100,
	image: playerImage,
	color:'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+")",
  hand:{
    rotation:0,
		x :0,
		y :0
  }
}
var playerSprite = new sprite({
	context: context,
	width: 671,
	height: 48,
	loop:true,
	image: playerSpriteImage,
	numberOfFrames: 14,
	ticksPerFrame: 1,
	x:player.x,
	y:player.y
});
$("#context").css({"border-color":player.color});
// initImages(["road1.png"]);
var enemy = function(){
	this.x = width  + Math.random()*100;
	this.y= 25 + Math.floor(Math.random()*12)*50;
	this.width= 24;
	this.height= 24;
	this.colorNumber = Math.floor(Math.random()*9);
	this.color = enemyColors[this.colorNumber];
	this.image = explosionImages[this.colorNumber];
	// this.color='rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
	// this.color= 'red';
	this.speed = 3;
	this.getColorNumber = function(){
		var number = Math.floor(Math.random()*10);
		return number;
	}
}
var sound_shoot = [];
var sound_shoot_counter = 0;
for (i=0;i<12;i++){
	 sound_shoot.push(new Audio("sound/shoot.wav"));
	 sound_shoot[i].volume = 0.05;
	 // sound_tank_bullet[i].volume = sound_tank_bullet_volume;
 }
var sound_explode = [];
var sound_explode_counter = 0;
for (var i=0;i<12;i++){
	 sound_explode.push(new Audio("sound/explode.wav"));
	 sound_explode[i].volume = 0.7;
	 // sound_tank_bullet[i].volume = sound_tank_bullet_volume;
}

var bullet = function(x,y){
	this.x = x + player.hand.x;
	this.y = y +player.hand.y;
	this.width= 3;
	this.height= 3;
	this.angle = player.hand.rotation * Math.PI / 180;
	this.deltaX = deltaX;
	this.rikoshet = 0;
	this.directionX = 1;
	this.directionY = 1;
	this.vBx = 1;
	this.vby = 1;
	this.decay = 4;

}
var start1;
function start(){
  start1 = performance.now();
  loop = window.requestAnimationFrame(start)
  if (counter % gameSpeed == 0){
    game();
  }
  counter++;
}
function game(){
  update();
  render();
}
function update(){
/* ---------------*\
   #Controls
\* ---------------*/
for (i in explosions){
	explosions[i].update();
	if (explosions[i].done){
		explosions.splice(i,1);
	}
}
bgpos-=speed;
if (bgpos <= - width ){
  bgpos= 0;
}
playerSprite.update();
playerSprite.x = player.x;
playerSprite.y = player.y;
for (i in enemies){
	for (j in bullets){

		if (collision(enemies[i],bullets[j])){

			var explosion = new sprite({
			    context: context,
			    width: 719,
			    height: 90,
					loop:false,
				  image: explosionImages[enemies[i].colorNumber],
					numberOfFrames: 8,
					ticksPerFrame: 2,
					x:enemies[i].x-32,
					y:enemies[i].y-32
			});
			enemies.splice(i,1);
			bullets.splice(j,1);
			explosions.push(explosion);
			score++;
			$(".score").html(score);
			sound_explode[sound_explode_counter].play();
			sound_explode_counter++;
			sound_explode_counter = sound_explode_counter % 10;
			break;
		}
	}

}
for (i in enemies){
		if (enemies[i].x < player.x){
			enemies[i].x+= enemies[i].speed*Math.abs(Math.cos(findEnemyMovingAngle(enemies[i],player)));
		} else if (enemies[i].x > player.x+player.width){
			enemies[i].x-= enemies[i].speed*Math.abs(Math.cos(findEnemyMovingAngle(enemies[i],player)));
		}
		if (enemies[i].y < player.y){
			enemies[i].y+=enemies[i].speed*Math.abs(Math.sin(findEnemyMovingAngle(enemies[i],player)));
		} else if (enemies[i].y > player.y+player.height){
			enemies[i].y-=enemies[i].speed*Math.abs(Math.sin(findEnemyMovingAngle(enemies[i],player)));
		}


  if (enemies[i].x < -510){
    enemies.splice(i,1);
  }
}
if (counter % 50 == 0 ){
  enemies.push(new enemy());
}
for (i in enemies){
	if (collision(enemies[i],player)){
		enemies.splice(i,1);

		player.health -= 25;
	}
}
for (i in bullets){
	if (bullets[i].decay <4 && collision(bullets[i],player)){
		bullets.splice(i,1);
		player.health-=2;
	}
	vB = 22 //Speed of bullet
	vBx = vB*Math.cos(bullets[i].angle); //Speed of bullet on x-axis
	vBy = vB*Math.sin(bullets[i].angle); //Speed of bullet on y-axis

	bullets[i].x+=vBx*bullets[i].directionX;
	bullets[i].y+=vBy*bullets[i].directionY;
	if (bullets[i].x >= width || bullets[i].x <= 0){
		bullets[i].directionX *= -1;
		bullets[i].decay-=1;
		if (bullets[i].decay<=0){
			bullets.splice(i,1);
		}
	}
	if (bullets[i].y <= 25 || bullets[i].y>=height-53){
		bullets[i].directionY *= -1;
		bullets[i].decay-=1;
		if (bullets[i].decay<=0){
			bullets.splice(i,1);
		}
	}
}

if (player.health <= 0){
	player.health = 0;
	gameOver();
}

if(keys[37] || keys[65] && !gameIsOver){player.x-=5;findMouseAngle();} // Left
if(keys[39] || keys[68] && !gameIsOver){player.x+=5;findMouseAngle();} // Right
if(keys[38] || keys[87] && !gameIsOver ){player.y-=5;findMouseAngle(); } // Up
if(keys[40] || keys[83] && !gameIsOver ){player.y+=5;findMouseAngle(); } // Down
if(keys[13] && gameIsOver){newGame();}
// if(keys[13] && gameIsOver){ chooseLevel(); } // Start new game

/* ---------------*\
 #Boudaries
\* ---------------*/

if(player.x < 0){player.x=0} // Left margin
if(player.y <= 25){player.y=25} // Top margin
if(player.x >= width - player.width){player.x=width - player.width}  // Right margin
if(player.y >= height - player.height - 50){player.y=height-player.height -50; } // Left margin


}
function render(){

  context.clearRect(0, 0, width, height);
	context.fillStyle='black';
  context.fillRect(0, 0, width, 25);
	context.fillText("Score",10,50);
	context.fillStyle="red";
	context.fillRect(5,10,200, 5);
	context.fillStyle=player.color;

	context.fillRect(5,10,player.health*2, 5);

	context.fillStyle='white';
	context.fillText(player.health+'%',210,16);

	context.fillStyle=player.color;
  context.fillRect(player.x, player.y, player.width, player.height);
	// context.drawImage(explosionImages[10], player.x, player.y);
	// playerSprite.render();
  context.save();
  context.translate(player.x + player.hand.x, player.y + player.hand.y);
  context.rotate(player.hand.rotation * Math.PI/180);
  context.fillStyle='red';
  context.globalAlpha=0.1;
  // context.fillRect(0, -1, 25, 1);
  // context.fillRect(0, 1, 25, 1);
  context.globalAlpha=0.3;
  context.fillRect(0, 0, 2500, 1);
  context.globalAlpha=1;
  context.fillStyle='white';
  context.fillRect(0, 0 , 50, 4);
  context.fillStyle='black';
  context.restore();
  context.fillStyle='black';
  context.fillRect(0, height - 50, width, 50);


  for (i in enemies){
    var enemy = enemies[i];
		// context.fillStyle=enemy.color;
    // context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
		context.drawImage(enemy.image,0, 0,90,90,enemy.x - 32, enemy.y - 32, 90, 90);
  }
	context.fillStyle='white';
	for (i in bullets){
		var bullet = bullets[i];
		context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
	}

	context.fillStyle='purple';
	if (gameIsOver){
		context.fillStyle='white';
		context.font='50px Press';
		context.fillText("GAME OVER",width/2-220,height/2+25);
		context.font='15px Press';
		context.fillText("YOUR SCORE: "+score,width/2-220,height/2+50);
		context.font='12px Press';
		context.fillText("ENTER the new game",width/2-220,height/2+100);
		context.font='10px sans-serif';
	}
	context.fillStyle = player.color;
	context.fillRect(mouseX-10, mouseY, 21, 1);
	context.fillRect(mouseX, mouseY-10, 1, 21);
	for (i in explosions){
		explosions[i].render();
	}
	// debug hand position
	// context.fillStyle="red";
	// context.fillRect(player.x+player.hand.x, player.y + player.hand.y,3, 3);
}
function initImages(paths){
	requiredImages = paths.length;
	for (i in paths) {
		console.log(paths[i]);
		var img = new Image();
		img.src = '/image/'+paths[i];
		images[i] = img;
		images[i].onload = function(){
			doneImages++;
			console.log(doneImages);
		}
	}
}
function findMouseAngle(){
	deltaX = mouseX - player.x - player.hand.x;
	deltaY = mouseY - player.y - player.hand.y;
	player.hand.rotation =   180/Math.PI * Math.atan2(deltaY, deltaX);
	console.log("searching");
}
function findEnemyMovingAngle(enemy,player){
	var deltaX = enemy.x - player.x;
	var deltaY = enemy.y - player.y;
	var moving_angle = 180/Math.PI * Math.atan2(deltaY, deltaX);
	return moving_angle;
}
function shoot(){
	if (!gameIsOver && bullets.length < 10){
		bullets.push(new bullet(player.x,player.y));
		sound_shoot[sound_shoot_counter].play();
		sound_shoot_counter++;
		sound_shoot_counter = sound_shoot_counter % 10;
	}
}
function collision(first, second){
	return !(first.x > second.x + second.width ||
		first.x+first.width<second.x ||
		first.y > second.y + second.height ||
		first.y+first.height<second.y);
}
function hCollision(first, second){
	return !(first.x > second.x + second.width ||
		first.x+first.width<second.x);
}
function vCollision(first, second){
	return !(first.y > second.y + second.height ||
	first.y+first.height<second.y);
}
function gameOver(){
	gameIsOver = true;
}
function getImages(paths){
	var images = [];
	for (i in paths){
		var image = new Image();
		image.src = paths[i];
		images.push(image)
	}
	return images;
}
function newGame(){
	bullets = [];
	enemies = [];
	player.health = 100;
	gameIsOver = false;
	player.x = 50;
	player.y = 100;
	score = 0;
	$(".score").html(score);
}
findMouseAngle();
jQuery(window).load(start);
// start();
