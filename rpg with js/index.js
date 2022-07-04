// játékképernyő létrehozása

const canvas = document.querySelector('canvas') // kiválasztjuk a megfelelő html elemet

canvas.width = 1024 //képernyő méretek
canvas.height = 576

const collisionMap = []
for (let i = 0; i < collision.length; i+=60) {   // kétdimenziós collision lista készítése, hogy kezelhetőek legyen a térkép négyzetrácsa 
    collisionMap.push(collision.slice(i,60 + i))
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

const foreg_image = new Image()
foreg_image.src = 'images/foreground.png' //map

const playerImage = new Image()
playerImage.src = 'images/playerKuroko180percent.png' //player
                                   



// játékos mozgásának létrehozása

// , // karakter megrajzolása. Gyorsabban töltődik be, mint a héttér, ezért egy betöltés alatt kell mindkettőnek lefutnia



const background = new Sprite({position: {x: offset.x,y: offset.y},image:image})   // háttér osztály állandósítása

const foreground = new Sprite({position: {x: offset.x,y: offset.y},image:foreg_image})

const player = new Sprite({position: {x: canvas.width/2-(231/4)/2, y: canvas.height/2},image: playerImage,frames:{max:4}})
console.log(player)

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


const movables = [background, ...boundaries,foreground] // az összes mozgó tárgy

function rectengleCollision({rectengle1,rectengle2}) {  // rectengle1 = player, rectengle2 = akadály
    return (
        rectengle1.position.x + rectengle1.width >= rectengle2.position.x &&    // true vagy flalse lesz 
        rectengle1.position.x <= rectengle2.position.x + rectengle2.width &&
        rectengle1.position.y + rectengle1.height >= rectengle2.position.y &&
        rectengle1.position.y <= rectengle2.position.y + rectengle2.height
    )
}

//animáció loop létrehozása

function animate() {  
    window.requestAnimationFrame(animate) // recursive infinity loop létrehozása - végtelenül ismétli a benne lévő kódot(itt:képrajzolás)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
        
    })  
    
    player.draw()
    foreground.draw()
    
    // karakter pozíció váltása, billentyű eseménykor
    let moving = true
    if (keys.w.pressed && lastKey === 'w')  {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // ütközés létrehozása - a képernyőn való pozíció szerint
            if (rectengleCollision({rectengle1: player, rectengle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y+3} }})) {
                moving = false
                break
        }
    } 
    if (moving === true) {
    movables.forEach((movable) => movable.position.y += 3)}} // ha lastKey megegyezik, abba az irányba mozdul el, hiába van még egy korábbi billenytű lenyomva
    
    else if (keys.s.pressed && lastKey === 's')   { 
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // ütközés létrehozása - a képernyőn való pozíció szerint
            if (rectengleCollision({rectengle1: player, rectengle2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y-3} }})) {
                moving = false
                break
        }
    } 
    if (moving === true)
        movables.forEach((movable) => movable.position.y -= 3)}

    else if (keys.a.pressed && lastKey === 'a')   { 
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // ütközés létrehozása - a képernyőn való pozíció szerint
            if (rectengleCollision({rectengle1: player, rectengle2: {...boundary, position: {x: boundary.position.x+3, y: boundary.position.y} }})) {
                moving = false
                break
        }
    } 
    if (moving === true)
        movables.forEach((movable) => movable.position.x += 3)}

    else if (keys.d.pressed && lastKey === 'd')   { 
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // ütközés létrehozása - a képernyőn való pozíció szerint
            if (rectengleCollision({rectengle1: player, rectengle2: {...boundary, position: {x: boundary.position.x-3, y: boundary.position.y} }})) {
                moving = false
                break
        }
    } 
    if (moving === true)
        movables.forEach((movable) => movable.position.x -= 3)}
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


