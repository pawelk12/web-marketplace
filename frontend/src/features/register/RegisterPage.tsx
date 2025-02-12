import {Button, Checkbox, Fieldset, Group, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {RegisterFormValues} from "../../types/RegisterFormValues.ts";
import {register} from "../../api/auth.ts";
import {ErrorNotification, SuccessNotification} from "../notifications/notifications.ts";
import {Link, useNavigate} from "react-router-dom";


export const RegisterPage = () => {
    const navigate = useNavigate();
    const form = useForm<RegisterFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            username: '',
            password: '',
            repeatedPassword: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+\.\S{2,}$/.test(value) ? null : 'Invalid email'),
            username: (value) => {
              if(value.length > 30){
                  return 'Username cannot be longer than 30 characters';
              }
            },
            password: (value) => {
                if(value.length < 10) return 'Password must be at least 10 characters long';
                return (/^\S+$/.test(value) ? null : 'Password cannot contain spaces')
            },
            repeatedPassword: (value, values) => {
                return value === values.password ? null : 'Passwords do not match';
            },
            termsOfService: (value) => (value? null : 'You must accept the terms of service')
        },
    });

    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            await register(values.email, values.username, values.password);
            SuccessNotification("Your registration has been completed.");
            navigate('/login')
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
            <Fieldset legend="Create a new account" variant="filled" radius="xl">
                <TextInput
                    label="Email"
                    placeholder="example@example.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />

                <TextInput
                    label="Username"
                    placeholder="enter your username here"
                    mt="md"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />

                <TextInput
                    label="Password"
                    placeholder="enter your password here"
                    mt="md"
                    type="password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />

                <TextInput
                    label="Repeat password"
                    placeholder="repeat your password here"
                    mt="md"
                    type="password"
                    key={form.key('repeatedPassword')}
                    {...form.getInputProps('repeatedPassword')}
                />

                <Checkbox
                    mt="md"
                    label="I agree to the Terms of Service and Privacy Policy."
                    key={form.key('termsOfService')}
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

                <Link to={"/login"} style={{
                    display: 'block',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                }}>

                    Already have an account? Click here to log in!
                </Link>
                <Group justify="flex-end" mt="md">
                    <Button type="submit" color="teal" radius="xl">Register</Button>
                </Group>
            </Fieldset>
        </form>
    </div>
    );
}