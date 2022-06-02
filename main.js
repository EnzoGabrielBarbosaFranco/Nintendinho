// Orientation of the Switch
let x = 25,
    y = 0
// Angle to add/remove at each rotation
const increment = 20,
    switchElement = document.querySelector(".switch"),
    h3Elements = document.querySelectorAll("h3.rule"),
    buttons = document.querySelectorAll(".switch .button")

// We can rotate the Switch only when the introduction is finished
document.addEventListener("animationend", (eAnimation) =>
{
    if(eAnimation.animationName == "switch-rotate-2")
    {
        h3Elements.forEach((item) => 
        {
            item.style.opacity = 1;
        })

        //CSS Trick: apply CSS animation/transition/transform in inline CSS in order to change these values in JS after (ex: line 43)
        switchElement.style.animation = "none"
        switchElement.style.transition = "transform 0.5s ease-in-out"
        switchElement.style.transform = "translateZ(200px) rotateX(" + x + "deg) rotateY(" + y + "deg)"

        document.addEventListener('keydown', (eKey) => 
        {
            eKey.preventDefault()
            switch(eKey.key)
            {
                case "ArrowUp":
                    x += increment
                    break
                case "ArrowDown":
                    x -= increment
                    break
                case "ArrowLeft":
                    y -= increment
                    break
                case "ArrowRight":
                    y += increment
                    break
            }
            switchElement.style.transform = "translateZ(200px) rotateX(" + x + "deg) rotateY(" + y + "deg)"
        })
        buttons.forEach((item) =>
        {
            item.addEventListener("click", () =>
            {
                // Get and transfer data attributes values of the button when it is clicked
                screenManager(item.dataset.action, item.dataset.img)
            })
        })
    }
})
// State of the screen : false-> power on is required
let screenState = false
const screen = document.querySelector(".switch .screen .inner"),
    screenBoot = screen.querySelector("img#screen_boot"),
    screenAfterBoot = screen.querySelector("img#screen_mario_1")

//Function to change the game shown on the screen
function screenManager (action, img)
{
    if(action == "power") 
    {
        if(screenState)
        {
            screen.querySelectorAll("img").forEach((item) => 
            {
                item.style.opacity = 0;
            })
            screenState = false
        }
        else
        {
            screenBoot.style.opacity = 1
            setTimeout(() =>
            {
                screenBoot.style.opacity = 0
                screenAfterBoot.style.opacity = 1
                screenState = true
            }, 3000)
        }
    }
    else
    {
        if(screenState)
        {
            screen.querySelectorAll("img").forEach((item) => 
            {
                if(item.id == "screen_" + img)
                {
                    item.style.opacity = 1;              
                }
                else
                {
                    item.style.opacity = 0;
                }
            })
        }
        else
        {
            document.querySelector("h3#warning_turn_on").classList.remove("highlight")
            /* Litle CSS Hack to re-run a animation
            https://css-tricks.com/restart-css-animation/
            */
            void document.querySelector("h3#warning_turn_on").offsetWidth;
            document.querySelector("h3#warning_turn_on").classList.add("highlight")
        }
    }
}