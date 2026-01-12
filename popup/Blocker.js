const template = document.getElementById("li_template"); 
var lis = document.getElementById("blockList");
reloadPopUp();

//console.log("IN"); 

document.getElementById("block").addEventListener('click', function (e){
    //console.log("IN"); 
    storeBlockWebsite(document.getElementById("site_name").value); 
});

function checkURL(string){
    let temp;

    try {
        temp = new URL(string);
    } catch (err) {
        return false;
    }

    return temp.protocol === "http:" || temp.protocol === "https:";
}

function storeBlockWebsite(URL){
    chrome.storage.sync.get("blockedList", function(obj){
        var blockedList = obj.blockedList || []; 
        var flag = blockedList.some((val) => val === URL);
        if(flag){
            showAlert();
        }else if(!checkURL(URL)) {
            showURLAlert();
        }else{
            eraseAlert();

            blockedList.push(URL); 
            chrome.storage.sync.set({"blockedList" : blockedList}).then(() => {
                console.log(URL + "is logged");
                document.getElementById("site_name").value = "";
                reloadPopUp();
            });
        }
        
    });
} 

function deleteBlockWebsite(element){
    chrome.storage.sync.get("blockedList", function(obj){
        var blockedList = obj.blockedList || []; 
        var idx = blockedList.indexOf(element); 

        if(idx > -1){
            blockedList.splice(idx, 1);
            chrome.storage.sync.set({"blockedList" : blockedList}).then(() => {
                console.log(element + "is deleted");
                reloadPopUp();
            });
        }
        
    });
}

function showAlert(){
    var tag = document.getElementById("alert"); 
    tag.textContent = "The website is already blocked"; 
}

function showURLAlert(){
    var tag = document.getElementById("alert"); 
    tag.textContent = "Please Enter a Valid URL with protocol"; 
}

function eraseAlert(){
    var tag = document.getElementById("alert");
    if(!tag)return; 
    tag.textContent = null; 
}

function reloadPopUp(){ 
    eraseAlert();
    chrome.storage.sync.get("blockedList", function(obj){
        var blockedList = obj.blockedList || []; 
        document.getElementById("block count").textContent = blockedList.length;


        while(lis.firstChild){
            lis.removeChild(lis.firstChild);
        }

        blockedList.forEach((element, index) => {
            const clone = template.content.cloneNode(true);

            clone.querySelector("h3").textContent = element; 

            clone.querySelector("li").setAttribute("id", `site ${index}`); 
            clone.querySelector("input").addEventListener('click',() => {
                deleteBlockWebsite(element)
            });

            lis.appendChild(clone); 
        });

    });
}