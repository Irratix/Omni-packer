// reset typeselector when language changes
document.getElementById("language_selector").onclick = function (e) {
    let type_selector = document.getElementById("type_selector");
    type_selector.outerHTML = make_radio_button(
        Object.keys(Packers[document.querySelector('input[name="language_selector"]:checked').value]),
        "type_selector",
        "What do you want to pack?"
    );

    // re-pack when packing type is changed
    document.getElementById("type_selector").oninput = pack_if_auto_update;
};
document.getElementById("language_selector").click();

// pack if language or source is changed
document.getElementById("language_selector").oninput = pack_if_auto_update;
document.getElementById("source").oninput = pack_if_auto_update;

window.onload = function(e) {
    pack();
};

// call pack() if auto_update checkbox is checked
function pack_if_auto_update() {
    if (document.getElementById("auto_update").checked) {
        pack();
    }
}