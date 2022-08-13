# The script of the game goes in this file.

# CHARACTERS

define kuroko = Character('young man')
define akashi = Character('?')
define midorima = Character('?')
define murasakibara = Character('?')
define aomine = Character('?')
define kise = Character('?')
define badGuy = Character('?')
define badGuy2 = Character('?')
#define kuroko = Character("Kuroko Tetsuya",color="#87CEEB")
#define akashi = Character("Akashi Seijuro",color="#DC143C")
#define midorima = Character('Midorima Shintarou',color="#228B22")
#define murasakibara = Character("Murasakibara Atsushi",color="#9370DB")
#define aomine = Character('Aomine Daiki',color="#191970")
#define kise = Character('Kise Ryouta',color="#FFD700")

# CHARACTER SRC
image haizaki neutral = "Haizaki.png"
image hanamiya shadow = "adult_hanamiyaShadow.png"

# AUDIO SRC
define audio.streetNoise = "audio/streetNoise.mp3"
define audio.tenseMusic1 = "audio/tenseMusic1.mp3"
define audio.tenseMusic2 = "audio/tenseMusic2.mp3"


# BG SRC

image cityDay = 'bg/duy-tung-street-daylight.jpg'
image cityNight = 'bg/duy-tung-street-night.jpg'
image darkAlley = 'bg/darkAlley.jpg'
 
# The game starts here.

label start:

    # Show a background.
    # add a file (named either "bg room.png" or "bg room.jpg") to the
    # images directory to show it.

    scene cityDay
    with fade
    #with dissolve
    play music streetNoise

    #show kuroko_adult2 at left #650px height
    #with dissolve

    # These display lines of dialogue.
    ####################################################################################################################
    # INTRO

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

    ######################################################################################################################
    # CHAPTER ONE - FIRST MEET

    stop music fadeout 3.0
    scene cityNight
    with fade

    "The night came already when young man finished his classes." 
    "It was a tiresome day. Not just because it was his first day, but he needed to listen to his lector's preaching about his late arrival,"
    "then he had to do extra effort on every class to know his presence, but still he got angry glances from the teachers and the students as well."
    "It was not a great way for doing a freat impression."

    # This shows a character sprite.
    show kuroko_adult2

    kuroko "Hahh...."
    kuroko "I hoped I can get some new friends at least, but at the end nobody really noticed me in the first place..."
    kuroko "Well, I guess I can try it tomorrow, too."

    hide kuroko_adult2 with moveinleft

    "He thougth over his day , thinking about his new classmates. They seemed nice, but he coudn't still decide beside one."
    "Beside a noisy person at one of the common lessons, he coudn't think out anyone"
    "As he was deep in his thoughts, he missed a turn and he found himself in a closed allay. The lights were barely enough to see the road."

    show kuroko_adult2 at right with moveinright
    with fade

    kuroko "Eh? Where am I?"

    badGuy "Did you lost, little boy?"

    play music tenseMusic2

    kuroko "Thank you, but I'm not a - "

    show haizaki neutral at left

    kuroko "..."

    "When he turned his head toward the condescending and derisory voice, the scene in front of him made him speachless."
    "A scary group of men were standing there and slowly, they started to circle him."
    "He was in a big trouble and even if he never feared of the confrontations with people with number advantage, there were always someone nearby who stepped in before a fight could start."
    "This time it's else. They were at least 15 against him, who was completly alone in a dark, freaky alloy who knows which part of the city."
    "Usually nobody noticed him, but when there are no crowd, just you, suddenly you bacame the center of the attention. This realization made the youngster tremble."
    
    kuroko "'If you don't show you fear, they will stand back. Can't let them see any weakness.' - the blue head told himself. - 'Just like the animals. You need being confident.'"
    kuroko "I'm an adult man. Thank you, but I can find the right road by myself. If you could step away...."

    "The gang looked around themselves, then started laughing. It was clear they do not plan any good."
    "A lean, tall man with a nasty smile stepped out from the crowd. The laughing stopped for once. It seemed he's a kind of boss, based on his expensive suit, and the intimitating effect on his peers."
   
    hide haizaki neutral with fade

    show adult_hanamiya at left with moveinleft 

    badGuy2 "Step away Haizaki. I'll handle this business. This guy seems very interesting."
    badGuy2 'Should I just broke your body?'

    kuroko 'Wha-?!'
    stop music fadeout 2.0
    play music tenseMusic1

    "In a millisecond, the man grabbed him, and slammed into the brick wall beside them."

    play music 
    "The hard hit made the boy dizzy. The man in front of him was not a joke."
    "By instinc, he closed his eyes. When he reopen them again, he stared into the scary man dark, soulness globes. He felt a chill over his body."

    badGuy2 "What about we would know each other a little better? Hmm?"
    

    
    return




    # This ends the game.

    
