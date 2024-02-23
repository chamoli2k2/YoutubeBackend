import { asyncHandler } from "../utils/asyncHandler.utils.js"; 
import { ApiError } from "../utils/apiError.utils.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

// Registering the user
const registerUser = asyncHandler( async (req, res) => {
    // Get user details from frontend
    // Validation
    // Check if already user exist
    // Check for images, check for avatar
    // upload them to clodinary, avatar
    // Create user object - create entry in db
    // Remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullname, email, username, password } = req.body;
    
    if(
        [fullname, email, username, password].some((field) => {
            return field?.trim() === "";
        })
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist!!");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImgLocalPath = req.file?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImgLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    }

    const user = User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser){
        throw new ApiError(500, "Something went wrong while registering the user!!");
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered successfully")
    )
});

export { registerUser };
