function doit() {
    let query = `
                insert into users_tbl (name, mail, tel) values
                ("tom2", "to2m@email", "0123");
    `




            // create table if not exists users_tbl
            // (
            //     id integer primary key autoincrement,
            //     name text not null,
            //     mail text,
            //     tel text
            // )


            // let query = `
            // SELECT * FROM users_tbl;
            // `


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


