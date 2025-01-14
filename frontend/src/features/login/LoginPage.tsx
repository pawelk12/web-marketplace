import { Fieldset, TextInput, Button, Group } from '@mantine/core';
import {useForm} from "@mantine/form";
import {LoginFormValues} from "../../types/LoginFormValues.ts";
import {ErrorNotification} from "../notifications/notifications.ts";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../api/auth.ts";

export const LoginPage  = () =>{
    const navigate = useNavigate();

    const form = useForm<LoginFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+\.\S{2,}$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^\S+$/.test(value) ? null : 'Password can not be empty'),
        },
    });

    const handleSubmit = async (values: LoginFormValues) => {
        try{
            await login(values.email, values.password);
            navigate("/listings");
        }catch(e){
            const err = e as Error;
            ErrorNotification(err.message);
        }
    }

    return (
        <div style={{
            width: '70vh',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '80vh'
        }}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Fieldset legend="Please log in to your account" variant="filled" radius="xl">
                    <TextInput
                        label="Email"
                        placeholder="example@example.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />

                    <TextInput
                        label="Password"
                        placeholder="enter your password here"
                        mt="md"
                        type="password"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />

                    <Link to={"/register"} style={{
                        display: 'block',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        textDecoration: 'none'
                    }}>

                        Don't have an account? Click here to create one!
                    </Link>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" color="teal" radius="xl">Login</Button>
                    </Group>
                </Fieldset>
            </form>
        </div>
    );
}