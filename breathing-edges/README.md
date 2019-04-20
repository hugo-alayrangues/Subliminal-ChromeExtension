# Breathing Edges - Google Chrome Extension

## Todo

- Setup default parameters (color and interval) - breathing.js (line 22)
- Integrate new @keyframes for edges breathing

## Done

- Bug fixed : breathing interruption when clicking on URL bar (fix : remove
 window.addEventListener('blur', unfocus); in breathing.js)
 
- Error corrected : "Uncaught Error: Extension context invalidated." (fix : if (typeof chrome.app.isInstalled!=='undefined')
in popup.js)

- Optimization : update function (in breathing.js) used only when necessary, to avoid re-injection of all elements at 
each focus of the page (mean : use of a new variable "updated" and "event" variable of eventListeners)

- Code update