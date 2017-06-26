//宇宙特效
"use strict";
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,

  hue = 217,
  stars = [],
  count = 0,
  maxStars = 1300;//星星数量

var canvas2 = document.createElement('canvas'),
  ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
  gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
  var max = Math.max(x, y),
    diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
  //星星移动范围，值越大范围越小，
}

var Star = function() {

  this.orbitRadius = random(maxOrbit(w, h));
  this.radius = random(60, this.orbitRadius) / 8; 
  //星星大小
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 300000; 
  //星星移动速度
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
    twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.5; //尾巴
  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };

  window.requestAnimationFrame(animation);
}

animation();

$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});


window.onload = () => {
    const CANVAS = document.getElementById("asii3d");
    const CTX = CANVAS.getContext("2d");
    const CHARS = [];
    const MAX_CHARS = 200;
    const SEPARATION = 1.5;

    let ww, wh, camera;

    class Vector {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        rotate(dir, ang) {
            const X = this.x;
            const Y = this.y;
            const Z = this.z;

            const SIN = Math.sin(ang);
            const COS = Math.cos(ang);

            if (dir === "x") {
                this.y = Y * COS - Z * SIN;
                this.z = Y * SIN + Z * COS;
            } else if (dir === "y") {
                this.x = X * COS - Z * SIN;
                this.z = X * SIN + Z * COS;
            }
        }

        project() {
            const ZP = this.z + camera.z;
            const DIV = ZP / 600;
            const XP = (this.x + camera.x) / DIV;
            const YP = (this.y + camera.y) / DIV;
            const CENTER = getCenter();
            return [XP + CENTER[0], YP + CENTER[1], ZP];
        }
    }

    class Char {
        constructor(letter, pos) {
            this.letter = letter;
            this.pos = pos;
        }

        rotate(dir, ang) {
            this.pos.rotate(dir, ang);
        }

        render() {
            const PIXEL = this.pos.project();
            const XP = PIXEL[0];
            const YP = PIXEL[1];
            const MAX_SIZE = 50;
            const SIZE = (1 / PIXEL[2] * MAX_SIZE) | 0;
            const BRIGHTNESS = SIZE / MAX_SIZE;
            const COL = `rgba(255, 255, ${100 * BRIGHTNESS | 0 + 150}, ${BRIGHTNESS})`;
            
            CTX.beginPath();
            CTX.fillStyle = COL;
            CTX.font = SIZE + "px monospace";
            CTX.fillText(this.letter, XP, YP);
            CTX.fill();
            CTX.closePath();
        }
    }

    function getCenter() {
        return [ww / 2, wh / 2];
    }

    function signedRandom() {
        return Math.random() - Math.random();
    }

    function render() {
        for (let i = 0; i < CHARS.length; i++) {
            CHARS[i].render();
        }
    }
    
    let time = 0;
    function update() {
        CTX.clearRect(0, 0, ww, wh);
        for (let i = 0; i < CHARS.length; i++) {
            const DX = 0.005 * Math.sin(time * 0.001);
            const DY = 0.005 * Math.cos(time * 0.001);
            CHARS[i].rotate("x", DX);
            CHARS[i].rotate("y", DY);
        }
        ++time;
    }

    function loop() {
        window.requestAnimationFrame(loop);
        update();
        render();
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function createChars() {
        for (let i = 0; i < MAX_CHARS; i++) {
            const CHARACTER = String.fromCharCode((Math.random() * 93 + 34) | 0);
            const X = signedRandom() * SEPARATION;
            const Y = signedRandom() * SEPARATION;
            const Z = signedRandom() * SEPARATION;
            const POS = new Vector(X, Y, Z);
            const CHAR = new Char(CHARACTER, POS);
            CHARS.push(CHAR);
        }
    }

    function setDim() {
        ww = window.innerWidth;
        wh = window.innerHeight;
        CANVAS.width = ww;
        CANVAS.height = wh;
    }

    function initCamera() {
        camera = new Vector(0, 0, SEPARATION + 1);
    }

    window.onresize = setDim;

    (() => {
        setDim();
        initCamera();
        createChars();
        loop();
    })();
};