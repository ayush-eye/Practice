import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    
    const {username, email, fullname, password} = req.body
    
    if (
        [username, email, fullname, password].some(
            (field) => !field || field.trim() === ""
        )
        ) {
        throw new ApiErrors(400, "All fields are required");
        }


    const existedUser = await User.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email }
        ]
        });

    if(existedUser){
        throw new ApiErrors(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    console.log("Avatar local path:", avatarLocalPath);
    console.log("Cover image local path:", coverImageLocalPath);

    if(!avatarLocalPath){
        throw new ApiErrors(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // console.log("Avatar", avatar + "Coverimage", coverImage);

    if(!avatar){
        throw new ApiErrors(400, "Avatar file upload failed. Please try again.")
    }

    console.log("Before user create");


    let user;

    try {
    user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    });
    } catch (error) {
        console.error("❌ USER CREATE ERROR:", error);
        throw error;
    }


    console.log("After user create");

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiErrors(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )
} )

export {registerUser}

