import { Tag } from "antd";

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

// * USED TO FORMAT DATE-TIME FORMAT STRING
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

// * USED TO FORMAT ANY STRING THAT REQUIRED CAPITALIZATION
export const capitalizeFirstLetterOfString = (str) => {
    if (str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
        return str;
    }
}

// * TAG USED FOR REQUIRED INPUTS ON FORMS
export const customizeRequiredMark = (label, { required }) => (
    <>
        {required ? <Tag color="error">Required</Tag> : null}
        {label}
    </>
      );



