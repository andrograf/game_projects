// játékképernyő létrehozása

const canvas = document.querySelector('canvas') // kiválasztjuk a megfelelő html elemet

canvas.width = 1024 //képernyő méretek
canvas.height = 576

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
    constructor({position,velocity,image}) {
        this.position = position
        this.image = image
    }
    draw() {
        context.drawImage(this.image,this.position.x,this.position.y) // a map kezdőpontjának beállítása. Ha 0,0, akkor a kép bal felső sarkától fog rajzolni 
                                        // (tile-ból importálni a map-et megfelelő zoom méretben hozzá!!!)
    }
}

const background = new Sprite({position: {x:-2335,y:-750},image:image})   // háttér osztály állandósítása

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



//animáció loop létrehozása

function animate() {  
    window.requestAnimationFrame(animate) // recursive infinity loop létrehozása - végtelenül ismétli a benne lévő kódot(itt:képrajzolás)
    background.draw()

    context.drawImage(playerImage,
    //képkivágás koordináták

    0, // eredet kép x koordinátája
    0, // eredet kép y koordinátája
    playerImage.width/4, // a kép kivágás szélességének a megadása - négy karakter egy sorban, mi egyet keresünk
    playerImage.height/4,// a kép kivágás magasságának a megadása - négy karakter egy oszlopban, mi egyet keresünk

    //aktuális koordináták

    (canvas.width/2-(playerImage.width/4)/2),
    canvas.height/2, // karakter megrajzolása. Gyorsabban töltődik be, mint a héttér, ezért egy betöltés alatt kell mindkettőnek lefutnia
    playerImage.width/4,
    playerImage.height/4)


    // karakter pozíció váltása, billentyű eseménykor
    if (keys.w.pressed && lastKey === 'w')  background.position.y += 3   // ha lastKey megegyezik, abba az irányba mozdul el, hiába van még egy korábbi billenytű lenyomva
    else if (keys.s.pressed && lastKey === 's')  background.position.y -= 3
    else if (keys.a.pressed && lastKey === 'a')  background.position.x += 3
    else if (keys.d.pressed && lastKey === 'd')  background.position.x -= 3
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