ctx.save()
ctx.translate(cx,cy)
// ctx.rotate(180 * Math.PI / 180)
ctx.textAlign = 'center'
ctx.rotate(90 * Math.PI / 180)
ctx.rotate(90 * Math.PI / 180 /2)
ctx.translate(0,-r)
ctx.fillText('조',0,0)
ctx.restore()
ctx.save()
ctx.translate(cx,cy)
// ctx.rotate(180 * Math.PI / 180)
ctx.textAlign = 'center'
ctx.rotate(90 * Math.PI / 180)
ctx.rotate(90 * Math.PI / 180 /1.5)
ctx.translate(0,-r)
ctx.fillText('훈',0,0)
ctx.restore()

const canvasParent = canvas.parentNode
const ctx = canvas.getContext('2d')