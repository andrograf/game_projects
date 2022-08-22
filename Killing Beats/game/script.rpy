# The script of the game goes in this file.

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
    stop music fadeout 1.0
    $ points = 0
    scene black 
    $ renpy.pause(1)

    # PROLOUGE
    label intro:
        
       
        scene cityDay
        with fade
        
        play music streetNoise  
        
        
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




# menu choice:
#     "yes" : 
#         "nice choice"
#         jump endingOne
#     "no":
#         "nice choice, too"
#         jump endingTwo


###PHONE CONVERSATION ####################################
# nvl_narrator "You accepted Akashi's inviting.Now you can talk.\n"
# ki_nvl "hey guys!"
# ao_nvl "shut up kise"
# mi_nvl "you both are so annoying, nanodayo"
# mu_nvl "does some1 have any candy?"
# ku_nvl "Akashi-kun, the afternoon was really amazing. Thank you for the walk." # ku_nvl - main character
# a_nvl "You don't need to be so formal." # a_nvl - second character
# a_nvl "I enjoyed our date, as well. We should repeat it soon."
# #ku_nvl "?!"
# #ku_nvl "....."
# menu:
#     "I'd like that, too.":
#         ku_nvl "I'd like that, too."
#         a_nvl "Perfect. We'll talk later about the details."
#         a_nvl "Sleep tight, Tetsuya."
#     ".....":
#         ku_nvl "....."
#         a_nvl "I guess you did not think it was a date, Tetsuya."
#         a_nvl "Nevermind, next time I'll be sure to notice you about."
    


    
    




    

    
