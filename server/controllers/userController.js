import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        const users = await User.find({ isActive: true, role: 'user', })
        if (!users) {
            res.status(404).json({
                message: 'No Users found'
            })
        }
        res.status(200).json({
            message: 'success',
            length: users.length,
            data: users
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,

        })
    }
}

export const deleterUser = async () => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({
                message:'No user found'
            })
        }
        user.isActive = false;
        await user.save()
    }
    catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const updateUser = () => {

}