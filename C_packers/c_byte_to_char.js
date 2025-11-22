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
    'authors': "Lydxn, Sisyphus, KasperKivimaeki and Mukundan314",
    'limitations': "Must contain only newlines and ASCII characters above code 31.",
    'validity_check': function(code) {
        code = new TextEncoder().encode(code);
        for (const c of code)
            if (c != 10 && c < 32 || c > 127)
                return false;
        return true;
    },
    'packer': function(code) {
        let compressed = "";
        code = code.replace(/\n/g, '\\n');
        code += "/".repeat((3 * code.length + 2) % 4);
        const offset = code.length;
        code += "//proc/1/cmdline";
        code += " ".repeat(2 * code.length % 3);
        code = new TextEncoder().encode(code);
        for (let i = 0; i < code.length; i += 3) {
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
        return `p;main(){execlp("c",""+7,"-run",""+${offset+1},p<${offset+16});main(""[p]=L"${compressed}"[p/3]%(99+p++%3)+32);}`;
    }
});

Packers["C"]["code: fewest chars"].push({
    'name': "3:1 (with args)",
    'authors': "Lydxn, Sisyphus and KasperKivimaeki",
    'limitations': "Must contain only newlines and ASCII characters above code 31.",
    'validity_check': function(code) {
        code = new TextEncoder().encode(code);
        for (const c of code)
            if (c != 10 && c < 32 || c > 127)
                return false;
        return true;
    },
    'packer': function(code) {
        code = code.replace(/\n/g, '\\n');
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
        return `char s[999];p,i;main(j,x)int**x;{for(*x--=s+${len-14},*x--="-run";p<${len};*x=s)s[p]=L"${compressed}"[p/3]%(99+p++%3)+32;execvp("c",x);}`;
    }
});
