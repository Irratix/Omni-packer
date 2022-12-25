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
let content = document.getElementById("content");

content.innerHTML += make_radio_button(Languages, "language_selector", "Language");
content.innerHTML += make_radio_button(
    Object.keys(Packers[document.querySelector('input[name="language_selector"]:checked').value]),
    "type_selector",
    "What do you want to pack?"
);

/***** input *****/
content.innerHTML += `
<div>
    <label for="source">Source input:</label>
    <br>
    <textarea id="source" rows="12" cols="60"></textarea>
</div><br>`;

content.innerHTML += `
<button onclick="pack()">Generate Packed Solutions</button>`;

content.innerHTML += `
<input type="checkbox" id="auto_update" name="auto_update" checked>
<label for="auto_update">Auto Update (May be slow)</label><br>`;

/***** output *****/
content.innerHTML += `<div id="output" class="output"></div>`;

function solution_to_html(solution, packer) {
    return `<a>From ${packer.name}:</a><br><a class="code">${solution}</a><br><br>`;
}
