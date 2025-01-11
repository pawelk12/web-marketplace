import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React from "react";


export const LoginFailedNotification = (message: string)=>{
    notifications.show({
        position: 'bottom-right',
        withCloseButton: true,
        autoClose: 5000,
        title: "Error",
        message: message,
        color: 'red',
        icon: React.createElement(IconX),
    });
}