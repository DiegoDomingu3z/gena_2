// * USED TO FORMAT AND RENDER AVATAR IMG */
export const formatImgString = (firstName, lastName, imgType) => {
    try {
        switch (imgType) {
            case 'jpg':
                break;
            case 'png':
                break;
            case 'webp':
                break;
            default:
                throw new error;
        }
        const pattern = /\([^()]*\)/g;
        let formattedFirstName = firstName.replace(pattern, "");
        formattedFirstName =  formattedFirstName.trim();
        return `http://192.168.55.26/wp-content/uploads/${formattedFirstName}-${lastName}.${imgType}`
    } catch (error) {
        console.log(error)
        return error
    }
    
}