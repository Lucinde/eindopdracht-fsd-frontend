import React from 'react';

const ImageComponent = ({ base64String, imageDesc }) => {
    let imageUrl = '';

    if (base64String) {
        // Controleer of het bestand een jpg is
        if (base64String.startsWith('/9j/') || base64String.startsWith('data:image/jpeg')) {
            imageUrl = `data:image/jpeg;base64,${base64String}`;
        }
        // Controleer of het bestand een png is
        else if (base64String.startsWith('iVBORw0KGg')) {
            imageUrl = `data:image/png;base64,${base64String}`;
        }
        // Als het een ander bestand is:
        else {
            console.log('Dit type bestand wordt niet ondersteund');
        }
    }

    return <img src={imageUrl} alt={imageDesc} />;
}

export default ImageComponent;