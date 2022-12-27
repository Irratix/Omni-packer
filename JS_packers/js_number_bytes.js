Packers["JavaScript"]["number: fewest bytes"] = [];

Packers["JavaScript"]["number: fewest bytes"].push({
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
Packers["JavaScript"]["number: fewest bytes"].push({
    'name': "hexadecimal bigint",
    'limitations': "Must be a non-negative integer number",
    'validity_check': function(number) {
        return /^\d+$/.test(number);
    },
    'packer': function(number) {
        return `0x${BigInt(number).toString(16)}n`;
    }
});

/***** base ASCII *****/
Packers["JavaScript"]["number: fewest bytes"].push({
    'name': "base ASCII",
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
        for (let xor = 0; xor < 128; xor++) {
            let n = BigInt(number);
            let current = "";
            if ((n & 127n) < 10n) {
                current = `n=${n&127n}n\n`;
                n >>= 7n;
            } else {
                current = `n=0n\n`;
            }
            let encoded = "";
            while (n > 0n) {
                encoded = String.fromCharCode(Number(n & 127n) ^ xor) + encoded;
                n >>= 7n;
            }
            // first test with "quotation marks"
            let encoded_2 = encoded.replace(/\\|\n|\r|"|\0/g, replacer);
            encoded_2 = current + `for(c of"${encoded_2}")n=n<<7n|BigInt(c.charCodeAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
            // next test with 'apostrophes'
            encoded_2 = encoded.replace(/\\|\n|\r|'|\0/g, replacer);
            encoded_2 = current + `for(c of'${encoded_2}')n=n<<7n|BigInt(c.charCodeAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
            // lastly test with `backticks`
            encoded_2 = encoded.replace(/\\|\r|`|\0/g, replacer);
            encoded_2 = current + `for(c of\`${encoded_2}\`)n=n<<7n|BigInt(c.charCodeAt()${xor?'^'+xor:''})`;
            if (encoded_2.length < length) {
                length = encoded_2.length;
                shortest = encoded_2;
            }
        }
        return shortest;
    }
});