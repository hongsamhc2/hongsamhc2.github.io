const canvas = document.querySelector('canvas')
const lineWidth = document.querySelector('#lineWidth')
const gap = document.querySelector('#gap')
const speed = document.querySelector('#speed')

const canvasParent = canvas.parentNode
const ctx = canvas.getContext('2d')

canvas.width = canvasParent.clientWidth
canvas.height = canvasParent.clientHeight
canvasParent.style.overflow = 'hidden'
// canvas.style.backgroundColor = 'black'

const w = canvas.width;
const h = canvas.height;

const cx = w/2
const cy = h/2
const r = (w>h)?w/10:h/10
let startAngle = 0
let lw = 3
// let g = parseFloat(gap.value)
g = 90 * (Math.PI/180)
console.log(g)

// let g = parseFloat(gap.value)
let s = parseFloat(speed.value)
let endAngle = startAngle + g
let deg = g * (180/ Math.PI);
let p = g


lineWidth.addEventListener('change',(e)=>{
    lw = e.target.value
})
gap.addEventListener('change',(e)=>{
    g = parseFloat(e.target.value)

})
speed.addEventListener('change',(e)=>{
    s = parseFloat(e.target.value)
})

const oo = [ctx]
function draw(){

    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle='blue'
    ctx.lineWidth = lw
    ctx.translate(cx,cy)
    ctx.rotate(90 * Math.PI / 180)
    ctx.arc(0, 0, r, startAngle, endAngle, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore()
    
    ctx.save()
    ctx.beginPath();
    ctx.translate(cx-7.5,cy-15)
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 30);
    ctx.lineTo(15, 15);
    ctx.closePath();
    // the outline
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    ctx.restore()
    oo.push(ctx)
    ctx.save()
    ctx.beginPath();
    ctx.translate(cx-41,cy-15)
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 30);
    ctx.lineTo(15, 15);
    ctx.closePath();
    // the outline
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    ctx.restore()
    oo.push(ctx)
    
}

canvas.addEventListener('mousemove',(e)=>{
    const x = e.pageX
    const y = e.pageY
    console.log(x,y)
    oo.map(el=>{

        console.log(el.isPointInPath(el,x,y))
    })
})

function animate(){
    ctx.clearRect(0,0,w,h);
    draw()
    update()
    // window.requestAnimationFrame(animate)
}

function update(){
    startAngle +=s
    if (startAngle>=360 * Math.PI / 180){
        startAngle =0
    }
    endAngle = startAngle+g
}

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
window.requestAnimationFrame(animate)