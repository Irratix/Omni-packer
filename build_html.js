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

document.body.innerHTML += make_radio_button(Languages, "language_selector", "Choose a language");
document.body.innerHTML += make_radio_button(
    Object.keys(Packers[document.querySelector('input[name="language_selector"]:checked').value]),
    "type_selector",
    "What do you want to pack?"
);

/***** input *****/
document.body.innerHTML += `
<div>
    <label for="source">Source input:</label>
    <br>
    <textarea id="source" rows="12" cols="60"></textarea>
</div>`;

document.body.innerHTML += `
<input type="checkbox" id="auto_update" name="auto_update" checked>
<label for="auto_update">Automatically update packers on input (some packers may be very slow)</label><br>`;

document.body.innerHTML += `
<button onclick="pack()">generate packed solutions</button><br><br><br>`;

/***** output *****/
document.body.innerHTML += `<div id="output" class="output"></div>`;

function solution_to_html(solution, packer) {
    return `<a>From ${packer.name}:</a><br><a class="code">${solution}</a><br><br>`;
}
