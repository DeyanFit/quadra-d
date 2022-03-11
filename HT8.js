//canvas
const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//player and constructr for changes 
//+ adding other players
class Player {
    constructor(x, y, size, colour) {
            this.x = x
            this.y = y

            this.size = size
            this.colour = colour
        }
        //player appearance(cicrle) 
    show() {
        context.beginPath()
        context.arc(this.x, this.y,
            this.size, 0, Math.PI * 2,
            false)
        context.fillStyle = this.colour
        context.fill()

    }
}
//create p1
const sizep1 = 50
const p1x = canvas.width / 2
const p1y = canvas.height - sizep1 * 2
const player1 = new Player(p1x, p1y, sizep1, 'orange')
player1.show()