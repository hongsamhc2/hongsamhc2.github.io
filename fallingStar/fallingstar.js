class FallingStar{
    constructor(select){

        this.canvas;
        this.ctx;
        this.x = 0
        this.w = 20
        this.k = true
        this.xk = true
        this._select = select || 'canvas'
        this.init()
    }


    init = ()=>{
        this.canvas = document.querySelector(this._select) 
        if(!this.canvas) return false;
        this.ctx = this.canvas.getContext('2d')
        this.canvasStyle()
                   this.ctx.fillStyle = 'red'
        this.ctx.fillRect (0, 0,this.canvas.parentNode.offsetWidth,this.canvas.parentNode.offsetHeight);
        window.requestAnimationFrame(this.draw)
    }

    draw=()=>{
        if(this.x>this.canvas.parentNode.offsetWidth-this.w ){
            this.xk = false
        }else if (this.x<0){
           this.xk = true
        }
        if (this.xk){

            this.x += 1
        }else{
            this.x -=1
        }
        if(this.w ===60){
            this.k = false
        }else if(this.w ===20){
            this.k = true
        }

        if(this.k){
            this.w+=1
        }else{
            this.w-=1
        }
        this.ctx.clearRect (0, 0,this.canvas.parentNode.offsetWidth,this.canvas.parentNode.offsetHeight)
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect (0, 0,this.canvas.parentNode.offsetWidth,this.canvas.parentNode.offsetHeight);
        this.ctx.fillStyle = 'blue'
        this.ctx.save()
        this.ctx.translate(0,10)
        // this.ctx.rotate((Math.PI/180)*45);
        this.ctx.fillRect (this.x, 0,this.w,20);
        this.ctx.restore()
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect (this.x, this.w,this.w,this.w);
        window.requestAnimationFrame(this.draw)

       
    }

    getSelect = ()=>{
        return this._select
    }


    canvasStyle=(style={})=>{
        this.canvas.display = 'block'
        this.canvas.width = this.canvas.parentNode.offsetWidth
        this.canvas.height =this.canvas.parentNode.offsetHeight
        this.canvas.parentNode.style.overflow='hidden'

        return this
    }
}