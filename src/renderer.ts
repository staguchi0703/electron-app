function doit() {
    // @ts-expect-error
    window.myTestApi.getSampleTxtPath();

    // @ts-expect-error
    window.myTestApi.on("res-filePath", (event, path) => {
        console.log(path)
        // @ts-expect-error
        const sampleTxt = window.myTestApi.fs.readFileSync(path, 'utf8');
        // @ts-expect-error
        document.querySelector("#ta").value = sampleTxt;
    })
}


