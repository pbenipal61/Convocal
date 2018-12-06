var input_ind = 2, output_ind;

function changeSelection(ind){
    input_ind = ind;
    console.log(ind);
}
function convert(){
    var inp = (""+document.getElementById("textarea").value).trim();
    
    if(input_ind == 0){

        for(var i = 0 ; i < inp.length ; i ++){

            if(inp[i] != "0" || inp[i] != "1"){
                console.log("Invalid input");
                console.log(document.getElementById("comment").textContent);
                document.getElementById("comment").textContent = "Invalid input";
                break;
            }
            else{
                document.getElementById("comment").textContent = "Invalid input";
            }
        }
    }
    else if(input_ind == 1 || input_ind == 2){
        for(var i = 0 ; i < inp.length ; i ++){

            var p = parseInt(inp[i]);
            if(isNaN(p)){
                console.log("Invalid input");
                document.getElementById("comment").textContent = "Invalid input";
                break;
           
            }else{

                document.getElementById("comment").textContent = "";
            }


        }
    }
}
   

