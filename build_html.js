/***** radio buttons *****/
function make_radio_button(items, id, text) {
    let radio = `<fieldset id="${id}"> <legend>${text}</legend>`;
    let first = true;
    for (const item of items) {
        radio += `<div><label for="${item}">`;
        radio += `<input name="${id}" type="radio" id="${item}" value="${item}"${first?" checked":""}>`;
        first = false;
        radio += `${item}</label></div>`;
    }
    radio += "</fieldset>";
    return radio;
}

// element to add innerHTML to
let input = document.getElementById("input");
let output = document.getElementById("output");

input.innerHTML += make_radio_button(Languages, "language_selector", "Language");
input.innerHTML += make_radio_button(
    Object.keys(Packers[document.querySelector('input[name="language_selector"]:checked').value]),
    "type_selector",
    "What do you want to pack?"
);

/***** input *****/
input.innerHTML += `
<div>
    <label for="source">Source input:</label>
    <br>
    <textarea id="source" rows="12" cols="60"></textarea>
</div><br>`;

input.innerHTML += `
<button onclick="pack()">Pack</button>`;

input.innerHTML += `
<label for="auto_update">
<input type="checkbox" id="auto_update" name="auto_update" checked>
Auto Update (May be slow)</label><br>`;

function solution_to_html(solution, packer) {
    let str = ""
    str += `<span class="packername">`;
    str += packer.name;
    str += `</span><br>`;
    str += `<textarea class="code" rows="4" readonly>`;
    str += solution;
    str += `</textarea><br><br>`;

    return str;
}

function failed_to_html(packer) {
    let str = "";
    str += `<span class="failure_header">`;
    str += packer.name;
    str += `</span><br>`;
    str += `<span class="failure">`;
    str += packer.limitations;
    str += `</span><br><br>`;

    return str;
}