import {Router} from "express"

const router = Router()

router.post("/signup",(req,res)=>{
    res.json({
        "msg":"hi"
    })
})

export default router