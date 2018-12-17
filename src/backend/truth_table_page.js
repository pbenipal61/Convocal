function init() {
    inp = String(document.getElementById("input_exp").value);
    if (inp[0] != ")") {
        inp = "(" + inp + ")";
    }

    var r = separate_out_variables(inp);

    if (r != null) {

        process_middleware(r);
    }
    if (inp.length == 0) {
        show_output("");
    }

}
function process_middleware(r) {

    // var table_div = document.getElementById("output");
    // var table = document.createElement('TABLE');
    // table.border = '1';

    // var tableBody = document.createElement('TBODY');
    // table.appendChild(tableBody);


    var bracket_openings = r.bracket_openings;
    var bracket_closings = r.bracket_closings;
    var input_string = "" + r.str;
    var vars = r.vars;

    var variable_neg_check_a = vars[0], variable_neg_check_b = vars[1];

    var output_str = `<table border="1"> <tr>`;
    //<th>${variable_neg_check_b}</th> <th>${r.str}</th></tr>
    if (variable_neg_check_a.indexOf("~") != -1) {
        variable_neg_check_a = variable_neg_check_a[1];
        output_str = output_str + `<th>${variable_neg_check_a}</th> <th>${'~' + variable_neg_check_a}</th>`;
    } else {
        output_str = output_str + `<th>${variable_neg_check_a}</th> `;

    }
    if (variable_neg_check_b.indexOf("~") != -1) {
        variable_neg_check_b = variable_neg_check_b[1];
        output_str = output_str + `<th>${variable_neg_check_b}</th> <th>${'~' + variable_neg_check_b}</th>`;


    } else {
        output_str = output_str + `<th>${variable_neg_check_b}</th> `;
    }

    output_str = output_str + `<th>${r.str}</th></tr>`;
    for (var p = 0; p < 2; p++) {
        for (var q = 0; q < 2; q++) {

            var a = vars[0], b = vars[1];
            output_str = output_str + `<tr><td>${p}</td>`;
            if (a.indexOf("~") != -1) {
                a = a[1];
                output_str = output_str + `<td>${get_not(p)}</td>`;
            }
            output_str = output_str + `<td>${q}</td>`;
            if (b.indexOf("~") != -1) {
                b = b[1];
                output_str = output_str + `<td>${get_not(q)}</td>`;
            }

            console.log("p is " + p + " " + "q is " + q);
            var final_ans = "";
            var solvable_exp = input_string;
            var solvable_brackets = 0;
            for (var i = 0; i < solvable_exp.length; i++) {

                if (solvable_exp[i] == a) {
                    solvable_exp = solvable_exp.replace(solvable_exp[i], p);
                }
                if (solvable_exp[i] == b) {
                    solvable_exp = solvable_exp.replace(solvable_exp[i], q);
                }
            }
            var current_string = solvable_exp;

            while (solvable_brackets < bracket_openings.length) {
                console.log("main current string is " + current_string);
                var a = separate_out_variables(current_string);
                if (a != null) {

                    var bo = a.bracket_openings;
                    console.log("bracket openings are " + bo);
                    var bc = a.bracket_closings;
                    console.log("bracket closings are " + bc);
                    var n1 = bo[bo.length - 1];
                    var n2 = bc[0];
                    if (n2 < n1) {
                        n2 = bc[bc.length - 1];
                    }
                    var sub_str = current_string.substring(n1, n2);
                    console.log("substring before adding para" + sub_str);
                    if (sub_str[sub_str.length - 1] != ")") {
                        sub_str = sub_str + ")";
                    }
                    console.log("current string right here is  " + current_string);
                    console.log(sub_str);
                    var ans = compute_expression(sub_str);
                    console.log("ans is " + ans);
                    if (ans != null) {

                        final_ans = ans;
                        current_string = current_string.replace(sub_str, ans);
                        console.log("current string is " + current_string);
                        solvable_brackets++;

                    } else {
                        break;
                    }


                } else {
                    break;
                }

            }

            output_str = output_str + `<td>${final_ans}</td></tr>`;
            console.log(p + " " + q + " " + final_ans);

            //    output_str = output_str + `<tr><td>${p}</td><td>${q}</td><td>${final_ans}</td></tr>`;

        }
    }
    output_str = output_str + "</table>";
    show_output(output_str);
}

