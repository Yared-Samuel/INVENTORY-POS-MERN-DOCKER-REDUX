const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


// generate token using user._id and JWT_SECRET that expires in one day
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register new user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Fill in all required fieslds!");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 charachters!");
  }
  // check if email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already been exists!");
  }

  // Create new user

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  //  Generate Token by calling the genereateToken function

  const token = generateToken(user._id);

  // Send  HTTP-only cookie

  res.cookie('token', token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),  // one day
    sameSite: "none",
    secure: true
  });

  if (user) {
    const { _id, name, email, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      token,
      role
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});


// Login User

    const loginUser = asyncHandler(async (req, res) => {
        const {password, email} = req.body;
        // validate request
        if(!email || !password) {
            res.status(400);
            throw new Error("Add email and password");
        }
        // check if user exists
        const user = await User.findOne({email})
      
        if(!user) {
            res.status(400)
            throw new Error("User not found, Please Sign up!")
        }

        //Role
        const role = user.role

        // User Exists, Check if password is correct

        const passwordIsCorrect = await bcrypt.compare(password, user.password);

            //  Generate Token by calling the genereateToken function

        const token = generateToken(user._id);
        // Send  HTTP-only cookie
        res.cookie('token', token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),  // one day
            // sameSite: "none",
            // secure: true
        });
        
        if(user && passwordIsCorrect) {
          
            const { _id, name, email } = user;
            res.status(200).json({
            _id,
            name,
            email,
            role,
            token
            });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
        }
    )


    // Logout user
    const logout = asyncHandler(async (req, res) =>{
        res.cookie('token', "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),  // expire now
            sameSite: "none",
            secure: true,
            
        });

        return res.status(200).json({message: "Succesfully Logged Out!"})

    })

    // Get user data

    const getUser = asyncHandler(async(req, res)=>{
        const user = await User.findById(req.user._id)
        if (user) {
            const { _id, name, email } = user;
            res.status(201).json({
              _id,
              name,
              email,
              
            });
          } else {
            res.status(400);
            throw new Error("User not found");
          }
    })

    // Get login Status

    const loginStatus = asyncHandler (async (req, res) => {
        const token = req.cookies.token;
        if(!token){
            return res.json(false)
        }
        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(verified){
            return res.json(true)
        }
    })

    const updateUser = asyncHandler(async(req, res)=>{
        const user = await User.findById(req.user._id)
        if(user) {
            const {name, email} = user;
            user.email = email;
            user.name = req.body.name || name;

            const updatedUser = await user.save()
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name, 
                email: updatedUser.email,
            })
        }else {
            res.status(404)
            throw new Error("User not found!")
        }
    })

    const changePassword = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        const {oldPassword, password} = req.body
        // check the user
        if(!user) {
            res.status(400)
            throw new Error("User not found, please signup!")
        }
        // Validate
        if(!oldPassword || !password) {
            res.status(400)
            throw new Error("Please add old and new password")
        }
        // check if old password mathes password in db
        const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)
        // save new password
        if(user && passwordIsCorrect) {
            user.password = password
            await user.save()
            res.status(200).send("password changed succesfull")
        } else{
            res.status(400)
            throw new Error("Old password is incorrect!")
        }
    })

module.exports ={ 
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword
};
