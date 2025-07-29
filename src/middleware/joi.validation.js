import Joi from 'joi';

// Password must be 8+ chars, with 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

const authSchema = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  changePassword: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().pattern(passwordRegex).required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.',
      }),
  }),
};

const otpSchema = {
  sendOtp: Joi.object({
    mobileNo: Joi.string().required(),
  }),
  verifyOtp: Joi.object({
    mobileNo: Joi.string().required(),
    otp: Joi.string().required(),
  }),
};

const citySchema = {
  addCity: Joi.object({
    cityName: Joi.string().required(),
    cityCode: Joi.string().required(),
    sequence: Joi.number().integer(),
    isActive: Joi.boolean(),
  }),
  editCity: Joi.object({
    cityName: Joi.string(),
    cityCode: Joi.string(),
    sequence: Joi.number().integer(),
    isActive: Joi.boolean(),
  }),
};

const hubSchema = {
    addHub: Joi.object({
        hubName: Joi.string().required(),
        hubCode: Joi.string().required(),
        cityId: Joi.number().integer().required(),
        isActive: Joi.boolean(),
    }),
    editHub: Joi.object({
        hubName: Joi.string(),
        hubCode: Joi.string(),
        cityId: Joi.number().integer(),
        isActive: Joi.boolean(),
    }),
};

const clusterSchema = {
    addCluster: Joi.object({
        clusterName: Joi.string().required(),
        clusterCode: Joi.string().required(),
        hubId: Joi.number().integer().required(),
        isActive: Joi.boolean(),
    }),
    editCluster: Joi.object({
        clusterName: Joi.string(),
        clusterCode: Joi.string(),
        hubId: Joi.number().integer(),
        isActive: Joi.boolean(),
    }),
};

const societySchema = {
    addSociety: Joi.object({
        societyName: Joi.string().required(),
        societyCode: Joi.string().required(),
        pinCode: Joi.string().required(),
        clusterId: Joi.number().integer().required(),
        isActive: Joi.boolean(),
    }),
    editSociety: Joi.object({
        societyName: Joi.string(),
        societyCode: Joi.string(),
        pinCode: Joi.string(),
        clusterId: Joi.number().integer(),
        isActive: Joi.boolean(),
    }),
};

export { validationMiddleware, authSchema, otpSchema, citySchema, hubSchema, clusterSchema, societySchema };