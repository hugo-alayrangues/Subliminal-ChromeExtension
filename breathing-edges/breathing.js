// chrome.runtime.sendMessage({todo: "showPageAction"});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo == "enableBox")
    {
        var div=document.createElement("div"); 
        div.setAttribute("id", "breathebox"); 
        document.body.insertBefore(div, document.body.firstChild);
    }
    else if (request.todo == "disableBox")
    {
        var div=document.getElementById("breathebox"); 
        div.remove();
    }
});