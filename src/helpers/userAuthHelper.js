const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Sign JWT and return
const generateSignedJwtToken = (user, role) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userRole: role,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Match User Entered password to hashed password in DB
const matchPassword = async (enteredPassword, user) =>
  await bcrypt.compare(enteredPassword, user.password);

//   Encrypt the password before crearing User
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { generateSignedJwtToken, matchPassword, encryptPassword };
