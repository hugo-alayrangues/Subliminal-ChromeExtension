'use strict';

function checkEnable(e)
{
    chrome.storage.sync.set({
        enabled: this.checked
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });

    set_breathe();
}

function set_breathe()
{
    chrome.storage.sync.get({
        enabled: false
    }, function(items) {
        if (items.enabled)
        {
            chrome.tabs.executeScript({
                code: 'var div=document.createElement("div"); div.setAttribute("id", "breathebox"); document.body.insertBefore(div, document.body.firstChild);'
            });
        }
        else
        {
            chrome.tabs.executeScript(null, {code: 'var div=document.getElementById("breathebox"); div.remove();'});
        }
    });
}

function restore_options() 
{
    // Defaults to disabled
    chrome.storage.sync.get({
        enabled: false
    }, function(items) {
        document.querySelector("input[type=checkbox]").checked = items.enabled;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    restore_options();
    var checkbox = document.querySelector("input[type=checkbox]");
    checkbox.addEventListener('change', checkEnable);
    set_breathe();
});

