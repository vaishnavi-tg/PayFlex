import { Router } from "express"
import zod from "zod"
import User from "./db./index.js"
import jwt from "jsonwebtoken"

const router = Router()

const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

router.post("/signup", async (req, res) => {
    const body = req.body
    const { success } = signUpSchema.safeParse(req.body)
    if (!success) {
        return res.json({
            message: "Email already taken / Incorrect Inputs "
        })
    }
    const user = User.findOne({
        username: body.username
    })

    if (user._id) {
        return res.json({
            message: "Email already taken / Incorrect Inputs "
        })
    }

    const dbUser = await User.create(body)
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token
    })

})

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signInSchema.safeParse(req.body)
    if (!success) {
        return res.json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })

}
)


export default router