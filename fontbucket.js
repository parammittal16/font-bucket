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

document.getElementById("addFontButton").onclick = postFonts();


// document.getElementById("applyFontButton").onclick = applyFont;

function postFonts() {
    let url = document.getElementById('fontUrl').value;
    
    let newList = allFonts;
    newList.push(url);
    console.log('2', newList);
    chrome.storage.sync.set({'allFonts':newList}, function() {
        console.log('Value is set to ' + newList);
        getFonts();
    });
}

function setOptions() {

    let fontDropdown = document.getElementById('fonts');
    while (fontDropdown.firstChild) {
        fontDropdown.removeChild(fontDropdown.firstChild);
    }
    allFonts.forEach(function (item) {
        let option = document.createElement("option");
        option.text = item;
        fontDropdown.add(option);
    });
}