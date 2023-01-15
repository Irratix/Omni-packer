Packers["Elixir"]["code: fewest chars"] = [];

Packers["Elixir"]["code: fewest chars"].push({
    'name': "no packer",
    'validity_check': function(code) {
        return true;
    },
    'packer': function(code) {
        return code;
    }
});

/**** 2:1 *****/
Packers["Elixir"]["code: fewest chars"].push({
    'name': "2:1",
    'validity_check': () => true,
    'tips': [
        "Sometimes the output will have escapes (\\uXXXX). If one appears, it is escaping a bidirectional formatting character to prevent Elixir throwing an error - often, changing a variable name fixes it.",
    ],
    'packer': code => {
        let s = '';
        code = new TextEncoder().encode(code);
        if (code.length % 2) code = [...code, 32];
        for (let i = 0; i < code.length; i += 2) {
            s += String.fromCodePoint(code[i] << 8 | code[i + 1]);
        }
        // elixir no like bidrectional characters so we have to escape them
        for (const c of "\u202A\u202B\u202C\u202D\u202E⁢⁣⁤\u2066\u2067\u2068\u2069") {
            s = s.replaceAll(c, "\\u" + c.codePointAt().toString(16));
        }
        return `Code.eval_string<<"${s}"::utf16>>`;
    }
});

/**** 3:1 *****/
Packers["Elixir"]["code: fewest chars"].push({
    'name': "3:1",
    'limitations': "Must contain only ASCII characters above code 31.",
    'validity_check': function(code) {
        code = new TextEncoder().encode(code);
        for (const c of code) 
            if (c < 32 || c > 127)
                return false;
        return true;
    },
    'packer': function(code) {
        let compressed = "";
        code = new TextEncoder().encode(code);
        code = [...code, ...Array(code.length * 2 % 3).fill(32)];
        for (let i = 0; i < code.length; i += 3) {
            let s = 0, p = 101 * 102 * 103;
            // 101
            let q = 102 * 103;
            s += q * (code[i] - 32) * 51;
            // 102
            q = 101 * 103;
            s += q * (code[i + 1] - 32) * 101;
            // 103
            q = 101 * 102;
            s += q * (code[i + 2] - 32) * 52;
            // code point reached
            compressed += String.fromCodePoint(s % p);
        }
        return `Code.eval_string for c<-'${compressed}',i<-'efg',do: 32+rem c,i`;
    }
});