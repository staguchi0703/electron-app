"use strict";
function doit() {
    let query = `
    insert into users_tbl (name, mail, tel) values
    ("tom", "tom@email", "0123");
    `;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsSUFBSTtJQUNULElBQUksS0FBSyxHQUFHOzs7S0FHWCxDQUFBO0lBQ0QsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFJRCxTQUFTLEtBQUs7SUFDVixtQkFBbUI7SUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBRXBDLG1CQUFtQjtJQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixtQkFBbUI7UUFDbkIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRSxtQkFBbUI7UUFDbkIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyJ9