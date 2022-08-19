# The script of the game goes in this file.
#include chapterOne.rpy

# CHARACTERS

define youngman = Character('young man',color='#99ccff')
define goodGuy1 = Character('?')
define midorima = Character('?')
define murasakibara = Character('?')
define aomine = Character('?')
define kise = Character('?')
define badGuy = Character('?')
define badGuy2 = Character('?')
define akashi = Character("Akashi",color="#DC143C")
define hanamiya = Character("Hanamiya", color="#22564a")
define haizaki = Character("Haizaki", color="#e0e4e7")
#define kuroko = Character("Kuroko Tetsuya",color="#87CEEB")
#define akashi = Character("Akashi Seijuro",color="#DC143C")
#define midorima = Character('Midorima Shintarou',color="#228B22")
#define murasakibara = Character("Murasakibara Atsushi",color="#9370DB")
#define aomine = Character('Aomine Daiki',color="#191970")
#define kise = Character('Kise Ryouta',color="#FFD700")

# CHARACTER SRC
image gang weapon = "gang.png"
image haizaki neutral= "haizakiL.tiff"
image hanamiya neutral left = "hanamiyaL.tiff"
image hanamiya neutral right = "hanamiyaR.tiff"
image hanamiya shadow = "adult_hanamiyaShadow.png"
#image akashi neutral left= "seijuro_adultLeft.png"
image akashi neutral left= "akashiL.tiff"
image akashi neutral right= "akashiR.tiff"
image kuroko neutral left= "kurokoL.tiff"
image kuroko neutral right= "kurokoR.tiff"
image murasakibara = "murasakibaraL.tiff"
image kagami = "kagamiL.png" #???????????????
image kagami2 = "kagamiL.tiff"
image kagami right = "kagamiR.tiff"
image kise = "kiseL.tiff"
image aomine = "aomineL.tiff"
image midorima = "midorimaL.tiff"

# show kagami at left
# show murasakibara at left
# show haizaki neutral at left
# show midorima at left
# show kise at right
# show hanamiya neutral left at right
# show akashi neutral right at right
# show kuroko neutral right at right

# show aomine

# AUDIO SRC
define audio.streetNoise = "audio/streetNoise.mp3"
define audio.tenseMusic1 = "audio/tenseMusic1.mp3"
define audio.tenseMusic2 = "audio/tenseMusic2.mp3"
define audio.punch = "audio/singlePunch.mp3"
define audio.knifeSound = "audio/knifeSound.mp3"
define audio.hitKO = "audio/hitOutMan.mp3"
define audio.fightNoise = "audio/boxFight.mp3"
define audio.painMoan = "audio/painMoan.mp3"
define audio.evilChuckle = "audio/evilChuckle.mp3"
define audio.stab = "audio/stab.mp3"



# BG SRC

image cityDay = 'bg/duy-tung-street-daylight.jpg'
image cityNight = 'bg/duy-tung-street-night.jpg'
image darkAlley = 'bg/darkAlley.tiff'
image logo = 'bg/gameLogo.png'

# INTRO MOVIE

label splashscreen:

    $ renpy.movie_cutscene('gui/My_video.mp4')

   
    scene black 
    $ renpy.pause(1)
    
    show text "The following story is a work of fiction and contain fantasy situations \n and does not reflect hypnosis in real life. Every character belongs to Tadatoshi Fujimaki sensei." with dissolve
    $ renpy.pause(4)
    hide text with dissolve
    show text "The game contain foul language, violence, alcohol and drug use, sexual content.\n If you are under 18, please play with it keeping in head these warnings."  with dissolve
    $ renpy.pause(4)
    
    hide text with dissolve
   

    return 
 
# The game starts here.
label start:
    $ points = 0

    # INTRO
    label intro:

        scene cityDay
        with fade
        #with dissolve
        play music streetNoise

        # menu choice:
        #     "yes" : 
        #         "nice choice"
        #     "no":
        #         "nice choice, too"

        #show kagami
        
        
       

        "The town was as busy as always. The people run whenever they had work to do, men in suits walked down the main street of Tokyo trying to not be late from work."
        "Young ladies in maid costum tried to invite the pedestrians into the coffe shops for a steaming beverage with more or less success."
        "Between the flow of people, something light blue slims through with so easyiness as the spring breeze. "
        "Nobody seems to notice the strange ghost-like being, even when they are directly look at them. The men and women continue their day without any disturbing."
        "Opposite what it looked like, it wasn't something supernatural, only a 20 year old man, with unusuallly low presence."
        "He coundn't explain why, this is just how it was in his whole life. He learned to use to it."
        "Just like everyone else, he also hurried to his goal, to the University, far at the soudth side of the city, opposite where he lives."
        "Unfortunately, the morning did not go that smooth he wanted and now he is late on his very first day!"
        "Of course, he run as fast as the crowd allowed him. He skillfully avoided every coming persons thanks for his low presence."
        "However in his hurry, did not notice one of his precious books fell down on the dirty pavement."
        "A moment later, he was not seen anymore as he went further and further down the road."
        "Little he knew, the book disappeared in a old, weathered bag very soon."
        jump chapterOne
    

    # This ends the game.
    label credits:
        stop music
        scene black with fade
        $ renpy.pause(0.5)
        show logo with dissolve
        $ renpy.pause(2)
        hide logo with dissolve
        $ renpy.pause(0.5)
        return
    


    
    




    

    
