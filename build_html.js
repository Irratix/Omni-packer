/***** radio buttons *****/
function make_radio_button(items, id, text) {
    let radio = `<fieldset id="${id}"> <legend>${text}</legend>`;
    let first = true;
    for (const item of items) {
        radio += `<div> <input name="${id}" type="radio" id="${item}" value="${item}"${first?" checked":""}>`;
        first = false;
        radio += `<label for="${item}">${item}</label> </div>`;
    }
    radio += "</fieldset><br>";
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
<input type="checkbox" id="auto_update" name="auto_update" checked>
<label for="auto_update">Auto Update (May be slow)</label><br>`;

function solution_to_html(solution, packer) {
    return `<span class="packername">${packer.name}</span><br><textarea class="code" rows="4" readonly>${solution}</textarea><br><br>`;
}

function failed_to_html(packer) {
    return `<span class="failure_header">${packer.name}</span><br><span class="failure">${packer.limitations}</span><br><br>`;
}