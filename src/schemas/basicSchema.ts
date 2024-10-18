import * as yup from "yup"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

export const basicSchema = yup.object().shape({
    email:yup.string().email("please enter a valid email").required(),
    name:yup.string().min(3,"Name must atleast be 3 characters").required(),
    password:yup.string().min(8,"Must be atleast 8 characters").required("Must be atleast 8 characters")
})