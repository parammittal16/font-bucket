window.onload = getFonts();
function getFonts(){
    console.log("Hello");
};
document.getElementById("addFontButton").onclick = setFonts;

function setFonts() {
    let url = document.getElementById('fontUrl').value;
    console.log(url);
    //
    chrome.storage.sync.set({allFonts:[]}, function() {
        console.log('Value is set to ' + value);
    });
}