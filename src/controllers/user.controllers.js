import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { email, username, fullName, password } = req.body;

  // validation - not empty
  if (
    [fullName, username, fullName, password].some(
      (field) => field?.trim() === ""
    )
  )
    throw new ApiError(400, "All fields are required");

  // check if user already exists : username, email
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser)
    throw new ApiError(409, "User with email or username already exists.");

  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Avatar is required.");
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) throw new ApiError(400, "Avatar is required.");

  // create user object - create entry in db
  const newUser = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
  });

  // remove password and refresh token field from response
  const createUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createUser)
    throw new ApiError(500, "Something went wrong while registering user");

  // return res
  return res
    .status(201)
    .json(new ApiResponse(201, createUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !email)
    throw new ApiError(400, "Userna or Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) throw new ApiError(404, "User doesn't exists.");
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentialss");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // set cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(userId, {
    $set: {
      refreshToken: null,
    },
  });

  // remove cookies
  // cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully."));
});

export { registerUser, loginUser, logoutUser };
