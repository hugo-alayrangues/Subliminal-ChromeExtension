// check for update when page is focused
window.addEventListener('load', update);
window.addEventListener('focus', update);
// window.addEventListener('blur', unfocus);

let updated = false;  // true if update function has already been called

// custom style for color changes
let sheet = document.createElement('style');
document.body.appendChild(sheet);

// process update message
chrome.runtime.onMessage.addListener(function(request) {
    if (request.todo === "update")
    {
        let event = {type: "popup"};
        update(event);
    }
});

// update all options
function update(event)
{
    if (!updated || event.type === "popup") {
        // alert("in update");
        chrome.storage.sync.get({
            enabled: false,
            color: "",
            opacity: 1.0,
            interval: 4
        }, function(items) {
            let divs = document.body.querySelectorAll("#breathebox"); // check if there's already a box
            if (divs.length < 1 && items.enabled)
            {
                let div = document.createElement("div");
                div.setAttribute("id", "breathebox");
                document.body.insertBefore(div, document.body.firstChild);
            }
            else if (divs.length > 0 && !items.enabled)
            {
                let div = document.getElementById("breathebox");
                div.remove();
            }

            // update color and opacity
            if (items.color !== "")
            {
                sheet.innerHTML = "@keyframes breathe { \n" +
                    "0% { opacity: 0.2; }\n" +
                    "50% { opacity: 1; }\n" +
                    "100% { opacity: 0.2; }\n" +
                    "}\n";
            }

            if (items.enabled)
            {
                document.getElementById("breathebox").setAttribute('style',
                    "box-shadow: inset 20px 20px 80px " + hex_to_rgba(items.color, items.opacity) +
                    " , inset -20px -20px 80px " + hex_to_rgba(items.color, items.opacity) + "; " +
                    "animation: breathe infinite cubic-bezier(.5,.1,.3,1) " + items.interval + "s;");
            }

        });

        console.log(event.type);
        console.log("UPDATE");
        updated = true;
    } else {
        console.log("ALREADY UPDATED")
    }

}

// remove box if tab unfocused
// function unfocus()
// {
//     let divs = document.body.querySelectorAll("#breathebox");
//     if (divs.length > 0)
//     {
//         let div = document.getElementById("breathebox");
//         div.remove();
//     }
// }

// helper function for updating color and opacity
function hex_to_rgba(hex_val, opacity) 
{
    let r = parseInt(hex_val.slice(1, 3), 16);
    let g = parseInt(hex_val.slice(3, 5), 16);
    let b = parseInt(hex_val.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
}
