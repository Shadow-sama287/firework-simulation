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
const friction = 0.999;
class Circle {
    constructor(x, y, radius, velocity, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.alpha = 1;

        this.draw = () => {
            c.save();
            c.globalAlpha = this.alpha;
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            // c.globalAlpha = 0.17;
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
            c.restore();
        }

        this.update = () => {
            this.velocity.x *= friction;
            this.velocity.y *= friction;
            this.velocity.y += gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.005;


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
    c.fillStyle = 'rgba(0,0,0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update();
        } else {
            particles.splice(i, 1);
        }
    });

    c.fillText('dattebayo', mouse.x, mouse.y)
    //call the object.update() method
}

init();
animate();

addEventListener('click', () => {
    console.log("clicked at", mouse.x, mouse.y);

    const particlesCount = 4000;
    const angleIncrement = (Math.PI * 2) / particlesCount;
    const power = 16;

    for (let i = 0; i < particlesCount; i++) {
        particles.push(new Circle(mouse.x, mouse.y, 5, {
            x: Math.cos(angleIncrement * i) * Math.random() * power,
            y: Math.sin(angleIncrement * i) * Math.random() * power
        }, `hsl(${Math.random() * 360}, 50%, 50%)`));
    }
    console.log(particles);
})