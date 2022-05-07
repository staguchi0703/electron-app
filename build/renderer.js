"use strict";
function doit() {
    let query = `
                insert into users_tbl (name, mail, tel) values
                ("tom2", "to2m@email", "0123");
    `;
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
        console.log(path);
        // @ts-expect-error
        const sampleTxt = window.myTestApi.fs.readFileSync(path, 'utf8');
        // @ts-expect-error
        document.querySelector("#ta").value = sampleTxt;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsSUFBSTtJQUNULElBQUksS0FBSyxHQUFHOzs7S0FHWCxDQUFBO0lBS08sdUNBQXVDO0lBQ3ZDLElBQUk7SUFDSiw0Q0FBNEM7SUFDNUMsMEJBQTBCO0lBQzFCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsSUFBSTtJQUdKLGdCQUFnQjtJQUNoQiwyQkFBMkI7SUFDM0IsSUFBSTtJQUdaLG1CQUFtQjtJQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBSUQsU0FBUyxLQUFLO0lBQ1YsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUVwQyxtQkFBbUI7SUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsbUJBQW1CO1FBQ25CLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakUsbUJBQW1CO1FBQ25CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMifQ==