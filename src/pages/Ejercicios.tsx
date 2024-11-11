import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonPage, IonMenuButton, IonButton, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import React, { useState, useRef, useEffect } from 'react';
import { Storage } from '@capacitor/storage';
import './Home.css';

const Ejercicios: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | undefined>(undefined);
  const [fotoUri, setFotoUri] = useState<string | undefined>(undefined);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const videoStreamRef = useRef<MediaStream | null>(null);

  const activarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const grabarVideo = async () => {
    if (!videoStreamRef.current) return;

    mediaRecorderRef.current = new MediaRecorder(videoStreamRef.current);
    mediaRecorderRef.current.ondataavailable = (event) => {
      recordedChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);
      setVideoUri(videoUrl);
      const mediaFile = { id: Date.now(), type: 'video', uri: videoUrl };
      const updatedFiles = [...mediaFiles, mediaFile];
      setMediaFiles(updatedFiles);
      await Storage.set({ key: 'mediaFiles', value: JSON.stringify(updatedFiles) });
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const detenerGrabar = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const tomarFoto = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (videoRef.current && context) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setFotoUri(dataUrl);
      const mediaFile = { id: Date.now(), type: 'image', uri: dataUrl };
      const updatedFiles = [...mediaFiles, mediaFile];
      setMediaFiles(updatedFiles);
      await Storage.set({ key: 'mediaFiles', value: JSON.stringify(updatedFiles) });
    }
  };

  const eliminarMedia = async (id: number) => {
    const updatedFiles = mediaFiles.filter((file) => file.id !== id);
    setMediaFiles(updatedFiles);
    await Storage.set({ key: 'mediaFiles', value: JSON.stringify(updatedFiles) });
  };

  const handleEvidencias = () => {
    setIsCameraActive(true);
    activarCamara();
  };

  useEffect(() => {
    const loadMediaFiles = async () => {
      const { value } = await Storage.get({ key: 'mediaFiles' });
      const storedMedia = value ? JSON.parse(value) : [];
      setMediaFiles(storedMedia);
    };
    loadMediaFiles();
  }, []);

  return (
    <IonApp>
      <IonMenu side="start" contentId="main-content">
        <IonContent>
          <h2 className="p-4">Menu</h2>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className="bg-primary text-primary-foreground">
            <IonMenuButton slot="start" />
            <IonTitle>Tomar Evidencias</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding bg-background text-primary-foreground min-h-screen">
          {!isCameraActive && (
            <button className="mt-4 w-full text-white p-2 rounded transition duration-300  bg-green-500" onClick={handleEvidencias}>
              <IonIcon slot="start" icon={close} /> Iniciar Grabación
            </button>
          )}

          {isCameraActive && (
            <div className="camera-container">
              <video ref={videoRef} className="w-full" autoPlay muted />
              <div className="controls">
                <IonButton
                  onClick={isRecording ? detenerGrabar : grabarVideo}
                  color={isRecording ? 'danger' : 'success'}
                  expand="full"
                  shape="round"
                >
                  {isRecording ? 'Detener Grabación' : 'Grabar Video'}
                </IonButton>
                <IonButton onClick={tomarFoto} color="tertiary" expand="full" shape="round">
                  Tomar Foto
                </IonButton>
              </div>
            </div>
          )}

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
                  <IonIcon
                    icon={close}
                    className="delete-icon absolute top-2 right-2 text-red-600 cursor-pointer"
                    onClick={() => eliminarMedia(media.id)}
                  />
                </div>
              ))
            )}
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Ejercicios;
