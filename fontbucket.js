let allFonts = [];
window.onload = getFonts();

 function getFonts(){
    chrome.storage.sync.get(['allFonts'],function (result){
       console.log(result['allFonts']);
       allFonts = result['allFonts'];
       console.log('1', allFonts);
       setOptions();
    });
};

document.getElementById("addFontButton").onclick = postFonts;
document.getElementById("applyFontButton").onclick = applyFont;

function postFonts() {
    let url = document.getElementById('fontUrl').value;
    if(url.length !=0)
    {
    let newList = allFonts;
    newList.push(url);
    console.log('2', newList);
    chrome.storage.sync.set({'allFonts':newList}, function() {
        console.log('Value is set to ' + newList);
        getFonts();
    });
    }
    else{
        document.getElementById("err").innerHTML="Please add a valid url";
    }
}

function setOptions() {

    let fontDropdown = document.getElementById('fonts');
    while (fontDropdown.firstChild) {
        fontDropdown.removeChild(fontDropdown.firstChild);
    }
    let option = document.createElement("option");
        option.text = "Select your font";
        option.disabled = true;
        option.selected  = true;
        fontDropdown.add(option);
    allFonts.forEach(function (item) {
        let option = document.createElement("option");
        option.text = item;
        fontDropdown.add(option);
    });
}

function applyFont() {
    let selectedFont = document.getElementById('fonts').value;
    let link = document.createElement("link");
    link.setAttribute("href", selectedFont);
    link.setAttribute("rel", "stylesheet");
    console.log(link);
    chrome.tabs.executeScript({
        code: `document.head.appendChild(${link})`
    });
}