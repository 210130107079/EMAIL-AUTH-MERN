import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message: 'Token is not provided'})
    }
    
    try
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: 'Token is invalid'})
        }
        req.userId = decoded.userId
        next()
    }
    catch(error)
    {
        console.error(error)
        return res.status(401).json({message: 'Token is expired'})
    }
}