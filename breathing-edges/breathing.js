// chrome.runtime.sendMessage({todo: "showPageAction"});

// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete') {
//         update();
//     }
// });

var sheet = document.createElement('style');
document.body.appendChild(sheet);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo == "update")
    {
        update();
    }
});

function update()
{
    chrome.storage.sync.get({
        enabled: false,
        color: ""
    }, function(items) {
        var divs = document.body.querySelectorAll("#breathebox");
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

        if (items.color != "")
        {
            sheet.innerHTML = "@keyframes breathe { \n" +
                              "0% { box-shadow: \n" +
                              "inset 10px 10px 40px "   + items.color + ", \n" +
                              "inset -10px -10px 40px " + items.color + "; } \n" +

                              "50% { box-shadow: \n" +
                              "inset 0px 0px 80px "   + items.color + ", \n" +
                              "inset -0px -0px 80px " + items.color + "; } \n" +

                              "100% { box-shadow: \n" +
                              "inset 10px 10px 40px "   + items.color + ", \n" +
                              "inset -10px -10px 40px " + items.color + "; } \n" +

                              "}";
        }
    });
}