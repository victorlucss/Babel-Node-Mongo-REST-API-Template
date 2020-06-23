import * as yup from "yup";

import { Validations } from "../utils";

const { isNotValid, isRequired, notBlank } = Validations;

function validateSchema(operation){
    switch (operation) {
        default:
            return yup.object().shape({
                email: yup.string().email().typeError(isNotValid).required(isRequired),
                password: yup.string().min(0, notBlank).required(isRequired)
            })
    }
}

export default function validate(data, operation = 'store'){
    if(data){
        return validateSchema(operation).strict().validate(data);
    }
} 