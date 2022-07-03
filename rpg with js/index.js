// játékképernyő létrehozása

const canvas = document.querySelector('canvas') // kiválasztjuk a megfelelő html elemet

canvas.width = 1024 //képernyő méretek
canvas.height = 576

const collisionMap = []
for (let i = 0; i < collision.length; i+=60) {   // kétdimenziós collision lista készítése, hogy kezelhetőek legyen a térkép négyzetrácsa 
    collisionMap.push(collision.slice(i,60 + i))
}

class Boundery {
    static width = 64 // a sprite sheet mérete(16px) * 4, mert 400% zoomot alkalmaztunk
    static height = 64
    constructor({position}) {
        this.position = position
        this.width = 64
        this.height = 64
    }
    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x,this.position.y, this.width,this.height) // collision megrajzolása, pirossal
    }
}

const boundaries = []
const offset = {
    x: -2335,
    y: -750
}

collisionMap.forEach((row,i) => {
    row.forEach((symbol,j) => {
        if (symbol === 401)           // ha a collicion lista eleme egyenlő 401-gyel, hozzáadja az új allistát az üres listába
        boundaries.push(new Boundery({position: {  
            x: j*Boundery.width + offset.x,
            y: i*Boundery.height + offset.y
        }}))
    })
})
// console.log(boundaries)


const context = canvas.getContext('2d') // 2d-s tartalmat fogunk megjeleníteni a canvas elemben
context.fillStyle = 'white' // képernyő háttérszínének beállítása
context.fillRect(0,0,canvas.width,canvas.height) // rect= rectengle, egy téglalap területet rajzol ki a megadott képernyőn - x,y koordináta, mint kezdőpont + a max. szélesség és magasság




// map és játékos beimportálása

const image = new Image()
image.src = 'images/pokemon_like_game.png' //map

const playerImage = new Image()
playerImage.src = 'images/playerKuroko180percent.png' //player
                                   



// játékos mozgásának létrehozása

class Sprite {    // dinamikus koordináta megadás class segítségével
    constructor({position,velocity,image,frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frame = frames
    }
    draw() {
        context.drawImage(this.image,this.position.x,this.position.y) // a map kezdőpontjának beállítása. Ha 0,0, akkor a kép bal felső sarkától fog rajzolni 
                                        // (tile-ból importálni a map-et megfelelő zoom méretben hozzá!!!)
        context.drawImage(playerImage,
            //képkivágás koordináták
        
            0, // eredet kép x koordinátája
            0, // eredet kép y koordinátája
            this.image.width/this.frame.max, // a kép kivágás szélességének a megadása - négy karakter egy sorban, mi egyet keresünk
            this.image.height/this.frame.max,// a kép kivágás magasságának a megadása - négy karakter egy oszlopban, mi egyet keresünk
            this.position.x,
            this.position.y,
            //aktuális koordináták

            this.image.width/this.frame.max,
            this.image.height/this.frame.max)
                                        
    }
}
        
// (),
// , // karakter megrajzolása. Gyorsabban töltődik be, mint a héttér, ezért egy betöltés alatt kell mindkettőnek lefutnia

const player = new Sprite({
    position: {
        x:canvas.width/2-(231/4)/2,
        y:canvas.height/2},
    image: playerImage,
    frame: {max:4}})

const background = new Sprite({position: {x: offset.x,y: offset.y},image:image})   // háttér osztály állandósítása

const keys = {            // billentyű kulcsok, alapértelmezetten false 
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}


const testBoundary = new Boundery( {
    position : {
        x: 400,
        y: 400
    }
})

const movables = [background, testBoundary] // az összes mozgó tárgy

//animáció loop létrehozása

function animate() {  
    window.requestAnimationFrame(animate) // recursive infinity loop létrehozása - végtelenül ismétli a benne lévő kódot(itt:képrajzolás)
    background.draw()
    // boundaries.forEach(boundary => {
    //     boundary.draw()
    // })
    testBoundary.draw()
    player.draw()
    // ütközés létrehozása
    //if (player.position.x + player.width)


    // karakter pozíció váltása, billentyű eseménykor
    if (keys.w.pressed && lastKey === 'w')  { movables.forEach(movable => movable.position.y += 3)}  // ha lastKey megegyezik, abba az irányba mozdul el, hiába van még egy korábbi billenytű lenyomva
    else if (keys.s.pressed && lastKey === 's')   { movables.forEach(movable => movable.position.y -= 3)}
    else if (keys.a.pressed && lastKey === 'a')   { movables.forEach(movable => movable.position.x += 3)}
    else if (keys.d.pressed && lastKey === 'd')   { movables.forEach(movable => movable.position.x -= 3)}
}

animate()


 // billentyű esemény megadása

let lastKey = ''  // utoljára lenyomott billentyű

window.addEventListener('keydown',(e) => {      // lenyomáskor, true értéket kapnak a kulcsok
    
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
    
    console.log(keys)
})
window.addEventListener('keyup',(e) => {      // felengedéskor visszatérnek false-ra 
    
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    
    console.log(keys)
})
// a rekurzív animate függvényben lévő feltételek miatt, az eventek újra és újra megismétlódnek, létrejön a mozgás - valójában a háttér mozog, nem a karakter!


