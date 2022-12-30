Packers["C"]["code: fewest chars"] = [];

Packers["C"]["code: fewest chars"].push({
    'name': "no packer",
    'validity_check': function(code) {
        return true;
    },
    'packer': function(code) {
        return code;
    }
});

/**** 3:1 *****/
Packers["C"]["code: fewest chars"].push({
    'name': "3:1",
    'authors': "Lydxn and Sisyphus",
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
        code += ' '.repeat((code.length + 1) * 2 % 3);
        code += "//proc/1/cmdline";
        code = new TextEncoder().encode(code);
        const len = code.length;
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
            compressed += String.fromCodePoint(s % p);
        }
        return `char s[${len+1}];p;main(){for(;;execlp("tcc",s,"-run",s+${len-14},p<${len}))s[p]=L"${compressed}"[p/3]%(99+p++%3)+32;}`;
    }
});
