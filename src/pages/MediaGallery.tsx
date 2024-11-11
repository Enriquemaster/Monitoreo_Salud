// MediaGallery.tsx
import React from 'react';
import { IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';

type MediaGalleryProps = {
  mediaFiles: Array<{ id: number; type: 'video' | 'image'; uri: string }>;
};

const MediaGallery: React.FC<MediaGalleryProps> = ({ mediaFiles}) => {
  return (
    <div className="media-gallery">
      <h2 className="text-lg font-semibold mt-4">Fotos y Videos Guardados:</h2>
      {mediaFiles.length === 0 ? (
        <p>No se han guardado fotos o videos aún.</p>
      ) : (
        mediaFiles.map((media) => (
          <div key={media.id} className="media-item mt-4 relative">
            {media.type === 'video' ? (
              <video controls width="100%" height="auto" src={media.uri} />
            ) : (
              <img src={media.uri} alt="Foto tomada" width="100%" />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MediaGallery;
