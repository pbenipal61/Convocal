var input_ind = 0, output_ind = 2;

function change_selection(ind,typ){
    if(typ == "o"){
        output_ind = ind;
    }
    else if(typ == "i"){
        input_ind = ind;
    }
    convert_middleware();
    console.log(ind + "of" + typ );
}

var allow_conversion = false;
function convert_middleware(){
    
    var inp = (""+document.getElementById("textarea").value).trim();
    console.log(inp + " length is " + inp.length);
    if(input_ind == 2){

        for(var i = 0 ; i < inp.length ; i ++){

            if(inp[i] != "0" && inp[i] != "1"){
                console.log("Invalid input");
                console.log(document.getElementById("comment").textContent);
                throwError();
                allow_conversion = false;
                break;
            }
            else{
                document.getElementById("comment").textContent = "";
                allow_conversion = true;
            }
        }
    }
    else if(input_ind == 8 || input_ind == 10){
        for(var i = 0 ; i < inp.length ; i ++){

            var p = parseInt(inp[i]);
            if(isNaN(p)){
                console.log("Invalid input");
                throwError();
                allow_conversion = false;
                break;
           
            }else{
                allow_conversion = true;
                document.getElementById("comment").textContent = "";
            }


        }
    }

    else if(input_ind == 16){
        console.log("here");
        var arr = ['A','B','C','D','E','F'] ;
        for(var i = 0 ; i < inp.length ; i ++){

            console.log(inp[i]);

            if(!isNaN(inp[i]) || arr.indexOf(inp[i].toUpperCase()) != -1){
                allow_conversion = true;

            }
            else{
                allow_conversion = false;
                throwError();
            }
        }
    }
    
    if(allow_conversion == true){
        convert(inp);
    }
   
}
function convert(inp){
    console.log("converting " + inp);
    var textarea_output = document.getElementById("textarea_output");
    var result  = parseInt(inp, input_ind).toString(output_ind).toUpperCase();
    textarea_output.value = result;
}
//#region UTILITIES

function throwError(e){

    if(e ==  null){
        e = "Invalid input";
        document.getElementById("comment").textContent = e;
    }
}



//#endregion
   

