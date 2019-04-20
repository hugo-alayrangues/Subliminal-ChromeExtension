# Breathing Edges - Google Chrome Extension

Source : https://github.com/PervasiveWellbeingTech/Subliminal-ChromeExtension

## Todo

## Done

- UX : default parameter setup for interval (4 was actually -1 so we could think of a bug because breath was locked) and small borders added for boxes in the popup (to keep visibility when the chosen color is white)

- Optimization : new @keyframes for edges breathing (see https://github.com/hugo-alayrangues/keyframes_comparison for details)

- Bug fixed : breathing interruption when clicking on URL bar (fix : remove
 window.addEventListener('blur', unfocus); in breathing.js)
 
- Error corrected : "Uncaught Error: Extension context invalidated." (fix : if (typeof chrome.app.isInstalled!=='undefined')
in popup.js)

- Optimization : **update** function (in breathing.js) used only when necessary, to avoid re-injection of all elements at 
each focus of the page (mean : use of a new variable "updated" and "event" variable of eventListeners)

- Code update
