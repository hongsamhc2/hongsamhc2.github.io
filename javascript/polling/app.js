var ele_canvas = document.getElementById("canvas");
// 3. 드로잉용 컨텍스트 생성        
var context_canvas = ele_canvas.getContext("2d");
// 4. 생성한 컨텍스트를 이용해서 드로잉하기
context_canvas.fillStyle = "#cc0000"; // 색상
context_canvas.fillRect(0, 0, 300, 300); // 도형

window.addEventListener('keydown',(e)=>{
    console.log(e.keyCode)
})