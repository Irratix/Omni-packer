Packers["Python"]["code: fewest chars"] = [];

Packers["Python"]["code: fewest chars"].push({
    'name': "no packer",
    'validity_check': function(code) {
        return true;
    },
    'packer': function(code) {
        return code;
    }
});

/**** 3:1 *****/
Packers["Python"]["code: fewest chars"].push({
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
        code += ' '.repeat(code.length * 2 % 3);
        code = new TextEncoder().encode(code);
        for (let i = 0; i < code.length; i += 3) {
            let s = 0, p = 101 * 102 * 103;
            // 101
            let q = Math.floor(p / 101);
            s += q * (code[i] - 32) * 51;
            // 102
            q = Math.floor(p / 102);
            s += q * (code[i + 1] - 32) * 101;
            // 103
            q = Math.floor(p / 103);
            s += q * (code[i + 2] - 32) * 52;
            // code point reached
            compressed += String.fromCodePoint(Math.round(s % p));
        }
        return `exec(bytes(ord(c)%i+32for c in'${compressed}'for i in b'efg'))`;
    }
});