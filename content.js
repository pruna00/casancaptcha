let modelURL = browser.runtime.getURL("model.dat");

var cbl = new CBL({
    preprocess: function(img) {
        img.blur();
        img.binarize(110);
        img.colorRegions(50, true);
    },
    fixed_blob_locations: [ 
        { x1:  6, y1: 3, x2: 15, y2: 17 },
        { x1: 17, y1: 3, x2: 26, y2: 17 },
        { x1: 29, y1: 3, x2: 38, y2: 17 },
        { x1: 40, y1: 3, x2: 49, y2: 17 },
        { x1: 52, y1: 3, x2: 61, y2: 17 },
        { x1: 63, y1: 3, x2: 72, y2: 17 } 
    ],
    character_set: "0123456789",
    exact_characters: 6,
    model_file: modelURL,
    model_loaded: function() {
        console.log( "model_loaded" );
        // Don't solve until the model is loaded.
        solve();
    },
    allow_console_log: true
});

var solve = function() {
    console.log( "solve" );
    let captcha = document.getElementById('MainContent_textCaptcha');
    let validatespan = document.getElementById('MainContent_validateCaptcha');
    validatespan.style.display = "inline";
    validatespan.style.cursor = "pointer";
    validatespan.innerText = "Retry";
    validatespan.onclick = solve;

    // Using the saved model, attempt to find a solution to a specific image.
    cbl.solve("MainContent_imageCaptcha").done(function (solution) {
        // Upon finding a solution, fill the solution textbox with the answer.
        captcha.value = solution;
    });
}
