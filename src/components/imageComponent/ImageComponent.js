import React from 'react';

const ImageComponent = ({ base64String, imageDesc }) => {
    let imageUrl = '';

    if (base64String) {
        const base64Str = base64String.toString();

        // Controleer of het een jpg is
        if (base64Str.startsWith('/9j/') || base64Str.startsWith('data:image/jpeg')) {
            imageUrl = `data:image/jpeg;base64,${base64Str}`;
        }
        // Controleer of het een png is
        else if (base64Str.startsWith('iVBORw0KGg')) {
            imageUrl = `data:image/png;base64,${base64Str}`;
        }
        else {
            return <p className="warning">Dit type bestand wordt niet ondersteund. Upload een JPG of PNG bestand.</p>
        }
    }

    return <img src={imageUrl} alt={imageDesc} />;
}

export default ImageComponent;