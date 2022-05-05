"use strict";
function doit() {
    let url = "https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja";
    let elm_msg = document.querySelector('#msg');
    // @ts-expect-error
    window.myTestApi.showRSS(url, elm_msg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsSUFBSTtJQUNULElBQUksR0FBRyxHQUFHLG9EQUFvRCxDQUFDO0lBQy9ELElBQUksT0FBTyxHQUFXLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7SUFFdEQsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBSUQsU0FBUyxLQUFLO0lBQ1YsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUVwQyxtQkFBbUI7SUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsbUJBQW1CO1FBQ25CLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakUsbUJBQW1CO1FBQ25CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMifQ==