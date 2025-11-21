Packers["Common Lisp"]["code: fewest chars"] = [];

Packers["Common Lisp"]["code: fewest chars"].push({
    'name': "no packer",
    'validity_check': function(code) {
        return true;
    },
    'packer': function(code) {
        return code;
    }
});

/**** 3:1 *****/
Packers["Common Lisp"]["code: fewest chars"].push({
    'name': "3:1",
    'authors': "CLOStrophobic and kg583",
    'limitations': "Must contain only ASCII characters above code 31.",
    'validity_check': function(code) {
        code = new TextEncoder().encode(code);
        for (const c of code) 
            if (c < 32 || c > 127)
                return false;
        return true;
    },
    'tips': [
        "Remove newlines in format strings using `~%`.",
        "The top level must be a single form.",
    ],
    'packer': function(code) {
        let compressed = "";
        code += "#.";
        code += ' '.repeat(code.length * 2 % 3);
        code = new TextEncoder().encode(code).reverse();
        for (let i = 0; i < code.length; i += 3) {
            let s = 0, p = 97 * 98 * 99;
            // 97
            let q = 98 * 99;
            s += q * (code[i] - 32) * 49;
            // 98
            q = 97 * 99;
            s += q * (code[i + 1] - 32) * 97;
            // 99
            q = 97 * 98;
            s += q * (code[i + 2] - 32) * 50;
            // code point reached
            compressed += String.fromCodePoint(s % p);
        }
        return `(read-from-string(map'string'int-char(doseq(c"${compressed}"/)(dotimes'3(push(+(mod(char-int c)(+ .'97))32)/)))))`;
    }
});

/**** 3:1 (uppercase) *****/
Packers["Common Lisp"]["code: fewest chars"].push({
    'name': "3:1 (uppercase)",
    'authors': "CLOStrophobic and kg583",
    'limitations': "Must contain only ASCII characters below code 123.",
    'validity_check': function(code) {
        code = new TextEncoder().encode(code);
        for (const c of code) 
            if (c > 122)
                return false;
        return true;
    },
    'tips': [
        "Do not use if you have a string literal with necessarily lowercase content.",
        "The top level must be a single form.",
    ],
    'packer': function(code) {
        let compressed = "";
        code += "#.";
        code += ' '.repeat(code.length * 2 % 3);
        code = new TextEncoder().encode(code.toUpperCase()).reverse();
        for (let i = 0; i < code.length; i += 3) {
            let s = 0, p = 97 * 98 * 99;
            // 97
            let q = 98 * 99;
            s += q * (code[i] - 32) * 49;
            // 98
            q = 97 * 99;
            s += q * (code[i + 1] - 32) * 97;
            // 99
            q = 97 * 98;
            s += q * (code[i + 2] - 32) * 50;
            // code point reached
            compressed += String.fromCodePoint(s % p);
        }
        return `(read-from-string(map'string'int-char(doseq(c"${compressed}"/)(dotimes'3(push(mod(char-int c)(+ .'97))/)))))`;
    }
});