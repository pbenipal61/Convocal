var arr = [];
function init(){
    if(arr.length<50){
        generate_num();
    }else{
        console.log(arr);
    }
}
function generate_num(){
    
        var n ;
        n = get_random_int(0,100);
        while(arr.indexOf(n)!= -1){
        
            n = get_random_int(0,100);
        }
        arr.push(convert(n));
        
        init();

    
    
}

function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convert(inp){
    console.log("converting " + inp);
   
    var binary  = parseInt(inp, 10).toString(2).toUpperCase();
   
    var octa  = parseInt(inp, 10).toString(8).toUpperCase();
    
    var hex  = parseInt(inp, 10).toString(16).toUpperCase();

    var decimalNumWithConversions = new DecimalNumWithConversions(inp,binary,hex,octa);

    return decimalNumWithConversions;
}



class DecimalNumWithConversions{
    constructor(decimal,binary, hex,octa) {
        this.decimal = decimal;
        this.binary = binary;
        this.hex = hex;
        this.octa = octa;
        
    }
}

init();