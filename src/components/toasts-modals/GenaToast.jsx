import { notification } from 'antd';

const useGenaToast = () => {
    // ! SCOPED VARIABLES */
    const [api, contextHolder] = notification.useNotification();

    // ! SCOPED FUNCTIONS */
    const successToast = (message, successDescription, placement) => {
        api.success({
        message: message,
        description: successDescription ? successDescription : '',
        placement: placement ? placement : 'topRight'
        });
    };

    const errorToast = (message, errorDescription, placement) => {
        api.error({
            message: message,
            description: errorDescription ? errorDescription : '',
            placement: placement ? placement : 'topRight'
        })
    }

    const infoToast = (message, infoDescription, placement) => {
        api.info({
            message: message,
            description: infoDescription ? infoDescription : '',
            placement: placement ? placement : 'topRight'
        })
    }

    // ! RETURN */
    return { successToast, errorToast, infoToast, contextHolder };
};

export default useGenaToast;