function separate_out_variables(input_string) {
    var syntax_correct = true;
    var vars = [];
    var bracket_openings = [], bracket_closings = [];
    var gates = [];
    input_string = "" + input_string;
    for (var i = 0; i < input_string.length; i++) {
        if (match_for_acceptable_alphabet(input_string[i]) == true) {
            if (input_string[i - 1] == "~") {
                if (vars.indexOf("~" + input_string[i]) == -1) {
                    // console.log("pushing " + inp[i]);
                    vars.push("~" + input_string[i]);
                }
            } else {
                if (vars.indexOf(input_string[i]) == -1) {
                    // console.log("pushing " + inp[i]);
                    vars.push(input_string[i]);
                }
            }


        }
        else if (input_string[i] == "(") {
            if (bracket_openings.indexOf(i) == -1) {
                bracket_openings.push(i);
            }
        }
        else if (input_string[i] == ")") {
            if (bracket_closings.indexOf(i) == -1) {
                bracket_closings.push(i);
            }
        }
        else if (input_string[i] == "/" || input_string[i] == "\\") {

            if (input_string[i] == "\\") {
                if (input_string[i + 1] == "/") {

                    gates.push("or");
                }
                else if (input_string[i - 1] == "/") {
                    gates.push("and");
                }
            }

        } else {
            // if(input_string[i] != "~"){
            //     console.log("Syntax error with " + input_string[i]);
            //     syntax_correct = false;
            // }

        }
    }

    if (bracket_openings.length != bracket_closings.length) {
        console.log("Syntax error");
        syntax_correct = false;
    }
    // console.log(gates);
    // console.log(vars);
    // console.log(bracket_openings);
    // console.log(bracket_closings);

    if (syntax_correct) {
        var syntaxCheckRData = new SyntaxCheckRData(input_string, vars, bracket_openings, bracket_closings, gates);
        return syntaxCheckRData;
    }
    else {
        console.log(input_string + " here");
        return null;
    }

}


//#region TOOLS

function match_for_acceptable_alphabet(v) {

    var ret_val;
    var letter = /^[A-Za-z0-1]/;
    if (v.match(letter)) {
        ret_val = true;
    }
    else {
        ret_val = false;
    }

    // console.log("Match for " + v + " is " + ret_val);
    return ret_val;

}
function get_not(v) {
    if (v == 0) {
        return 1;
    }
    else if (v == 1) {
        return 0;
    }
}

function compute_expression(ex) {

    // console.log("ex is " + ex);
    var r = separate_out_variables(ex);
    var vars = r.vars;
    // console.log("ex gate is " + r.gates);
    console.log("ex vars are " + vars + " and gate is " + r.gates);
    var a, b;
    if (("" + vars[0]).indexOf("~") != -1) {
        a = get_not(Number(vars[0][1]));
    }

    if (("" + vars[1]).indexOf("~") != -1) {
        b = get_not(Number(vars[1][1]));
    }

    if (a == null) {
        a = Number(vars[0]);
    }
    if (b == null) {
        b = Number(vars[1]);
    }

    console.log("a is " + vars[0] + " b is " + vars[1]);
    if (r.gates[0] == "and") {
        if (a == 1 && b == 1) {
            return 1;
        } else if (vars.length == 1 && a == 1) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        if (a == 1 || b == 1) {
            return 1;
        } else if (vars.length == 1 && a == 1) {
            return 1;
        }
        else {
            return 0;
        }
    }



}

function show_output(v) {

    document.getElementById("output").innerHTML = v;
}





//#endregion


class SyntaxCheckRData {
    constructor(str, vars, bracket_openings, bracket_closings, gates) {
        this.str = str;
        this.vars = vars;
        this.bracket_openings = bracket_openings;
        this.bracket_closings = bracket_closings;
        this.gates = gates;

    }
}