import { randomIntFromRange, randomColor, distance } from './utils/utils.js';
import { color3, color2, color5 } from './utils/colorArrays.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
 
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

const gravity = 0.005;
// const friction = 0.98;
class Circle {
    constructor(x, y, radius, velocity, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.alpha = 1;

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.globalAlpha = 0.567;
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }

        this.update = () => {
            // this.velocity.x *= friction;
            this.velocity.y += gravity;            
            this.x += this.velocity.x;
            this.y += this.velocity.y;


            this.draw();
        }
    }
}

let particles;
function init() {
    particles = [];
 
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0, 0.25)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });

    c.fillText('dattebayo', mouse.x, mouse.y)
    //call the object.update() method
}

init();
animate();

addEventListener('click', () => {
    console.log("clicked at", mouse.x, mouse.y);

    const particlesCount = 400;
    const angleIncrement = (Math.PI * 2) / particlesCount;
    
    for (let i = 0; i < particlesCount; i++) {
        particles.push(new Circle(mouse.x, mouse.y, 10, {
            x: Math.cos(angleIncrement * i) * Math.random(), 
            y:Math.sin(angleIncrement * i) * Math.random()
        }, randomColor(color2)));
    }     

})