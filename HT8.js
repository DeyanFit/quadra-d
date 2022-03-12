//canvas
const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

//player and constructr for changes 
//+ adding other players
class Player {
    constructor(x, y, size, colour) {
            this.x = x
            this.y = y

            this.size = size
            this.colour = colour
        }
        //player appearance 
    show() {
        context.beginPath()
        context.arc(this.x, this.y,
            this.size, 0, Math.PI * 2,
            false)
        context.fillStyle = this.colour
        context.fill()
    }
}
//shooting 
class Bullet {
    constructor(x, y, size, colour, speed) {
            this.x = x
            this.y = y

            this.size = size
            this.colour = colour

            this.speed = speed
        }
        //bullet appearance 
    show() {
        context.beginPath()
        context.arc(this.x, this.y,
            this.size, 0, Math.PI * 2,
            false)
        context.fillStyle = this.colour
        context.fill()
    }
    update() {
        this.show()
        this.x = this.x + this.speed.x
        this.y = this.y + this.speed.y
    }
}

//create p1
const sizep1 = 50
const p1x = canvas.width / 2
const p1y = canvas.height - sizep1 * 2
const player1 = new Player(p1x, p1y, sizep1, 'orange')

const bullets = []

//animation bullets
function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player1.show()
    bullets.forEach((bullet) => {
            bullet.update()
        })
        //bullet.show()
        //bullet.update()
}

//creating bullets
addEventListener('click', (event) => {
    //angle bullets
    const angle = Math.atan2(event.clientY - (canvas.height - sizep1 * 2),
        event.clientX - canvas.width / 2)

    const speed = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    bullets.push(
        new Bullet(
            canvas.width / 2,
            canvas.height - sizep1 * 2,
            10, 'red', speed)
    )
})
animate()