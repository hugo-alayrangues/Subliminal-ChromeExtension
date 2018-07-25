// check for update when page is focused
window.addEventListener('load', update);
window.addEventListener('focus', update);
window.addEventListener('blur', unfocus);

// custom style for color changes
var sheet = document.createElement('style');
document.body.appendChild(sheet);

// process update message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo == "update")
    {
        update();
    }
});

// update all options
function update()
{
    // alert("in update");
    chrome.storage.sync.get({
        enabled: false,
        color: "",
        opacity: 1.0,
        interval: -1
    }, function(items) {
        var divs = document.body.querySelectorAll("#breathebox"); // check if there's already a box
        if (divs.length < 1 && items.enabled)
        {
            var div = document.createElement("div"); 
            div.setAttribute("id", "breathebox"); 
            document.body.insertBefore(div, document.body.firstChild);
        }
        else if (divs.length > 0 && !items.enabled)
        {
            var div = document.getElementById("breathebox"); 
            div.remove();
        }

        // update color and opacity
        if (items.color != "")
        {
            sheet.innerHTML = "@keyframes breathe { \n" +
                              "0% { box-shadow: \n" +
                              "inset 10px 10px 40px "   + hex_to_rgba(items.color, items.opacity) + ", \n" +
                              "inset -10px -10px 40px " + hex_to_rgba(items.color, items.opacity) + "; } \n" +

                              "50% { box-shadow: \n" +
                              "inset 0px 0px 80px "   + hex_to_rgba(items.color, items.opacity) + ", \n" +
                              "inset -0px -0px 80px " + hex_to_rgba(items.color, items.opacity) + "; } \n" +

                              "100% { box-shadow: \n" +
                              "inset 10px 10px 40px "   + hex_to_rgba(items.color, items.opacity) + ", \n" +
                              "inset -10px -10px 40px " + hex_to_rgba(items.color, items.opacity) + "; } \n" +

                              "}\n";
        }

        if (items.enabled)
        {
            document.getElementById("breathebox").setAttribute('style', 
              "animation: breathe infinite ease " + items.interval + "s;");
        }
    });
}

// remove box if tab unfocused
function unfocus()
{
    var divs = document.body.querySelectorAll("#breathebox");
    if (divs.length > 0)
    {
        var div = document.getElementById("breathebox"); 
        div.remove();
    }
}

// helper function for updating color and opacity
function hex_to_rgba(hex_val, opacity) 
{
    var r = parseInt(hex_val.slice(1, 3), 16);
    var g = parseInt(hex_val.slice(3, 5), 16);
    var b = parseInt(hex_val.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
}