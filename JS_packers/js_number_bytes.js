Packers["JavaScript"]["number: fewest bytes"] = [];

Packers["JavaScript"]["number: fewest bytes"].push({
    'name': "bigint",
    'limitations': "Must be a positive integer number",
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
    'limitations': "Must be a positive integer number",
    'validity_check': function(number) {
        return /^\d+$/.test(number);
    },
    'packer': function(number) {
        return `0x${BigInt(number).toString(16)}n`;
    }
});