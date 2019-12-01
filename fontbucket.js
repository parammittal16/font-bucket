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
document.getElementById("deletefont").onclick = deleteFont;
document.getElementById("refresh").onclick = refresh;

function refresh(){
    chrome.tabs.executeScript({
    code: `history.go(0)`
});
}

function postFonts() {
    let url = document.getElementById('fontUrl').value;
    if(url.length !=0)
    {
        flag=0;
        for(let i=0;i<allFonts.length;i++)
        {
            if(url==allFonts[i])
            {
                flag=1;break;
            }
            
        }
        if(!flag)
        {
            let newList = allFonts;
            newList.push(url);
            console.log('2', newList);
            chrome.storage.sync.set({'allFonts':newList}, function() {
                console.log('Value is set to ' + newList);
                getFonts();
            });
            document.getElementById("fontUrl").value="";
        
        }
        else{
            document.getElementById("err").innerHTML="url already exists";

        }
    
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
    // setting default dropdown
    let option = document.createElement("option");
        option.text = "Select your font";
        option.disabled = true;
        option.selected  = true;
        fontDropdown.add(option);
        //
        // adding the fonts to the dropdown
    allFonts.forEach(function (item) {
        let option = document.createElement("option");
        option.text = item;
        fontDropdown.add(option);
    });
    //
}
// Applying font.
function applyFont() {
    let selectedFont = document.getElementById('fonts').value;
    let link = document.createElement("link");
    link.setAttribute("href", selectedFont);
    link.setAttribute("rel", "stylesheet");
    console.log(link);
    let fontName = selectedFont.split('=')[1].split('&')[0];
    let fontNameFinal = fontName.replace(/\+/g, ' ');
    chrome.tabs.executeScript({
        code: `console.log(document.createElement("link").setAttribute("href", '${selectedFont}'));
        document.querySelectorAll('*').forEach(function(item){item.style.fontFamily = '${fontNameFinal}'});`

    });
}
function deleteFont(){
    let url = document.getElementById('fonts').value;
    console.log('1', url);
    let newList = []
    for(let i=0;i<allFonts.length;i++)
    {
        if(allFonts[i]!= url)
        {
            newList.push(allFonts[i]);
            console.log(allFonts[i]);
        }
        
    }
    chrome.storage.sync.set({'allFonts':newList}, function() {
        console.log('Value is set to ' + newList);
        getFonts();
    });

}