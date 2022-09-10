# NVL characters are used for the phone texting
define ku_nvl = Character("Kuroko", kind=nvl, callback=Phone_SendSound,color='#99ccff') #color: change color of name in history
define a_nvl = Character("Akashi", kind=nvl, callback=Phone_ReceiveSound,color="#DC143C")
define mi_nvl = Character('Midorima',kind=nvl,callback=Phone_ReceiveSound,color="#228B22")
define mu_nvl = Character("Murasakibara",kind=nvl,callback=Phone_ReceiveSound,color="#9370DB")
define ao_nvl = Character('Aomine',kind=nvl,callback=Phone_ReceiveSound,color="#191970")
define ki_nvl = Character('Kise',kind=nvl,callback=Phone_ReceiveSound,color="#FFD700")
define mo_nvl = Character('Satsuki',kind=nvl,callback=Phone_ReceiveSound,color="#ec5aa0")

define config.adv_nvl_transition = None
define config.nvl_adv_transition = Dissolve(0.3)

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
define momoi = Character("Satsuki", color="ec5aa0")
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
image kurokoSmiling left= "kurokoLCool.tiff"
image kurokoSmiling right= "kurokoRCool.tiff"
image murasakibara = "murasakibaraL.tiff"
image kagami = "kagamiL.png" #???????????????
image kagami2 = "kagamiL.tiff"
image kagami right = "kagamiR.tiff"
image kise = "kiseL.tiff"
image aomine = "aomineL.tiff"
image midorima = "midorimaL.tiff"
image momoi = "momoiNoLogoR.tiff"

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