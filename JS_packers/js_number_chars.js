Packers["JavaScript"]["number: fewest chars"] = [];

Packers["JavaScript"]["number: fewest chars"].push({
    'name': "bigint",
    'limitations': "Must be a non-negative integer number",
    'validity_check': function(number) {
        return /^\d+$/.test(number);
    },
    'packer': function(number) {
        return number.replace(/^0+(?=\d)/, "") + "n";
    }
});

/***** hexadecimal bigint *****/
Packers["JavaScript"]["number: fewest chars"].push({
    'name': "hexadecimal bigint",
    'limitations': "Must be a non-negative integer number",
    'validity_check': function(number) {
        return /^\d+$/.test(number);
    },
    'packer': function(number) {
        return `0x${BigInt(number).toString(16)}n`;
    }
});

/***** base 1<<20 *****/
Packers["JavaScript"]["number: fewest chars"].push({
    'name': "base 2^20",
    'limitations': "Must be a non-negative integer number",
    'validity_check': function(number) {
        return /^\d+$/.test(number);
    },
    'packer': function(number) {
        let shortest = "", length = 1 / 0;
        const replacer = function (char) {
            return {
                '\n': '\\n',
                '\r': '\\r',
                '\'': '\\\'',
                '"': '\\"',
                '\0': '\\0',
                '`': '\\`',
            }[char];
        }
        // build array of digit values
        let values = [];
        number = BigInt(number);
        while (number > 0n) {
            values.push(Number(number & (1n << 20n) - 1n));
            number >>= 20n;
        }
        // loop over potential xor values to avoid characters that need to be escaped
        for (const xor of [0, 1, 2, 128]) {
            let n = BigInt(number);
            let current = "";
            if (values[0] < 10) {
                current = `n=${values.shift()}n\n`;
            } else {
                current = `n=0n\n`;
            }
            let encoded = "";
            for (const code of values) {
                encoded = String.fromCodePoint(code ^ xor) + encoded;
            }
            // first test with `backticks`
            let encoded_2 = encoded.replace(/\\|\r|`|\0/g, replacer);
            encoded_2 = current + `for(c of\`${encoded_2}\`)n=n<<20n|BigInt(c.codePointAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
            if (!encoded.includes("`")) continue;
            // then test with "quotation marks"
            encoded_2 = encoded.replace(/\\|\n|\r|"|\0/g, replacer);
            encoded_2 = current + `for(c of"${encoded_2}")n=n<<20n|BigInt(c.codePointAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
            // lastly test with 'apostrophes'
            encoded_2 = encoded.replace(/\\|\n|\r|'|\0/g, replacer);
            encoded_2 = current + `for(c of'${encoded_2}')n=n<<20n|BigInt(c.codePointAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
        }
        return shortest;
    }
});

/***** base unicode *****/
Packers["JavaScript"]["number: fewest chars"].push({
    'name': "base unicode",
    'limitations': "Must be a non-negative integer number",
    'validity_check': function(number) {
        return /^\d+$/.test(number);
    },
    'packer': function(number) {
        let shortest = "", length = 1 / 0;
        const replacer = function (char) {
            return {
                '\n': '\\n',
                '\r': '\\r',
                '\'': '\\\'',
                '"': '\\"',
                '\0': '\\0',
                '`': '\\`',
            }[char];
        }
        // build array of digit values
        let values = [];
        number = BigInt(number);
        while (number > 0n) {
            values.push(Number(number % 1114111n));
            number /= 1114111n;
        }
        // loop over potential xor values to avoid characters that need to be escaped
        for (const xor of [0, 1, 2, 128]) {
            let n = BigInt(number);
            let current = "";
            if (values[0] < 10) {
                current = `n=${values.shift()}n\n`;
            } else {
                current = `n=0n\n`;
            }
            let encoded = "";
            for (const code of values) {
                encoded = String.fromCodePoint(code ^ xor) + encoded;
            }
            // first test with `backticks`
            let encoded_2 = encoded.replace(/\\|\r|`|\0/g, replacer);
            encoded_2 = current + `for(c of\`${encoded_2}\`)n=n*1114111n+BigInt(c.codePointAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
            if (!encoded.includes("`")) continue;
            // then test with "quotation marks"
            encoded_2 = encoded.replace(/\\|\n|\r|"|\0/g, replacer);
            encoded_2 = current + `for(c of"${encoded_2}")n=n*1114111n+BigInt(c.codePointAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
            // lastly test with 'apostrophes'
            encoded_2 = encoded.replace(/\\|\n|\r|'|\0/g, replacer);
            encoded_2 = current + `for(c of'${encoded_2}')n=n*1114111n+BigInt(c.codePointAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
        }
        return shortest;
    }
});