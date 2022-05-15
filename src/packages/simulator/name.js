

export const generate=(data={f:[],n:[]},num=1)=>{
    let cnt = 1
    const d = {}
    const n = data.n
    let f = data.f
    let c = n.reduce((prev,cur)=>[...prev,...Array.from(cur)],[])

    c = [...new Set(c)]

    const max_num = f.length * c.length * (c.length-1)
    while(cnt <=num){
        const r = __generate(f,c)
        const v = d[r]
        if(v===undefined ){
            d[r] = 0
            cnt += 1
        }
        if(cnt-1>=max_num){
            break
        }
    }
    return Object.keys(d)
}

const __generate =(f=[],c=[])=>{
    let r = ""
    let i = randomInt(f.length)
    r += f[i]
    let ni= randomInt(c.length)
    let ns = c[ni]
    r+=ns
    c = c.filter((v,idx)=>idx!=ni)
    i = randomInt(c.length)
    r+=c[i]
    return r
}


const randomInt = num=>Math.floor(Math.random() * num)