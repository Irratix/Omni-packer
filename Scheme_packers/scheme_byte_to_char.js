Packers["Scheme"]["code: fewest chars"] = [];

Packers["Scheme"]["code: fewest chars"].push({
    'name': "no packer",
    'validity_check': function(code) {
        return true;
    },
    'packer': function(code) {
        return code;
    }
});

/**** 2:1 *****/
Packers["Scheme"]["code: fewest chars"].push({
    'name': "2:1",
    'validity_check': () => true,
    'tips': [
        "The top level must be a single form.",
    ],
    'packer': code => {
        let s = '';
        code = new TextEncoder().encode(code);
        if (code.length % 2) code = [...code, 32];
        for (let i = 0; i < code.length; i += 2) {
            s += String.fromCodePoint(code[i] << 8 | code[i + 1]);
        }
        return `(eval(read(open-input-string(utf8->string(string->utf16"${s}")))))`;
    }
});

/**** 3:1 *****/
Packers["Scheme"]["code: fewest chars"].push({
    'name': "3:1",
    'authors': "kg583",
    'limitations': "Must contain only ASCII characters above code 31.",
    'validity_check': function(code) {
        code = new TextEncoder().encode(code);
        for (const c of code) 
            if (c < 32 || c > 127)
                return false;
        return true;
    },
    'tips': [
        "The top level must be a single form.",
    ],
    'packer': function(code) {
        let compressed = "";
        code = new TextEncoder().encode(code);
        code = [...code, ...Array(code.length * 2 % 3).fill(32)];
        for (let i = 0; i < len; i += 3) {
            let s = 0, p = 99 * 100 * 101;
            // 99
            let q = 100 * 101;
            s += q * (code[i] - 32) * 50;
            // 100
            q = 99 * 101;
            s += q * (code[i + 1] - 32) * 99;
            // 101
            q = 99 * 100;
            s += q * (code[i + 2] - 32) * 51;
            // code point reached
            compressed += String.fromCodePoint(s % p + 32);
        }
        return `(eval(read(open-input-string(fold-left(lambda'}(format"~a~{~a~}".'(map(lambda(x)(integer->char(+(mod(char-}#\ )x)32)))'(97 98 99))))""(string->list"${compressed}")))))`;
    }
});