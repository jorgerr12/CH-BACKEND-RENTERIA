import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from "bcrypt"
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHashValue = async (val)=>{
    const salt = await bcrypt.genSalt();
    return await bcrypt.hashSync(val,salt);
}

export const isValidPassword = async (pass,encryptedPass) =>{
 return await bcrypt.compareSync(pass,encryptedPass);
}