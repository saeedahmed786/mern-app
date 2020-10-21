import { check, validationResult} from 'express-validator';
import User from './userModel';


 exports.registerValidation = [
  check('name').notEmpty().isLength({min: 6}).custom(
    async (value, {req}) => {
    const check = await User.findOne({name: value})
    if(check){
        return Promise.reject('Name is already in use');
       }
       


    }),
check('email').isEmail().normalizeEmail().withMessage('email is not valid').custom(
    async (value, {req}) => {
    const check = await User.findOne({email: value})
    if(check){
        return Promise.reject('Email is already in use');
       }
       


    }),
check('password').notEmpty().isLength({ min: 6 }).withMessage('password must be atleast 6 characters long'),
  ]

 

 exports.signinRequestValidation = [
    check('email').isEmail().normalizeEmail().withMessage('email is not valid'),
    check('password').isLength({min: 6}).withMessage('Pssword must be atleast 6 charactors long')
     ];




export const isRequestValidated = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      
      return res.status(400).json({
           error: error.array()[0].msg
        });
    }
    next();

}




