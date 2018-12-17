var input_ind = 2, output_ind = 10;

var input_button = null, output_button = null;




function change_selection(ind, typ) {
    if (typ == "o") {
        output_ind = ind;

        if (input_button != null) {
            input_button.style.backgroundColor = "#D3D04F";
        }
        var btn;
        if (ind == 2) {
            btn = document.getElementById("bin_button_o");
            btn.style.backgroundColor = '#3177B7';
        }
        else if (ind == 8) {
            btn = document.getElementById("oct_button_o");
            btn.style.backgroundColor = '#3177B7';
        }
        else if (ind == 10) {
            btn = document.getElementById("dec_button_o");
            btn.style.backgroundColor = '#3177B7';
        }
        else {
            btn = document.getElementById("hex_button_o");
            btn.style.backgroundColor = '#3177B7';
        }
        input_button = btn;
    }
    else if (typ == "i") {
        input_ind = ind;
        if (output_button != null) {
            output_button.style.backgroundColor = "#D3D04F";
        }
        var btn;
        if (ind == 2) {
            btn = document.getElementById("bin_button_i");
            btn.style.backgroundColor = '#3177B7';
        }
        else if (ind == 8) {
            btn = document.getElementById("oct_button_i");
            btn.style.backgroundColor = '#3177B7';
        }
        else if (ind == 10) {
            btn = document.getElementById("dec_button_i");
            btn.style.backgroundColor = '#3177B7';
        }
        else {
            btn = document.getElementById("hex_button_i");
            btn.style.backgroundColor = '#3177B7';
        }
        output_button = btn;






    }
    convert_middleware();
    console.log(ind + "of" + typ);
}

var allow_conversion = false;
function convert_middleware() {

    var inp = ("" + document.getElementById("textarea").value).trim();
    console.log(inp + " length is " + inp.length);
    if (input_ind == 2) {

        for (var i = 0; i < inp.length; i++) {

            if (inp[i] != "0" && inp[i] != "1") {
                console.log("Invalid input");
                console.log(document.getElementById("comment").textContent);
                throwError();
                allow_conversion = false;
                break;
            }
            else {
                document.getElementById("comment").textContent = "";
                allow_conversion = true;
            }
        }
    }
    else if (input_ind == 8 || input_ind == 10) {
        for (var i = 0; i < inp.length; i++) {

            var p = parseInt(inp[i]);
            if (isNaN(p)) {
                console.log("Invalid input");
                throwError();
                allow_conversion = false;
                break;

            } else {
                allow_conversion = true;
                document.getElementById("comment").textContent = "";
            }


        }
    }

    else if (input_ind == 16) {
        console.log("here");
        var arr = ['A', 'B', 'C', 'D', 'E', 'F'];
        for (var i = 0; i < inp.length; i++) {

            console.log(inp[i]);

            if (!isNaN(inp[i]) || arr.indexOf(inp[i].toUpperCase()) != -1) {
                allow_conversion = true;

            }
            else {
                allow_conversion = false;
                throwError();
            }
        }
    }

    if (allow_conversion == true) {
        convert(inp);
    }

}
function convert(inp) {
    console.log("converting " + inp);
    var textarea_output = document.getElementById("textarea_output");

    var result = parseInt(inp, input_ind).toString(output_ind).toUpperCase();

    textarea_output.value = result;

    var v = document.getElementById("comment");
    document.getElementById('textarea').style.color = "black";
}
//#region UTILITIES

function throwError(e) {

    if (e == null) {
        e = "Invalid input";
        var v = document.getElementById("comment");
        document.getElementById('textarea').style.color = "#EA4753";

        v.textContent = e;
    }
}



//#endregion


//init();

