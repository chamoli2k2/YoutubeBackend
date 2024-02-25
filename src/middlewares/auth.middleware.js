import Jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { User } from "../models/user.models.js";

const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        // // Log the entire req object to inspect incoming request details
        // console.log("Request Object:", req);

        // // Check if cookies are present in the request
        // console.log("Cookies:", req.cookies);

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
})

export default verifyJWT;
