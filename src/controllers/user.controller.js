import {asyncHandler} from "../utils/asyncHandler.utils.js"
import { ApiError } from "../utils/ApiError.utils.js"
import {User} from "../models/user.model.js"
import { uploadCloudinar } from "../utils/cloudinary.utils.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"

const registerUser= asyncHandler(async (req,res)=>{
    //get user details from frontend
    //validation(checking):-not empty
    //If already Exists:username or email
    //check images and avatar,
    //upload to cloudinary ,avatar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res
const {FullName,email,username,password}=req.body

    if(
        [FullName,email,username,password].some((field)=>field?.trim()===""))
        {
        throw new ApiError(400,"All fields are necessary")
        }

        const existing =await User.findOne({
            $or:[{username},{email}]
        })

        if(existing){
            throw new ApiError(409,"User already exists")
        }

        const avatarlocalPath=req.files?.avatar[0]?.path
        const coverImageLoaclPath=req.files?.CoverImage[0]?.path;
        if(!avatarlocalPath){
            throw new ApiError(400,"Needed Avatar")
        }

        const avatar =await uploadCloudinar(avatarlocalPath)
        const cover=await uploadCloudinar(coverImageLoaclPath)

        if(!avatar){
            throw new ApiError(400,"Needed Avatar")
        }

    const user= await User.create({
            FullName,
            avatar:avatar.url,
            CoverImage:cover?.url || "",
            email,
            password,
            username:username.toLowerCase()

        })

        const createduser=await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if(!createduser){
            throw new ApiError(500,"Something went while registering user")
        }

        return res.status(201).json(
            new ApiResponse(200,createduser,"Userregister Successfully")
        )
})


export {registerUser} 