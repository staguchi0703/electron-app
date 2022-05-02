"use strict";
function doit() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsSUFBSTtJQUNULG1CQUFtQjtJQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFFcEMsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLG1CQUFtQjtRQUNuQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLG1CQUFtQjtRQUNuQixRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDIn0=