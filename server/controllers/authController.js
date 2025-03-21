import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt, { decode } from 'jsonwebtoken'
import admin from 'firebase-admin'

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User is not registered, Please Register and try again"
            })
        }
        if(!user.isActive){
            return res.status(400).json({
                message:'Your account is deactived please signup with new one'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        //console.log("in here",user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'Password do not match'
            })
        }
        const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role : user.role },
             process.env.JWT_SECRET , { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60,
            sameSite: 'none',
            secure: true
        })
        console.log("Cookie Set:", token);

        res.status(200).json({
            // token,
            preferences: user.preferences,
            message: 'login successful'
        })
        console.log("Token Payload:", { id: user._id, name: user.name, email: user.email });
    }

    catch (error) {
        console.log("Error while login")
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        })
    }

}

export const verify = async (req, res) => {
    console.log(req.user, "Decoded User in Verify:")
    console.log("Received Token from Cookie:", req.cookies.token);

    if (!req.user) {

    } else {
        return res.status(200).json({
            authenticated: true,
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role
        })
    }

}

// export const register = async (req, res) => {
//     try {

//         const { name, password, email } = req.body;
//         const user = await User.findOne({ email });


//         if (user) {
//             return res.status(404).json({
//                 message: "User is already registred"
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({ name, password: hashedPassword, email })

//         console.log("New user registered:", newUser)


//         res.status(201).json({
//             data: newUser,
//             message: "Sucessfully Registred"
//         })
//     }
//     catch (error) {

//     }
// }

export const register = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Set default role to "user"
        const newUser = await User.create({ 
            name, 
            password: hashedPassword, 
            email, 
            role: "user",  // Ensure new users get "user" role
            isActive: true // Ensure user is active by default
        });

        console.log("New user registered:", newUser);

        res.status(201).json({
            data: newUser,
            message: "Successfully Registered"
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body
        //console.log(idToken)
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        console.log("DT", decodedToken)
        const user = await User.findOne({ email: decodedToken.email })
        if (!user) {
            const newUser = new User({
                name: decodedToken.name,
                email: decodedToken.email,
                password: 'google-auth'
            })
            await newUser.save()
        }
        // if(!user.isActive){
        //     return res.status(400).json({
        //         message:'Your account is deactived please signup with new one'
        //     })
        // }


        // here //
        console.log("Google Token Payload:", { id: user._id, name: user.name, email: user.email });

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60,
            sameSite: 'none',
            secure: true
        })

        res.status(200).json({
            // token,
            authenticated: true,
            id: user._id,
            email: user.email,
            name: user.name,
            preferences: user.preferences || {},
            message: 'login successful'
        })
        //console.log("Token Payload:", { id: user._id, name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error)
    }
}

