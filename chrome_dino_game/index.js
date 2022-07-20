window.addEventListener('load',function(){ /*névtelen függvény*/
    const canvas = document.getElementById('canvas1'); /*canvas elem aktiválása*/
    const context = canvas.getContext('2d'); /*2d-s mód indítása*/
    canvas.width = 800;      /*canvas méret beállítás*/
    canvas.height = 720;
    let enemiesFly = [];
    let enemiesGround = [];
    const enemiesFlyingSource = ['flyingEnemy0','flyingEnemy1','flyingEnemy2','flyingEnemy3'];
    const enemiesGroundSource = ['groundEnemy0','groundEnemy1','groundEnemy2','groundEnemy3','groundEnemy4'];
    const backgroundLayers = ['layer0','layer1','layer2','layer3'];
    //let jumpCounter = 0;

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
           //>>>>>>>>>>>>>>>>>>>>>>//
            if (movement.key === " "){ jumpCounter += 1;}
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>//
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
            this.x = 35; /*karakter pozíciója a képernyőn*/
            this.y = (this.gameHeight-90) - this.height;  /* -||- */

            this.image = document.getElementById('playerImage');

            this.frameX = 0; /* karakter tilesheet-en az első karakter pozíciója, pozitív integer, első karakternél 0, max. 3(összesen 4) */
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
                this.verticalY = -30;
                 
                
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
           
            this.y += this.verticalY; // ORIGINAL LINE //
                
                if (!this.onGround()) { /* ha a "levegőben" van a karakter*/
                this.verticalY += this.gravitation;  // ORIGINAL LINE //
                this.frameX = 1;
                }
                else {
                    this.verticalY = 0;
                    
                }
          
            
            /* képernyő határok megadása - függőleges */
            if (this.y > this.gameHeight - this.height) {
            this.y = this.gameHeight - this.height;} /* képernyő alja */
           
        }

        isSpacePressed() {
            window.addEventListener('keydown', movement =>{
                if (movement.key === ' ') {
                    return true;
                }
                else {
                    return false;
                }       
        })};

        onGround() {
            return this.y >= (this.gameHeight-90) - this.height;
        }
        }

    class Background{
        constructor(gameWidth,gameHeight, image, speed){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById(image);
            this.x = 0;
            this.y = 0;
            this.width = 3200;
            this.height = 1008;
            this.speed = speed; /* háttér mozgási sebessége*/
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
        constructor(gameWidth,gameHeight,width,height,image,speed){
            this.gameWidth = gameWidth; /*canvas méretei */
            this.gameHeight = gameHeight; 
            this.width = width; /* karakter méretei */
            this.height = height;
            this.image = document.getElementById(image);
            this.x = this.gameWidth;  /* karakter pozíció a képernyőn */
            this.y = (this.gameHeight-290) - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = speed;
        }
        draw(context){
            context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x, this.y,this.width,this.height); /*karakter kirajzolása*/
        
        }
        update(){
            this.x-= this.speed;
        }
    }
    
    class groundEnemy{     /* ogrék */
        constructor(gameWidth,gameHeight,width,height,image,speed){
            this.gameWidth = gameWidth; /*canvas méretei */
            this.gameHeight = gameHeight; 
            this.width = width; /* karakter méretei */
            this.height = height;
            this.image = document.getElementById(image);
            this.x = this.gameWidth;  /* karakter pozíció a képernyőn */
            this.y = (this.gameHeight-85) - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = speed;
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
            randomFlyEnemySpeed = Math.random()*8 + 6;
            /* véletlenszerű enemy választás a listából */
            randomFlyingEnemies = Math.floor(Math.random()* enemiesFlyingSource.length); 
            randomFlyingEnemy = enemiesFlyingSource[randomFlyingEnemies];  
            /*új repülő enemy létrehozása */
            switch(randomGroundEnemies) {
                case 0:
                    enemiesFly.push(new flyingEnemy(canvas.width,canvas.height,124,112,randomFlyingEnemy,randomFlyEnemySpeed));
                    break;
                case 1:
                    enemiesFly.push(new flyingEnemy(canvas.width,canvas.height,124,124,randomFlyingEnemy,randomFlyEnemySpeed));
                    break;
                case 2:
                    enemiesFly.push(new flyingEnemy(canvas.width,canvas.height,124,120,randomFlyingEnemy,randomFlyEnemySpeed));
                    break;
                case 3:
                    enemiesFly.push(new flyingEnemy(canvas.width,canvas.height,124,128,randomFlyingEnemy,randomFlyEnemySpeed));
                    break;
            }

            /* véletlenszerű enemy választás a listából */
            randomGroundEnemies = Math.floor(Math.random()* enemiesGroundSource.length);  
            randomGroundEnemy = enemiesGroundSource[randomGroundEnemies]; 
            randomGroundEnemySpeed = Math.random()*7 + 5;
            /*új földi enemy létrehozása */
            switch(randomGroundEnemies) {
                case 0:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,64,64,randomGroundEnemy,randomGroundEnemySpeed));
                    break;
                case 1:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,72,104,randomGroundEnemy,randomGroundEnemySpeed));
                    break;
                case 2:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,72,128,randomGroundEnemy,randomGroundEnemySpeed));
                    break;
                case 3:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,84,128,randomGroundEnemy,randomGroundEnemySpeed));
                    break;
                case 4:
                    enemiesGround.push(new groundEnemy(canvas.width,canvas.height,80,128,randomGroundEnemy,randomGroundEnemySpeed));
                    break;
            }
            
            randomEnemyInterval = Math.random() *1000 + 700; /* random szám generálása, amitől az enemy feltűnése randomizált lesz */
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
    //const background = new Background(canvas.width,canvas.height);
    const background1 = new Background(canvas.width,canvas.height,backgroundLayers[0],2);
    const background2 = new Background(canvas.width,canvas.height,backgroundLayers[1], 3);
    const background3 = new Background(canvas.width,canvas.height,backgroundLayers[2],4);
    const background4 = new Background(canvas.width,canvas.height,backgroundLayers[3],5);

    
    let lastTime = 0;  /* enemy gyakorisága */
    let enemyTimer = 0; /* eltelt idő számláló */
    let enemyInterval = 1000; /*új enemy hozzáadása minden 1000. milliszecundumban */
    let randomEnemyInterval = Math.random() *1000 + 500;
    let randomGroundEnemies = Math.floor(Math.random()* enemiesGroundSource.length);
    let randomGroundEnemy = '';
    let randomFlyingEnemies = Math.floor(Math.random()* enemiesFlyingSource.length);
    let randomFlyingEnemy = '';
    let randomGroundEnemySpeed = Math.random()*8 + 6;
    let randomFlyEnemySpeed = Math.random()*7 + 5;
    let runSpeed = 0;

    function Run(){
        if (player.onGround && (runSpeed % 5 === 0)){ /* ha a földön van és a runSpeed%6==0, akkor váltson át a következő frame-re. */
            player.frameX++;
            if (player.frameX === 4){ /* ha frame == 4, ugorjon vissza az első frame-re*/
                player.frameX=0;}}
        else {
                return;
            }
    }


    function Animate(timeStamp){ /*animációk*/
        const deltaTime = timeStamp - lastTime;   /* timeStamp egy built-in változója az Animate függvények, automatikusan megkapja az értéket */
        lastTime = timeStamp; 
        runSpeed++;
        if (!player.onGround){
            runSpeed=0;
        }
        context.clearRect(0,0,canvas.width,canvas.height);
        Run();
        background1.draw(context);
        background1.update();
        background2.draw(context);
        background2.update();
        background3.draw(context);
        background3.update();
        background4.draw(context);
        background4.update();
        HandlerEnemies(deltaTime); /* delta time == framerate ~ 16.6 sec */
        player.draw(context);
        player.update(input);
        requestAnimationFrame(Animate) /*rekurzív függvény hívás, folyamatos lesz a mozgás*/
    }
    Animate(0);
});