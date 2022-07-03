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
playerImage.src = 'images/playerKuroko3.png' //player


image.onload = () => {              // megengedi,  hogy a kép egyidőben töltsön be és rajzolódjon ki a képernyőn

    context.drawImage(image,-2335,-750) // a map kezdőpontjának beállítása. Ha 0,0, akkor a kép bal felső sarkától fog rajzolni 
                                        // (tile-ból importálni a map-et megfelelő zoom méretben hozzá!!!)

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
}                                        


