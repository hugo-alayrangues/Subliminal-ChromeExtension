'use strict';

function checkEnable(e)
{
    chrome.storage.sync.set({
        enabled: this.checked
    }, function() {
        update_status();
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
}

function changeHex(e)
{
    var reg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
    if (reg.exec(this.value))
    {
        var hex_val = this.value;
        if (hex_val.charAt(0) != '#') // fix string if needed
        {
            hex_val = '#' + hex_val;
        }

        document.getElementById("colorBox").style.background = hex_val;
        document.querySelector(".slider").style.background = hex_val;
        // sheet.innerHTML = "input:checked + .slider {background-color: #" + this.value + ";}";

        chrome.storage.sync.set({
            color: hex_val
        }, function() {
            update_status();
        });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
        });
    }
}

function restore_options() 
{
    // Defaults to disabled
    chrome.storage.sync.get({
        enabled: false,
        color: ""
    }, function(items) {
        document.querySelector("input[type=checkbox]").checked = items.enabled;
        document.getElementById("colorBox").value = items.color;

        // update styles
        document.getElementById("colorBox").style.background = items.color;
        document.querySelector(".slider").style.background = items.color;
    });
}

function update_status()
{
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(function() {
        status.textContent = '';
    }, 750);
}

// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete') {
//         update();
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    restore_options();
    var checkbox = document.querySelector("input[type=checkbox]");
    checkbox.addEventListener('click', checkEnable);
    var colorbox = document.getElementById("colorBox");
    colorbox.addEventListener('keyup', changeHex);

    // var sheet = document.createElement('style');
    // document.appendChild(sheet);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
});

