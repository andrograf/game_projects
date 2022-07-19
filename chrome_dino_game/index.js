window.addEventListener('load',function(){ /*névtelen függvény*/
    const canvas = document.getElementById('canvas1'); /*canvas elem aktiválása*/
    const context = canvas.getContext('2d'); /*2d-s mód indítása*/
    canvas.width = 800;      /*canvas méret beállítás*/
    canvas.height = 720;
    let enemiesFly = [];
    const enemiesFlySource = [];
    let enemiesGround = [];
    const enemiesGroundSource = ['groundEnemy0','groundEnemy1','groundEnemy2','groundEnemy3','groundEnemy4'];

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
            this.x = 35; /*karakter pozíciója*/
            this.y = (this.gameHeight-85) - this.height;
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
            else if (input.keys.indexOf('ArrowLeft') > -1 ){ /* -||- */
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
        return this.y >= (this.gameHeight-85) - this.height;
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
            this.speed = 5; /* háttér mozgási sebessége*/
        }
        draw(context){
            // context.fillStyle = 'white'; /*player-t jelölő box kitöltése fehérrel*/
            context.drawImage(this.image,this.x, this.y, this.width,this.height); /*karakter kirajzolása*/
            context.drawImage(this.image,this.x + this.width, this.y, this.width,this.height); /* dupla kirajzolás, a folyamatos háttér illúzióért*/
        }
        update(){
            this.x -= this.speed; /* kép elindul balra */
            if (this.x < 0 - this.width) { /* újra kezdőpozíció, ha kép széle érintkezik a képernyő szélével*/
                this.x = 0;
            }
        }
    }

    class flyingEnemy{           /* repülő szörnyek */
        constructor(gameWidth,gameHeight){
            this.gameWidth = gameWidth; /*canvas méretei */
            this.gameHeight = gameHeight; 
            this.width = 124; /* karakter méretei */
            this.height = 128;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;  /* karakter pozíció a képernyőn */
            this.y = (this.gameHeight-290) - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 10;
        }
        draw(context){
            context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x, this.y,this.width,this.height); /*karakter kirajzolása*/
        
        }
        update(){
            this.x-= this.speed;
        }
    }
    
    class groundEnemy{     /* ogrék */
        constructor(gameWidth,gameHeight,width,height,image){
            this.gameWidth = gameWidth; /*canvas méretei */
            this.gameHeight = gameHeight; 
            this.width = width; /* karakter méretei */
            this.height = height;
            this.image = document.getElementById(image);
            this.x = this.gameWidth;  /* karakter pozíció a képernyőn */
            this.y = (this.gameHeight-85) - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 7;
        }
        draw(context){
            context.drawImage(this.image,this.frameX,this.frameY,this.width,this.height,this.x, this.y,this.width,this.height); /*karakter kirajzolása*/
        
        }
        update(){
            this.x-= this.speed;
        }

    }

    /*több enemy kezelése*/
    function HandlerEnemies(deltaTime){  
        if (enemyTimer > enemyInterval+ randomEnemyInterval) {
            enemiesFly.push(new flyingEnemy(canvas.width,canvas.height)); /*új repülő enemy létrehozása */
            
            randomGroundEnemies = Math.floor(Math.random()* enemiesGroundSource.length);  /*új földi enemy létrehozása */
            randomGroundEnemy = enemiesGroundSource[randomGroundEnemies]; /* véletlenszerű enemy választás */

            console.log(randomGroundEnemy);
            switch(randomGroundEnemies) {
                case 0:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,64,64,randomGroundEnemy));
                    break;
                case 1:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,72,140,randomGroundEnemy));
                    break;
                case 2:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,72,128,randomGroundEnemy));
                    break;
                case 3:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,84,128,randomGroundEnemy));
                    break;
                case 4:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,80,128,randomGroundEnemy));
                    break;
            }
            
            randomEnemyInterval = Math.random() *1000 + 500; /* random szám generálása, amitől az enemy feltűnése randomizált lesz */
            enemyTimer = 0;
        }
        else {
            enemyTimer += deltaTime;
        }
        enemiesFly.forEach(enemyFly => {   /*enemy list minden elemén meghívjuk az osztály metódusait */
            enemyFly.draw(context);
            enemyFly.update();
        })
        enemiesGround.forEach(enemyGround => {   /*enemy list minden elemén meghívjuk az osztály metódusait */
            enemyGround.draw(context);
            enemyGround.update();
        })

    }
    function DisplayStatus(){  /* játékos pontjainak kiírása, eredmény kiírása stb.*/

    }

    const input = new InputHAndler();
    const player = new Player(canvas.width,canvas.height);
    const background = new Background(canvas.width,canvas.height);

    
    let lastTime = 0;  /* enemy gyakorisága */
    let enemyTimer = 0; /* eltelt idő számláló */
    let enemyInterval = 1000; /*új enemy hozzáadása minden 1000. milliszecundumban */
    let randomEnemyInterval = Math.random() *1000 + 500;
    let randomGroundEnemies = Math.floor(Math.random()* enemiesGroundSource.length);
    let randomGroundEnemy = '';

    function Animate(timeStamp){ /*animációk*/
        const deltaTime = timeStamp - lastTime;   /* timeStamp egy built-in változója az Animate függvények, automatikusan megkapja az értéket */
        lastTime = timeStamp; 
        context.clearRect(0,0,canvas.width,canvas.height);
        background.draw(context);
        background.update();
        HandlerEnemies(deltaTime); /* delta time == framerate ~ 16.6 sec */
        player.draw(context);
        player.update(input);
        requestAnimationFrame(Animate) /*rekurzív függvény hívás, folyamatos lesz a mozgás*/
    }
    Animate(0);
});