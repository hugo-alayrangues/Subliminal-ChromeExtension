'use strict';

function checkEnable(e)
{
    if (this.checked)
    {
        chrome.tabs.executeScript({
            code: 'var div=document.createElement("div"); div.setAttribute("id", "breathebox"); document.body.insertBefore(div, document.body.firstChild);'
        });
    }
    else
    {
        chrome.tabs.executeScript(null, {code: 'var div=document.getElementById("breathebox"); div.remove();'});
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector("input[type=checkbox]");
    checkbox.addEventListener('change', checkEnable);
});
