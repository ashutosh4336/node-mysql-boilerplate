// @ts-nocheck
const Joi = require('joi');
const PhoneJoi = Joi.extend(require('joi-phone-number'));

const signupUserSchema = Joi.object().keys({
  firstName: Joi.string().lowercase().max(200).required().messages({
    'string.base': 'First name should be string',
    'string.empty': 'First name required',
    'string.max': 'First name should be less than 50 letter',
    'any.required': 'First name is required',
  }),

  lastName: Joi.string().lowercase().max(200).required().messages({
    'string.base': 'Last name should be string',
    'string.empty': 'Last name required',
    'string.max': 'Last name should be less than 50 letter',
    'any.required': 'Last name is required',
  }),

  userName: Joi.string().lowercase().min(3).max(35).required().messages({
    'string.base': 'Username should be string',
    'string.empty': 'Username is required',
    'string.max': 'Username should be less than 35 letter',
    'string.min': 'Username should be atleast 3 letter',
    'any.required': 'Username is required',
  }),

  email: Joi.string()
    .lowercase()
    .max(50)
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'in', 'co', 'uk', 'biz', 'xyz', 'io'],
      },
    })
    .required()
    .messages({
      'string.empty': 'Please Provide a Valid Email address 1',
      'string.required': 'Email is required',
      'string.email': 'Please Provide a Valid Email address',
    }),

  phone: Joi.string()
    // .phoneNumber({ strict: true })
    .min(10)
    .max(20)
    .required()
    .messages({
      'string.empty': 'Contact Number is required',
      'string.phoneNumber': 'Contact Number is required',
      'string.min':
        "Contact number length shouldn't be less than 10 characters",
      'string.max': "Contact number length shouldn't exceed 20 characters",
      'string.required': 'Contact Number is required',
    }),

  password: Joi.string().required(),

  userRole: Joi.string().messages({
    // "USER" , "ADMIN"
    'string.empty': 'Role is required',
    'any.required': 'Role is required',
  }),
});

const loginUserSchema = Joi.object().keys({
  userName: Joi.string().min(3).max(35).optional().messages({
    'string.base': 'Username should be string',
    'string.empty': 'Username is required',
    'string.max': 'Username should be less than 35 letter',
    'string.min': 'Username should be atleast 3 letter',
    'any.required': 'Username is required',
  }),
  email: Joi.string()
    .lowercase()
    .max(50)
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'in', 'co', 'uk', 'biz', 'xyz', 'io'],
      },
    })
    .optional()
    .messages({
      'string.empty': 'Please Provide a Valid Email address',
      'string.required': 'Email is required',
      'string.email': 'Please Provide a Valid Email address',
    }),

  password: Joi.string().required().messages({
    'string.empty': 'Please Provide Password',
    'string.required': 'Please Provide Password',
  }),
});

const updateUserSchema = Joi.object().keys({
  firstName: Joi.string().uppercase().max(200).optional().messages({
    'string.base': 'First name should be string',
    'string.empty': 'First name required',
    'string.max': 'First name should be less than 50 letter',
    'any.required': 'First name is required',
  }),

  lastName: Joi.string().uppercase().max(200).optional().messages({
    'string.base': 'Last name should be string',
    'string.empty': 'Last name required',
    'string.max': 'Last name should be less than 50 letter',
    'any.required': 'Last name is required',
  }),

  email: Joi.string()
    .lowercase()
    .max(50)
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'in', 'co', 'uk', 'biz', 'xyz', 'io'],
      },
    })
    .optional()
    .messages({
      'string.empty': 'GitHub URL is required',
      'string.required': 'GitHub URL required',
      'string.email': 'GitHub URL required',
    }),

  phone: Joi.string()
    // .phoneNumber({ strict: true })
    .min(10)
    .max(20)
    .optional()
    .messages({
      'string.empty': 'Contact Number is required',
      'any.phoneNumber': 'Contact Number is required',
      'string.min':
        "Contact number length shouldn't be less than 10 characters",
      'string.max': "Contact number length shouldn't exceed 20 characters",
      'string.required': 'Contact Number is required',
      'any.invalid': 'Please Provide a Valid Contact Number',
    }),

  password: Joi.string().required(),

  githubUrl: Joi.string().allow(null, '').optional().messages({
    'string.empty': 'GitHub URL is required',
    'any.required': 'GitHub URL required',
  }),

  role: Joi.string().optional().messages({
    'string.empty': 'Role is required',
    'any.required': 'Role is required',
  }),
});

module.exports = { signupUserSchema, updateUserSchema, loginUserSchema };
