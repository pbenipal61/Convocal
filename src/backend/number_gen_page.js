var arr = [];
function init() {
    try {
        var min = document.getElementById("min").value;
        var max = document.getElementById("max").value;
        if (min.length > 0 && max.length > 0) {
            if (arr.length < 100) {
                generate_num();
            } else {
                var output_str = `<table border="1"> <tr><th>Decimal</th><th>Binary</th><th>Octa</th><th>Hex</th></tr>`;
                for (var i = 0; i < arr.length; i++) {
                    var res = arr[i];
                    output_str = output_str + `<tr><td>${res.decimal}</td><td>${res.binary}</td><td>${res.octa}</td><td>${res.hex}</td></tr>`;
                }
                output_str = output_str + "</table>";
                document.getElementById("output").innerHTML = output_str;
            }
        }
    }
    catch{


    }
}
function generate_num() {
    try {
        var min = document.getElementById("min").value;
        var max = document.getElementById("max").value;
        if (min.length > 0 && max.length > 0) {

            min = Number(min);
            max = Number(max);
            var n;
            n = get_random_int(min, max);
            while (arr.indexOf(n) != -1) {

                n = get_random_int(0, 100);
            }
            arr.push(convert(n));

            init();
        }
    }
    catch{

    }





}

function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function one_to_fifty_int() {
    try {
        var min = document.getElementById("min").value;
        var max = document.getElementById("max").value;
        if (min.length > 0 && max.length > 0) {

            min = Number(min);
            max = Number(max);
            var output_str = `<table border="1"> <tr><th>Decimal</th><th>Binary</th><th>Octa</th><th>Hex</th></tr>`;
            for (var i = min; i < max + 1; i++) {
                var res = convert(i);
                output_str = output_str + `<tr><td>${res.decimal}</td><td>${res.binary}</td><td>${res.octa}</td><td>${res.hex}</td></tr>`;
            }
            output_str = output_str + "</table>";
            document.getElementById("output").innerHTML = output_str;
        }
    }
    catch (e) {

    }
}
function convert(inp) {
    console.log("converting " + inp);

    var binary = parseInt(inp, 10).toString(2).toUpperCase();

    var octa = parseInt(inp, 10).toString(8).toUpperCase();

    var hex = parseInt(inp, 10).toString(16).toUpperCase();

    var decimalNumWithConversions = new DecimalNumWithConversions(inp, binary, hex, octa);

    return decimalNumWithConversions;
}



class DecimalNumWithConversions {
    constructor(decimal, binary, hex, octa) {
        this.decimal = decimal;
        this.binary = binary;
        this.hex = hex;
        this.octa = octa;

    }
}

