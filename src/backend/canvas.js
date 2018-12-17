var canvas;
var c;

function init_m() {
    canvas = document.getElementById('canvas');
    console.log(canvas);
    document.getElementById("button").textContent = "Restart";

    c = canvas.getContext('2d')
    console.log(c);
    canvas.width = innerWidth
    canvas.height = innerHeight


    init();
    animate();
}


const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// addEventListener('resize', () => {
//     canvas.width = innerWidth
//     canvas.height = innerHeight

//     init()
// })

// Objects
function Particle(x, y, radius, color) {
    console.log("drawing");
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distance_from_center = random_int_from_range(50, 120);
    this.last_mouse_pos = {
        x: this.x, y: this.y
    }


    this.update = () => {
        const last_point = {
            x: this.x,
            y: this.y
        };
        this.radians += this.velocity;


        this.last_mouse_pos.x +=
            (mouse.x - this.last_mouse_pos.x) * 0.05;
        this.last_mouse_pos.y +=
            (mouse.y - this.last_mouse_pos.y) * 0.05;



        this.x = this.last_mouse_pos.x + Math.cos(this.radians) * this.distance_from_center;
        this.y = this.last_mouse_pos.y + Math.sin(this.radians) * this.distance_from_center;
        console.log(Math.cos(this.radians));
        this.draw(last_point);
    };
    this.draw = function (last_point) {

        c.beginPath()
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        //c.fillStyle = this.color
        // c.fill()
        c.strokStyle = this.color;
        c.lineWidth = this.radius;
        c.beginPath();
        c.moveTo(last_point.x, last_point.y);
        c.lineTo(this.x, this.y);
        c.stroke();


        c.closePath()
    }
}


// Implementation
let particles;
function init() {
    console.log("init");
    particles = []

    for (let i = 0; i < 50; i++) {
        const r = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, r, random_color(colors)));
    }
    console.log(particles);
}

// Animation Loop
function animate() {

    requestAnimationFrame(animate)
    //c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(255,255,255,0.05';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}

function random_int_from_range(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function random_color(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

