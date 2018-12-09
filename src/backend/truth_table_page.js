var inp = "";

function init(){
    inp = String(document.getElementById("input_exp").value);
    if(inp[inp.length - 1] == "\\"){
        document.getElementById("input_exp").value = inp+"/";
    }else if(inp[inp.length - 1] == "/"){
        document.getElementById("input_exp").value = inp+"\\";
    }
    if(inp.length > 0){
        process_input();
    }
   
    
}
var bracket_openings = [];
var bracket_closings = [];
var num_enclosures = 0;
function process_input(){
    var temp_num_enclosures = 0;
    var temp_num_enclosures_closing = 0;
    if(inp.indexOf("(") != -1){
        for(var i = 0; i < inp.length ; i++){
            if(inp[i] == '('){
                temp_num_enclosures ++;
                if(bracket_openings.indexOf(i) == -1){
                    bracket_openings.push(i);
                }
                
            }
            if(inp[i] == ')'){
                temp_num_enclosures_closing ++;
                bracket_closings.push(i);
                
            }
        }
        if(temp_num_enclosures != temp_num_enclosures_closing){
            console.log("Syntax error");
        }else{
            num_enclosures = temp_num_enclosures;
            console.log(num_enclosures);
            
            console.log("os are " + bracket_openings);
            // var substr  = inp.substring(inp[bracket_openings[bracket_openings.length-1]],inp[bracket_closings[0]]);
            // console.log(inp[bracket_openings[bracket_openings.length-1]]+" "+inp[bracket_closings[0]])
            // console.log(substr);


        }
        
        
    }else{
            var vars = [];
            console.log("No enclosures found");
            solve_part(inp);
            
    }
    
var allow_sol = true; var computation_type="";    
function solve_part(inp2){
    var last_checked_index  = -1;
    if(inp2[0] == '~' || alphabet_check(inp2[0]) == true){
                
        if(alphabet_check(inp2[0]) == true){
            vars.push(inp2[0]);
            last_checked_index = 0;
            
            console.log(vars);
        }
        else{
            if(alphabet_check(inp2[last_checked_index+1])){
                vars.push("~"+inp2[last_checked_index +1]);
                last_checked_index = 1;
                console.log(vars);
                
            }
            else{
                allow_sol = false;   
                console.log( "second char is not a letter or curly");
            }
        }


        if(inp2[last_checked_index+1] == "\\" || inp2[last_checked_index+1] == "/" ){
            
            if(inp2[last_checked_index+1] == "\\"){
                
                computation_type = "or";
            }
            else if(inp2[last_checked_index+1] == "/" ){
                computation_type = "and";

            }
            last_checked_index = last_checked_index + 1;
            
        }else{
            allow_sol = false;   
            console.log(last_checked_index+1 + " "+ "doesnt define operator");
        }

        if(alphabet_check(inp2[last_checked_index+2])==true ){
            
            vars.push(inp2[last_checked_index+2]);
            last_checked_index = last_checked_index+2;
     
        }
        else{
            if(alphabet_check(inp2[last_checked_index+3])==true && inp2[last_checked_index+2] == '~'){
                vars.push("~"+inp2[last_checked_index+3]);
                last_checked_index = last_checked_index+3;
            
            }
            else{
                 allow_sol = false;   
                console.log(inp2[last_checked_index+3] + " " + "isnt curly or letter");

            }

        }


    }
    else{
        allow_sol = false;   
        console.log("First letter is not a letter or curly");
    }


    console.log(allow_sol);
    if(allow_sol != false ){
        compute(vars,computation_type);
    }

}

function compute(vars,type){
    console.log("final variables are " + vars);
        for(var p = 0 ; p < 2 ; p++){
            for(var q = 0 ; q < 2 ; q++){
                console.log(p + " " + q +" " +gate_check(p,q,type));
                
            }
        }
}

function gate_check(p,q,type){
    console.log(type);
    if(type == "or"){
        if(p == 1 || q == 1){
           return 1;
        }
        else{
           return 0;
        }
    }else if(type == "and"){
        if(p == 1 && q == 1){
            return 1;
        }
        else{
            return 0;
        }

    }
}

   // #region tools  
function alphabet_check(v){
    try{
        var letter = /^[A-Za-z]+$/;;
        if(v.match(letter))
        {
          return true;
        }
        else
        {
          return false;
        }
    }
    catch(e){
        return false;
    }
   
}

    //#endregion


}