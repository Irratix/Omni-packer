Packers["JavaScript"]["code: fewest chars"] = [];

Packers["JavaScript"]["code: fewest chars"].push({
    'name': "no packer",
    'validity_check': function(code) {
        return true;
    },
    'packer': function(code) {
        return code;
    }
});

/***** 2:1 packer by Xem and Subzey *****/
Packers["JavaScript"]["code: fewest chars"].push({
    'name': "obfusc-a-tweet / 2:1",
    'authors': "Xem and Subzey",
    'src': "https://xem.github.io/codegolf/obfuscatweet.html",
    'limitations': "Only allows extended ASCII. Requires deprecated functions escape() and unescape() in implementation. Requires ES6.",
    'tips': [
        "If the escape pattern of a multi-byte character does not follow pattern /%uD.../, it can be inserted in the encoded string and it will not be replaced. In the evaluated string it will then sit at an even index.",
    ],
    'validity_check': function(code) {
        // all code points must be extended ASCII
        code = [... code];
        for (const idx in code) {
            if (code[idx].codePointAt(0) > 255)
                return false;
        }
        // functions escape() and unescape() must be available
        try {
            unescape(escape("String"));
        } catch (e) {
            return false;
        }
        return true;
    },
    'packer': function(code) {
        // code must be of length two, append a space if it is not
        if (code.length % 2 === 1)
            code += " ";

        // build the escaped string
        let packed = "";
        for (const idx in code) {
            const escaped_pattern = code.codePointAt(idx).toString(16).padStart(2, 0);
            packed += "%uD" + "8C"[idx % 2] + escaped_pattern;
        }
        
        // unescape and return with unpacker
        packed = unescape(packed);
        return `eval(unescape(escape\`${packed}\`.replace(/uD./g,'')))`;
    }
});

/***** 3:1 packer by Román Cortés *****/
Packers["JavaScript"]["code: fewest chars"].push({
    'name': "romancortes / 3:1",
    'authors': "Román Cortés",
    'src': "http://www.romancortes.com/v2/javascript-code-golf.html",
    'limitations': "Effectively only allows charcodes 32-126.",
    'tips': [
        "The moment the packed string is evaluated, variable i is available with value -1",
    ],
    'validity_check': function(code) {
        code = `;${code + ' '.repeat(code.length * 2 % 3)}//`;
        const len_3 = code.length / 3;
        for (const char of [... code.substring(0, len_3)]) {
            let char_code = char.codePointAt(0);
            if (char_code < 32 || char_code > 32 + 96) return false;
        }
        for (const char of [... code.substring(len_3, len_3 * 2)]) {
            let char_code = char.codePointAt(0);
            if (char_code < 32 || char_code > 32 + 95) return false;
        }
        for (const char of [... code.substring(len_3 * 2)]) {
            let char_code = char.codePointAt(0);
            if (char_code < 32 || char_code > 32 + 94) return false;
        }
        return true;
    },
    'packer': function(code) {
        let packed = "";
        code = `;${code + ' '.repeat(code.length * 2 % 3)}//`;
        const len_3 = code.length / 3;
        for (let i = 0; i < len_3; i++) {
            let char_code = code.charCodeAt(i + len_3 * 2) - 32;
            const char_code_2 = code.charCodeAt(i + len_3) - 32;
            while (char_code % 96 !== char_code_2) 
                char_code += 95;
            const char_code_3 = code.charCodeAt(i) - 32;
            while (char_code % 97 !== char_code_3) 
                char_code += 95 * 96;
            packed += String.fromCodePoint(char_code);
        }
        return `for(_=i=98;i--;)for(c of\`${packed}\`)_+=String.fromCharCode(c.codePointAt()%i+32);eval(_)`;
    }
});
