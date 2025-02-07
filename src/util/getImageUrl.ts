const getImageUrl = (image: File | null) => (image instanceof File ? URL.createObjectURL(image) : '');

export default getImageUrl;
