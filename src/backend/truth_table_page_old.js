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
    bracket_closings.length = 0;
    bracket_openings.length = 0;
    if(inp.indexOf("(") != -1){
        for(var i = 0; i < inp.length ; i++){
            if(inp[i] == '('){
                temp_num_enclosures ++;
                if(bracket_openings.indexOf(i) == -1){
                    bracket_openings.push(i);
                }
                
            }
            if(inp[i] == ')'){
                temp_num_enclosures_closing++;
                if(bracket_closings.indexOf(i) == -1){
                    bracket_closings.push(i);
                }
            }
        }
        if(temp_num_enclosures != temp_num_enclosures_closing){
            console.log("Syntax error");
        }else{
            num_enclosures = temp_num_enclosures;
            console.log(num_enclosures);
            
            console.log("openings are " + bracket_openings);
            console.log("closings are " + bracket_closings);
            var brack_solving = 0;
            var final_exp = inp;
            while(brack_solving < bracket_openings.length){
                var substr  = inp.substring(bracket_openings[bracket_openings.length-1]+1,bracket_closings[brack_solving]);
                var return_from_syncheck = syntax_check(substr);
                if(return_from_syncheck!=null){
                    var ans = compute(return_from_syncheck.vars,return_from_syncheck.type);
                    final_exp.replace("("+substr+")",ans);
                    console.log(final_exp);
                    brack_solving++;
                    console.log(brack_solving);
                }else{

                }
                
            }
            
            
            


        }
        
        
    }else{
            var vars = [];
            console.log("No enclosures found");
          //  solve_part(inp);
            
    }
    
  
function syntax_check(inp2){
    var computation_type="";   
    var allow_sol = true;
    console.log("syntax  check of " + inp2);
    var vars = [];
    var last_checked_index  = -1;
    if(inp2[last_checked_index + 1] == '~' || alphabet_check(inp2[last_checked_index + 1] ) == true){
                
        if(alphabet_check(inp2[last_checked_index + 1]) == true){
            vars.push(inp2[last_checked_index + 1]);
            last_checked_index = last_checked_index + 1;
            
            
        }
        else{
            if(alphabet_check(inp2[1])){
                vars.push("~"+inp2[1]);
                last_checked_index = 1;
               
                
            }
            else{
                allow_sol = false;   
                console.log( "error in defining variables at 0 or 1");
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
            console.log("operator wasnt defined");
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
                console.log("second variable wasnt defined");

            }

        }


    }
    else{
        allow_sol = false;   
        console.log("First letter is not a letter or curly");
    }
    console.log("Allow sol is " + allow_sol);
    if(allow_sol == false){
        
        return null;
    }else{
        console.log("vars are " + vars);
        console.log("computation type be " + computation_type);
        var syntaxCheckRData = new SyntaxCheckRData(vars,computation_type);
        return syntaxCheckRData;
    }



    // console.log(allow_sol);
    // if(allow_sol != false ){
    //     compute(vars,computation_type);
    // }

}

function compute(vars,type){
    console.log("final variables are " + vars +" and gate is " + type);
   
        // for(var p = 0 ; p < 2 ; p++){
        //     for(var q = 0 ; q < 2 ; q++){
        //         var a = p, b = q;
        //         if(vars[0].indexOf("~") != -1){
                    
        //             a = get_not(p);
        //         }
        //         if(vars[1].indexOf("~") != -1){
        //             console.log(q);
        //             b = get_not(q);
        //         }
        //         console.log(a + " " + b +" " +gate_check(a,b,type));
                
        //     }
        // }
    var a,b;
        if(vars[0].indexOf("~") != -1){
                    
            a = get_not(p);
        }
        if(vars[1].indexOf("~") != -1){
            console.log(q);
            b = get_not(q);
        }
        console.log(a + " " + b +" " +gate_check(a,b,type));
        return gate_check(a,b,type);
        
}



   // #region tools  


function gate_check(p,q,type){
  //  console.log(type);
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


function alphabet_check(v){
    try{
        var letter = /^[A-Za-z0-1]+$/;;
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

function get_not(v){
    if(v == 0){
        return 1;
    }
    else if(v ==1 ){
        return 0;
    }
}

    //#endregion


}

class SyntaxCheckRData {
    constructor(vars, type) {
        this.vars = vars;
        this.type = type;
        
    }
}