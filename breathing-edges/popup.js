'use strict';

// update enable checkbox
function check_enable(e)
{
    // store value
    chrome.storage.sync.set({
        enabled: this.checked
    }, function() {
        update_status();
    });

    // update page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
}

// update color box
function change_hex(e)
{
    var reg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
    if (reg.exec(this.value)) // check for valid text input
    {
        var hex_val = this.value;
        if (hex_val.charAt(0) != '#') // fix string if needed
        {
            hex_val = '#' + hex_val;
        }

        // update styles accordingly
        document.getElementById("colorBox").style.background = hex_val;
        document.querySelector(".slider").style.background = hex_val;
        document.querySelector('#range-value-bar').style.background = hex_val;

        // store value
        chrome.storage.sync.set({
            color: hex_val
        }, function() {
            update_status();
        });

        // update page
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
        });
    }
}

// update opacity
function change_opacity(e)
{
    // update styles
    document.querySelector('#range-value-bar').style.setProperty('opacity', this.value/100);

    // store value
    chrome.storage.sync.set({
        opacity: this.value/100
    }, function() {
        update_status();
    });

    // update page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
}

// update breathing interval
function change_interval(e)
{
    var reg = /^(\d+\.?\d*|\.\d+)$/;
    if (reg.exec(this.value)) // check for valid text input
    {
        var decimal_val = this.value;

        // store value
        chrome.storage.sync.set({
            interval: decimal_val
        }, function() {
            update_status();
        });

        // update page
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
        });
    }
}

// restore options when popup is opened
function restore_options() 
{
    // Defaults to disabled
    chrome.storage.sync.get({
        enabled: false,
        color: "",
        opacity: 1.0,
        interval: 3
    }, function(items) {
        // update values
        document.querySelector("input[type=checkbox]").checked = items.enabled;
        document.getElementById("colorBox").value = items.color;
        document.querySelector("input[type=range]").value = items.opacity*100;
        document.getElementById("breathingInterval").value = items.interval;

        // update styles
        document.getElementById("colorBox").style.background = items.color;
        document.querySelector(".slider").style.background = items.color;
        document.querySelector('#range-value-bar').style.background = items.color;
        document.querySelector('#range-value-bar').style.setProperty('opacity', items.opacity);
    });
}

function update_status()
{
    // update status to show options saved
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

// execute when popup loaded
document.addEventListener('DOMContentLoaded', function () {
    // restore previous options
    restore_options();
    
    // add listeners
    var checkbox = document.querySelector("input[type=checkbox]");
    checkbox.addEventListener('click', check_enable);
    var colorbox = document.getElementById("colorBox");
    colorbox.addEventListener('input', change_hex);
    var range_slider = document.querySelector('.range-slider');
    range_slider.addEventListener('input', change_opacity);
    var interval_input = document.getElementById("breathingInterval");
    interval_input.addEventListener('input', change_interval);

    // var sheet = document.createElement('style');
    // document.appendChild(sheet);
    
    // initial update of page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
});

