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

function OnLoad(){
    SetFooter();
    SplitText();
}

