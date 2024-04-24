export const formatImgString = (str) => {
    const pattern = /\([^()]*\)/g;
    const cleanString = str.replace(pattern, "");
    return cleanString.trim();
}