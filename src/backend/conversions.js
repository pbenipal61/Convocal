function binto(){

    var binary = "101101";
    var decimal = parseInt(binary, 2);
    console.log(decimal);
    var octal = parseInt(binary, 2).toString(8);
    console.log(octal);
    var hex = parseInt(binary , 2).toString(16).toUpperCase();
    console.log(hex);
}


function octto(){

    var oct = 55;
    var octs = oct.toString();
  var dec = 0;
  for(var i = 0 ; i < octs.length ; i++){

    console.log(i +" , " + octs[i] + " , " + Math.abs(i - octs.length + 1));
        dec = dec + Number(octs[i])*Math.pow(8,Math.abs(i - octs.length + 1));

  }

  console.log(dec);


  var  binr = "";
  for(var i = 0 ; i < octs.length ; i++){

    console.log(binr);
    var n = Number(octs[i]);
    var m = (+octs[i]).toString(2).trim();
    binr = binr+ m;

    console.log(m);
  }

  console.log(binr.toString());
}
binto();
octto();

