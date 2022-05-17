import React,{useEffect} from 'react';
import { extractZipFile } from '../packages/jszip/extranctZip';

const Zip=()=>{

    useEffect(()=>{

        
    },[])
    const onChange = async (e )=>{
        const data = {}
        extractZipFile(e.target.files[0],"multipart/form-data",data).then(e=>console.log(e))
    }
    

    return(<>
    <label htmlFor='file'>File Select</label>
    <input type="file" id="file" onChange={onChange}></input>
    </>)
}

export default Zip