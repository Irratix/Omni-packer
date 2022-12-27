/**
 * This file contains data about different things to pack for, i.e. packing for fewer chars.
 * Most importantly it provides scoring functions for these types, so different methods can be compared automatically.
 */

Packers.evaluators = {
    "code: fewest chars": function(code) {
        return [... code].length;
    },
    "number: fewest chars": function(code) {
        return [... code].length;
    },
    "code: fewest bytes": function(code) {
        return new TextEncoder().encode(code).length;
    },
    "number: fewest bytes": function(code) {
        return new TextEncoder().encode(code).length;
    },
}