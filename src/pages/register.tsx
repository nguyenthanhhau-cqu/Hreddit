import React, { Fragment } from 'react'
import {

    Button,
} from "@chakra-ui/react"

import { Formik, Form } from "formik"
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation, useQuery } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';

interface registerProps {

}

export const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    const [, register] = useRegisterMutation()
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const res = await register({ userName: values.username, passWord: values.password })
                    if (res.data?.register.errors) {
                        setErrors(toErrorMap(res.data.register.errors))
                    } else if (res.data.register.user) {
                        router.push('/')
                    }
                }}>
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <InputField name="username" placeholder="username" label="Username" />
                            <InputField name="password" placeholder="password" label="Password" type="password" />
                            <Button type="submit" mt={4} isLoading={isSubmitting} colorScheme="teal">Submit</Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
}
export default Register