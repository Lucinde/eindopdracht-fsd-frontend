import React from 'react';

const ImageComponent = ({ base64String, imageDesc }) => {
    let imageUrl = '';

    if (base64String) {
        const base64Str = base64String.toString(); // Convert to string

        // Controleer of het een jpg is
        if (base64Str.startsWith('/9j/') || base64Str.startsWith('data:image/jpeg')) {
            imageUrl = `data:image/jpeg;base64,${base64Str}`;
        }
        // Controleer of het een png is
        else if (base64Str.startsWith('iVBORw0KGg')) {
            imageUrl = `data:image/png;base64,${base64Str}`;
        }
        // Als het iets anders is
        else {
            console.log('This file type is not supported');
        }
    }

    return <img src={imageUrl} alt={imageDesc} />;
}

export default ImageComponent;