function doit() {
    let url = "https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja";
    let elm_msg:Element = document.querySelector('#msg')!;

    // @ts-expect-error
    window.myTestApi.showRSS(url, elm_msg);
}



function doit2() {
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


