import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    label: string,
    placeholder?: string,
}

export const InputField: React.FC<InputFieldProps> = ({ label, size: _, ...props }) => {
    const [field, { error }] = useField(props)
    //return true or false
    return (<FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name} >{label}</FormLabel>
        <Input {...props} id={field.name} {...field} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>);
}

export default InputField