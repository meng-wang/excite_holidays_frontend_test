var img_pos = 1;
var search_dict = new Array("Sydney", "Melbourne", "Perth", "Adelaide", "Brisbane", "Hobart", "Shanghai", "Mexico City", "Beijing");

function NextImg() {
    if(img_pos < 4) {
        img_pos++;
    }
    else {
        img_pos = 1;
    }
    
    shown_imgs = document.getElementsByClassName("carousel-shown");
    shown_imgs[0].className = "carousel-hidden";
    document.getElementById("carousel" + img_pos).className = "carousel-shown";
}

function PreImg() {
    if(img_pos > 1) {
        img_pos--;
    }
    else {
        img_pos = 4;
    }
    
    shown_imgs = document.getElementsByClassName("carousel-shown");
    shown_imgs[0].className = "carousel-hidden";
    document.getElementById("carousel" + img_pos).className = "carousel-shown";
}

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


function SplitText() {
    to_be_hidden = document.getElementById("to-be-hidden");
    to_be_shown_col1 = document.getElementById("to-be-shown-col1");
    to_be_shown_col2 = document.getElementById("to-be-shown-col2");
    
    slice_position = Math.ceil(to_be_hidden.innerHTML.trim().length / 2) - 1;
    col1_text = to_be_hidden.innerHTML.trim().slice(0, slice_position);
    
    while(slice_position < to_be_hidden.innerHTML.trim().length) {
        
        if(col1_text.substr(slice_position - 1, 1) === " "
                || col1_text.substr(slice_position - 1, 1) === "\n"
                || col1_text.substr(slice_position - 1, 1) === "\r") {
            //No words broken. Make sure the last scentence is not broken.
            if(col1_text.substr(slice_position - 2, 1) === "."
                || col1_text.substr(slice_position - 2, 1) === "!"
                || col1_text.substr(slice_position - 2, 1) === "?"
                || col1_text.substr(slice_position - 2, 1) === "\""
                || col1_text.substr(slice_position - 2, 1) === "'") {
                break;
            }
            
        }
        else if(col1_text.substr(slice_position - 4, 4) === "</p>") {
            //Sliced a whole paragraph perfectly.
            break;
        }
        else {
            p_pos = col1_text.substr(slice_position - 36, 36).search("<p>");
            if(p_pos !== -1) {
                //Cut to the head of a paragraph, move forward and slice a full
                //line of a new paragraph
                slice_position = p_pos + 36;
                col1_text = to_be_hidden.innerHTML.trim().slice(0, slice_position);
                break;
            }
        }
        
        col1_text = to_be_hidden.innerHTML.trim().slice(0, ++slice_position);
    }
    
    col1_text += "</p>";
    col2_text = "<p>" + to_be_hidden.innerHTML.trim().substr(slice_position);
    
    to_be_shown_col1.innerHTML = col1_text;
    to_be_shown_col2.innerHTML = col2_text;
    
    to_be_hidden.style.display = "none";
    to_be_shown_col1.style.display = "block";
    to_be_shown_col2.style.display = "block";
}

function ShowTab(tab_name, tab_content_name) {
    tab_contents = document.getElementsByClassName("tab-content");
    tabs = document.getElementsByClassName("tab-selected");
    
    for(i=0; i < tab_contents.length; i++) {
        tab_contents[i].style.display = "none";
    }
    
    document.getElementById(tab_content_name).style.display = "block";
    tabs[0].className = "tab";
    document.getElementById(tab_name).className = "tab-selected";
}

function ShowSub(top_menu_item, sub_menu_name) {
    //Show sub menu if browser is IE 6 or lower version.
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
        var ieversion = new Number(RegExp.$1);
        if (ieversion < 7) {
            top_menu_item.style.backgroundColor = "#272f58";
            top_menu_item.style.color = "white";
            
            document.getElementById(sub_menu_name).style.display = "block";
        }
    }
}

function HideSub(top_menu_item, sub_menu_name) {
    //Hide sub menu if browser is IE 6 or lower version.
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
        var ieversion = new Number(RegExp.$1);
        if (ieversion < 7) {
            top_menu_item.style.backgroundColor = "transparent";
            top_menu_item.style.color = "black";
            document.getElementById(sub_menu_name).style.display = "none";
        }
    }
}

function SearchWord(text_box) {
    //clear suggestion box
    suggestions = document.getElementsByClassName("suggestion");
    for(j=0; j < suggestions.length; j++) {
        document.getElementById("search-suggestion").removeChild(suggestions[j]);
    }
    
    //search keywords and add suggestions
    search_key = document.getElementById("search-box").value.trim().toLowerCase();
    slice_position = search_key.length;
    
    if(slice_position !== 0) {
        for(i=0;i < search_dict.length; i++) {
            if(search_key === search_dict[i].slice(0, slice_position).toLowerCase()) {
                
                found_suggestion = search_dict[i];
                
                list_item = document.createElement("li");
                list_item.className = "suggestion";
                list_item.onclick = function(){FillSuggestion(found_suggestion);};
                suggestion = document.createTextNode(found_suggestion);
                list_item.appendChild(suggestion);
                document.getElementById("search-suggestion").appendChild(list_item);
            }
        }
    }
}

function FillSuggestion(suggestion) {
    //clear suggestion box
    suggestions = document.getElementsByClassName("suggestion");
    for(j=0; j < suggestions.length; j++) {
        document.getElementById("search-suggestion").removeChild(suggestions[j]);
    }
    
    //fill suggestion in search box
    document.getElementById("search-box").value = suggestion;
}

function OnLoad(){
    SetFooter();
    SplitText();
    window.setInterval(function(){NextImg();}, 3000);
}

