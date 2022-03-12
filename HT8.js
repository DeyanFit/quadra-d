//canvas
const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight



const score = document.querySelector('#score')
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

//enemies create 
class Enemy {
    constructor(x, y, sizeE, colour, speed) {
            this.x = x
            this.y = y

            this.sizeE = sizeE
            this.colour = colour

            this.speed = speed
        }
        //enemy appearance 
    show() {
        context.beginPath()
        context.arc(this.x, this.y,
            this.sizeE, 0, Math.PI * 2,
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

let player1 = new Player(p1x, p1y, sizep1, 'orange')
let bullets = []
let enemies = []

function res() {
    player1 = new Player(p1x, p1y, sizep1, 'orange')
    bullets = []
    enemies = []
}

//spawn enemy
function EnemiesSpawn() {
    setInterval(() => {
        const x = Math.random() * canvas.width
        const y = -Math.random() * 200
        const sizeE = 40
        const colour = 'blue'
            //enemy angles
        const angle = Math.atan2((canvas.height - sizep1 * 2) - y,
            canvas.width / 2 - x)

        const speed = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, sizeE, colour, speed))
    }, 3000)
}
let playerhit
let Score = 0
    //animation
function animate() {
    playerhit = requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player1.show()
    bullets.forEach((bullet) => {
        bullet.update()
    })

    enemies.forEach((enemy, enemyI) => {
        enemy.update()

        const distance = Math.hypot(
            player1.x - enemy.x, player1.y - enemy.y)
        if (distance - enemy.sizeE - player1.size < 1) {
            cancelAnimationFrame(playerhit)
        }

        //hit bullet enemy
        bullets.forEach((bullet, bulletI) => {
            const distance = Math.hypot(
                bullet.x - enemy.x, bullet.y - enemy.y)

            if (distance - enemy.sizeE - bullet.size < 1) {
                enemies.splice(enemyI, 1)
                bullets.splice(bulletI, 1)
                Score++
                score.innerHTML = Score
            }
        })
    })
}
//creating bullets
addEventListener('click', (event) => {
    //angles bullets
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
            10, 'orange', speed)
    )
})
addEventListener('keydown', () => {
    res()
    animate()
    EnemiesSpawn()
})