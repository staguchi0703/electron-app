function doit() {
    let query = `
    insert into users_tbl (name, mail, tel) values
    ("tom", "tom@email", "0123");
    `
    // @ts-expect-error
    window.myTestApi.doQuery(query);
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


