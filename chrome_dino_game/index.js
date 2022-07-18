window.addEventListener('load',function(){ /*névtelen függvény*/
    const canvas = document.getElementById('canvas1'); /*canvas elem aktiválása*/
    const context = canvas.getContext('2d'); /*2d-s mód indítása*/
    canvas.width = 800;      /*canvas méret beállítás*/
    canvas.height = 720;

    class InputHAndler{ /*billentyű parancsok kezelése*/
        constructor(){
            this.keys=[];
            window.addEventListener('keydown', movement =>{ /*movement== lenyomott billentyű; => == megörökli a függvény a szülő scope változóit*/
            console.log(movement.key); 
            if ((movement.key === 'ArrowDown' ||
                movement.key === ' ' ||                    /* space billentyű/jump */
                movement.key === 'ArrowLeft' ||
                movement.key === 'ArrowRight' )
                && this.keys.indexOf(movement.key) === -1) { /* -1 ,vagyis nincs benne még a listában*/
                    this.keys.push(movement.key); /*hozzáadja a listához*/
            }
            console.log(movement.key, this.keys); 
            });
            window.addEventListener('keyup', movement =>{ /*movement== lenyomott billentyű; => == megörökli a függvény a szülő scope változóit*/
            if ((movement.key === 'ArrowDown' ||
                movement.key === ' ' ||
                movement.key === 'ArrowLeft' ||
                movement.key === 'ArrowRight' )) {
                    this.keys.splice(this.keys.indexOf(movement.key), 1) /*megkeresi a listában az indexét, majd töröl 1 elemet azon az indexen*/
                } 
            console.log(movement.key, this.keys); 
            });
        }
    }
    class Player { /*player osztály, billentyűkre való reagálás */
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 42; /* karakter mérete*/
            this.height = 76; 
            this.x = 0; /*karakter pozíciója*/
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frameX = 0; /* karakter tilesheet-en az első karakter pozíciója */
            this.frameY = 0; /* -||- */
            this.speed = 0; /* karakter mozgási sebessége */
            this.verticalY = 0; /* függőleges mozgás */
            this.gravitation = 2; /* a "gravitáció", ami visszahúzza a karaktert a kezdő pozícióba/ zuhanási sebesség */ 
        }
        draw(context){
            // context.fillStyle = 'white'; /*player-t jelölő box kitöltése fehérrel*/
            //context.fillRect(this.x, this.y, this.width,this.height); /*karakter kirajzolása*/
            
            context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x, this.y,this.width,this.height) /* >>>>
            >>>>  img source; img x-,y pozíció; img szélesség-,magasság; canvasen x-,y pozíciója; img szélessége-,magassága(mérete a canvas-en); <<<<< */
        }
        update(input){ /*karakter pozíciójának frissítése mozgáshoz*/            
            
            if (input.keys.indexOf('ArrowRight') > -1){  /* ha ArrowRight lenyomva, elmozdul 5-tel jobbra folyamatosan */ 
                this.speed = 5; 
            }
            else if (input.keys.indexOf('ArrowLeft') > -1){ /* -||- */
                this.speed = -5; 
            }
            else if ((input.keys.indexOf(' ')  > -1) && this.onGround()){
                this.verticalY = -35; 
            }
            else {
                this.speed = 0; /* ha ArrowRight nincs lenyomva/fel van engedve, speed visszaáll nullára, nincs mozgás */
                
            }

            /* vízszintes mozgás */
            this.x += this.speed; /* ha nincs mozgás, 0, tehát áll. Ha jobbra megy, nő az x koordináta, ha balra, akkor csökkent */
               
                /* képernyő határok megadása - vízszintes */
                if (this.x < 0) {
                    this.x = 0;
                }
                else if (this.x > this.gameWidth- this.width) {  /* baloldala a képernyőnek */
                this.x = this.gameWidth - this.width; /* képernyő jobb oldala */
                }


            /* függőleges mozgás */            
            this.y += this.verticalY;

                if (!this.onGround()) { /* ha a "levegőben" van a karakter*/
                    this.verticalY += this.gravitation;
                } 
               else {
                this.verticalY = 0;
               }
               /* képernyő határok megadása - függőleges */
               if (this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height;} /* képernyő alja */
           
        }
    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
    }
    class Background{
        constructor(gameWidth,gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 3200;
            this.height = 1008;
        }
        draw(context){
            // context.fillStyle = 'white'; /*player-t jelölő box kitöltése fehérrel*/
            context.drawImage(this.image,this.x, this.y); /*karakter kirajzolása*/}
    }
    class Enemy{

    }
    function HandlerEnemies(){  /*több enemy kezelése*/

    }
    function DisplayStatus(){  /* játékos pontjainak kiírása, eredmény kiírása stb.*/

    }

    const input = new InputHAndler();
    const player = new Player(canvas.width,canvas.height);
    const backgroud = new Background(canvas.width,canvas.height);
    


    function Animate(){ /*animációk*/
        context.clearRect(0,0,canvas.width,canvas.height);
        backgroud.draw(context);
        player.draw(context);
        player.update(input);
        requestAnimationFrame(Animate) /*rekurzív függvény hívás, folyamatos lesz a mozgás*/
    }
    Animate();
});