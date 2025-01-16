import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import React from "react";


export const ErrorNotification = (message: string)=>{
    notifications.show({
        position: 'bottom-right',
        withCloseButton: true,
        autoClose: 5000,
        title: "Error!",
        message: message,
        color: 'red',
        icon: React.createElement(IconX),
    });
}

export const SuccessNotification = (message: string)=>{
    notifications.show({
        position: 'bottom-right',
        withCloseButton: true,
        autoClose: 5000,
        title: "Success!",
        message: message,
        color: 'green',
        icon: React.createElement(IconCheck),
    });
}