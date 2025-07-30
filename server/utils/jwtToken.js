// export const sendToken = (message, user, res, statusCode) => {
//   const token = user.getJWTToken();
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     user,
//     message,
//     token,
//   });
// };


export const sendToken = (message, user, res, statusCode) => {
  try {
    const token = user.getJWTToken();
    const days = Number(process.env.COOKIE_EXPIRE) || 5; // ensure it's a number

    const options = {
      expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res
      .status(statusCode)
      .cookie("token", token, options)
      .json({
        success: true,
        user,
        message,
        token,
      });
  } catch (err) {
    console.error("sendToken error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Token generation failed" });
  }
};

