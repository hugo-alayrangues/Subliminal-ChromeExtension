'use strict';

// update enable checkbox
function check_enable()
{
    // store value
    chrome.storage.sync.set({
        enabled: this.checked
    }, update_status);

    // update page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
}

// update color picker
function change_color()
{
    // update styles
    document.querySelector(".color-picker-wrapper").style.backgroundColor = this.value;
    document.getElementById("colorBox").value = this.value;
    document.getElementById("colorBox").style.background = this.value;
    color_style.innerHTML = ".color input:checked + .slider {background-color: " + this.value + ";}";
    document.querySelector('#range-value-bar').style.background = this.value;

    // store value
    chrome.storage.sync.set({
        color: this.value
    }, update_status);

    // update page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
}

// update color box
function change_hex()
{
    let reg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
    if (reg.exec(this.value)) // check for valid text input
    {
        let hex_val = this.value;
        if (hex_val.charAt(0) !== '#') // fix string if needed
        {
            hex_val = '#' + hex_val;
        }

        // update styles accordingly
        document.getElementById("colorBox").style.background = hex_val;
        document.querySelector(".color-picker").value = hex_val;
        document.querySelector(".color-picker-wrapper").style.backgroundColor = hex_val;
        color_style.innerHTML = ".color input:checked + .slider {background-color: " + hex_val + ";}";
        document.querySelector('#range-value-bar').style.background = hex_val;

        // store value
        chrome.storage.sync.set({
            color: hex_val
        }, update_status);

        // update page
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
        });
    }
}

// update opacity
function change_opacity()
{
    // update styles
    document.querySelector('#range-value-bar').style.setProperty('opacity', this.value/100);

    // store value
    chrome.storage.sync.set({
        opacity: this.value/100
    }, update_status);

    // update page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
    });
}

// update breathing interval
function change_interval()
{
    let reg = /^(\d+\.?\d*|\.\d+)$/;
    if (reg.exec(this.value)) // check for valid text input
    {
        let decimal_val = this.value;

        // store value
        chrome.storage.sync.set({
            interval: decimal_val
        }, update_status);

        // update page
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
        });
    }
}

function check_visibility()
{
    // store value
    chrome.storage.sync.set({
        visibility: this.checked
    }, update_status);

    // update styles
    if (this.checked)
    {
        visibility_style.innerHTML = ".slider {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
            ".slider:before {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
            ".color-picker-wrapper {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
            "input {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
            "input[type=range]::-webkit-slider-thumb {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}";
    }
    else
    {
        visibility_style.innerHTML = "";
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
        interval: 4,
        visibility: false
    }, function(items) {
        // update values
        document.querySelector(".enable").checked = items.enabled;
        document.querySelector(".color-picker").value = items.color;
        document.getElementById("colorBox").value = items.color;
        document.querySelector("input[type=range]").value = items.opacity*100;
        document.getElementById("breathingInterval").value = items.interval;
        document.querySelector(".visibility").checked = items.visibility;

        // update styles
        document.querySelector(".color-picker-wrapper").style.backgroundColor = items.color;
        document.getElementById("colorBox").style.background = items.color;
        color_style.innerHTML = ".color input:checked + .slider {background-color: " + items.color + ";}";
        document.querySelector('#range-value-bar').style.background = items.color;
        document.querySelector('#range-value-bar').style.setProperty('opacity', items.opacity);
        if (items.visibility)
        {
            visibility_style.innerHTML = ".slider {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
                ".slider:before {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
                ".color-picker-wrapper {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
                "input {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}\n" +
                "input[type=range]::-webkit-slider-thumb {box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);}";
        }
        else
        {
            visibility_style.innerHTML = "";
        }
    });
}

function update_status()
{
    // update status to show options saved
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(function() {
        status.textContent = '';
    }, 750);
}

let color_style = document.createElement('style');
let visibility_style = document.createElement('style');

// execute when popup loaded
document.addEventListener('DOMContentLoaded', function () {
    // restore previous options
    restore_options();
    
    // add listeners
    let enable_check = document.querySelector(".enable");
    enable_check.addEventListener('click', check_enable);
    let color_picker = document.querySelector('.color-picker');
    color_picker.addEventListener('change', change_color);
    let colorbox = document.getElementById("colorBox");
    colorbox.addEventListener('input', change_hex);
    let range_slider = document.querySelector('.range-slider');
    range_slider.addEventListener('change', change_opacity);
    let interval_input = document.getElementById("breathingInterval");
    interval_input.addEventListener('input', change_interval);
    let visibility_check = document.querySelector(".visibility");
    visibility_check.addEventListener('click', check_visibility);

    document.body.appendChild(color_style);
    document.body.appendChild(visibility_style);
    
    // initial update of page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (typeof chrome.app.isInstalled !== 'undefined'){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "update"});
        }
    });
});

