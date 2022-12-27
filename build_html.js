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
    return `<span class="packername">${packer.name}</span><br><code class="code">${fix_unprintables_html(solution)}</code><br><br>`;
}

function failed_to_html(packer) {
    return `<span class="failure_header">${packer.name}</span><br><span class="failure">${packer.limitations}</span><br><br>`;
}

// source: https://stackoverflow.com/a/56148551
function fix_unprintables_html(html) {
    // _spc ==> Single Space Char chr(32)
    // html = html.replace(/ /g, '<span class="_m _spc">&middot;</span>');

    // _tab ==> Tab Stops chr(9)
    // html = html.replace(/\t/g, '<span class="_m _tab">🠖</span>');

    // CarriageReturn chr(13)
    // html = html.replace(/\r/g, '');

    // _brk ==> NewLine chr(10)
    // html = html.replace(/\n/g, '<span class="_m _brk">¶</span><br>');

    // _np  ==> non-printable lower ASCII range chr(0)...chr(31) + personally known char(s)
    html = html.replace(/([\u0000-\u001F\u00AD])/g, '<span class="_m _np">$1</span>');

    // _uc  ==> Upper unicode range starting chr(255)
    html = html.replace(/([\u00FF-\u9999])/g, '<span class="_m _uc">$1</span>');
    return html;
}