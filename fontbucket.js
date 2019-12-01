let allFonts = [];
window.onload = getFonts();

function getFonts(){
    allFonts = [];
    chrome.storage.sync.get(['allFonts'],function (result){
       console.log(result['allFonts']);
       allFonts = result['allFonts'];
       console.log('1', allFonts);
    //    setOptions();
    });
};

document.getElementById("addFontButton").onclick = postFonts;

function postFonts() {
    let url = document.getElementById('fontUrl').value;
    console.log(url);
    getFonts();
    allFonts.push(url);
    console.log('2', allFonts);
    chrome.storage.sync.set({'allFonts':allFonts}, function() {
        console.log('Value is set to ' + allFonts);
    });
}

// function setOptions() {
//     let fontDropdown = document.getElementById('fonts');
//     allFonts.forEach(function (item) {
//         let option = document.createElement("option");
//         option.text = item;
//         fontDropdown.add(option);
//     });
// }
