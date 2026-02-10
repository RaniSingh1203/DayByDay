import bcrypt from 'bcrypt'
import {pool} from '~~/server/db'

export default defineEventHandler(async(event)=>{
    const {name,email,password}=await readBody(event)

    if(!name ||!email||!password){
        throw createError({statusCode:400,statusMessage:'All Fields Required.'})
    }
    const hashedPass=await bcrypt.hash(password,10)

    await pool.execute(
        'INSERT INTO  users(name ,email,password) VALUES (?,?,?)',
        [name,email,hashedPass]
    )
    return {message:'User Registered Successfully'}
})


