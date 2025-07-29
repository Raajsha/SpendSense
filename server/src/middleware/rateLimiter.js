import rateLimit from "../config/upstashConfig.js";

const rateLimiter = async(req,res,next) => {
    try {
        const {success} = await rateLimit.limit("Spendsense")
        if(!success) return res.status(429).json({message: "Too many requests. Please try again later."})

        next()
    } catch (error) {
        console.log("Rate limit error")
    }
}

export default rateLimiter