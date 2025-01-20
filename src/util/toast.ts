import type { AlertStatus, CreateToastFnReturn } from '@chakra-ui/react';

export const showToast = (
  toast: CreateToastFnReturn,
  title: React.ReactNode,
  status: AlertStatus,
  icon?: React.ReactNode,
) => {
  toast({
    title,
    position: 'top',
    status,
    duration: 2500,
    containerStyle: {
      marginTop: '2rem',
    },
    ...(icon && { icon }),
  });
};
