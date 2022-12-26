// reset typeselector when language changes
document.getElementById("language_selector").onclick = function (e) {
    let type_selector = document.getElementById("type_selector");
    type_selector.outerHTML = make_radio_button(
        Object.keys(Packers[document.querySelector('input[name="language_selector"]:checked').value]),
        "type_selector",
        "What do you want to pack?"
    );
};
document.getElementById("language_selector").click();

// update packed solutions on update of input
document.getElementById("source").oninput = (e) => {
    if (!document.getElementById("auto_update").checked)
        return;
    pack();
};

window.onload = function(e) {
    pack();
};