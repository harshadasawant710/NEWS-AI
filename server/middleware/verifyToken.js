import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if(!token){
        return res.status(401).json({
            authenticated :false,
            message:"No token found"
        })
    }

    const decoded = jwt.verify(token, 'hello_this_string')
    req.user = decoded
    next()
    console.log('.........veryfytoken middleware is running')
}

export default verifyToken