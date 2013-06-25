function SetFooter() {
    if (typeof window.innerWidth !== "undefined") {
            margin_top = window.innerHeight - 40;
    }
    else {
            margin_top = document.documentElement.clientHeight - 40;
    }
    
    document.getElementById("footer").style.top = margin_top + "px";
    document.getElementById("footer").style.display = "block";
}

function OnLoad(){
    SetFooter();
}

