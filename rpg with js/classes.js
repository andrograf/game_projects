// játékos mozgásának létrehozása

class Sprite {    // dinamikus koordináta megadás class segítségével
    constructor({position,velocity=0,image,frames = {max:1}}) {
        this.position = position
        this.image = image
        this.frames = frames  // dinamikusan kiválasztható melyik karakter sprite-ot akarjuk meghívni

        this.image.onload = () => {                         // a karakter tényleges méretének a kiszámítása
            this.width =this.image.width/this.frames.max
            this.height =this.image.height/this.frames.max
            console.log(this.width,this.height)
        }
        
    }
    draw() {                                     
        
        context.drawImage(                        // a map kezdőpontjának beállítása. Ha 0,0, akkor a kép bal felső sarkától fog rajzolni 
            //képkivágás koordináták              // (tile-ból importálni a map-et megfelelő zoom méretben hozzá!!!)
            
            this.image,
            0, // eredeti kép x koordinátája
            0, // eredeti kép y koordinátája
            this.image.width/this.frames.max, // a kép kivágás szélességének a megadása - négy karakter egy sorban, mi egyet keresünk
            this.image.height/this.frames.max,// a kép kivágás magasságának a megadása - négy karakter egy oszlopban, mi egyet keresünk
            this.position.x,
            this.position.y,

            //aktuális koordináták

            this.image.width/this.frames.max,
            this.image.height/this.frames.max)
            
    }
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
        context.fillStyle = 'rgba(255,0,0,0.0)'
        context.fillRect(this.position.x,this.position.y, this.width,this.height) // collision megrajzolása, pirossal
    }
}