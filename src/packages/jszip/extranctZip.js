import JSZip from 'jszip'

export const loadZipFile = async (file)=>{
    const zip = new JSZip()
    return new Promise((res,rej)=>{
        res(zip.loadAsync(file))
    })

}
export const arrayBufferZipFile = async (file)=>{
    return new Promise(async (res,rej)=>{
        const loadFiles =await loadZipFile(file)
        const data = {}
        loadFiles.forEach(async (f,d)=>{
            const arrayBuffer =d.async('arraybuffer')
            data[f]=arrayBuffer
        })
        res(data)
    })
}

export const extractZipFile = async (file,type="multipart/form-data")=>{
    return new Promise(async (res,rej)=>{
        const arrayBufferData = await arrayBufferZipFile(file)
        for(const k in arrayBufferData){
            const v =await arrayBufferData[k]
            const blob = new Blob([v],{type:type})
            const url = window.URL.createObjectURL(blob)
            arrayBufferData[k] = {blob:blob,url:url}

        }
        res(arrayBufferData)
    })
}

