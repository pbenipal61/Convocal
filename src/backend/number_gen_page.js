var arr = [];
function init() {
    if (arr.length < 50) {
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
function generate_num() {

    var n;
    n = get_random_int(0, 100);
    while (arr.indexOf(n) != -1) {

        n = get_random_int(0, 100);
    }
    arr.push(convert(n));

    init();



}

function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function one_to_fifty_int() {
    var output_str = `<table border="1"> <tr><th>Decimal</th><th>Binary</th><th>Octa</th><th>Hex</th></tr>`;
    for (var i = 1; i < 51; i++) {
        var res = convert(i);
        output_str = output_str + `<tr><td>${res.decimal}</td><td>${res.binary}</td><td>${res.octa}</td><td>${res.hex}</td></tr>`;
    }
    output_str = output_str + "</table>";
    document.getElementById("output").innerHTML = output_str;
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

