var m_alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


function calculate_occurrences(para) {

    var alphas = [];
    var alpha_counts = [];
    var nums = [];
    var num_counts = [];
    var special_chars = [];
    var special_char_counts = [];
    var str = "" + para;
    console.log(str.length);
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (isNaN(c)) {
            if (is_alphabet(c)) {
                var ind = alphas.indexOf(c);
                if (ind == -1) {
                    alphas.push(c);
                    alpha_counts[alphas.length - 1] = 1;
                } else {
                    var v = alpha_counts[ind];
                    v++;
                    alpha_counts[ind] = v;
                }
            } else {
                var ind = special_chars.indexOf(c);
                if (ind == -1) {
                    special_chars.push(c);
                    special_char_counts[special_chars.length - 1] = 1;
                } else {
                    var v = special_char_counts[ind];
                    v++;
                    special_char_counts[ind] = v;
                }

            }
        } else {
            var ind = nums.indexOf(c);
            if (ind == -1) {
                nums.push(c);
                num_counts[nums.length - 1] = 1;
            } else {
                var v = num_counts[ind];
                v++;
                num_counts[ind] = v;
            }

        }

    }



    console.log(alphas);
    console.log(alpha_counts);
    console.log(nums);
    console.log(num_counts);
    console.log(special_chars);
    console.log(special_char_counts);
}
function is_alphabet(v) {

    var ret_val;
    var letter = /^[A-Za-z]/;
    if (v.match(letter)) {
        ret_val = true;
    }
    else {
        ret_val = false;
    }

    // console.log("Match for " + v + " is " + ret_val);
    return ret_val;

}

calculate_occurrences("123321##~~rddpfzoeopphwghssarhplihlnzexnxozxcqswelojdkobuwfrhlergtwlvcdfrizaaxajcddlkomusmwucipiidjmpblnogsolz");