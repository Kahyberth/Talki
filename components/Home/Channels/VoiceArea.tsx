import { AudioConference, GridLayout, LiveKitRoom, ParticipantTile, StartAudio, StartMediaButton, TrackRefContext, useParticipants, useTracks, VideoTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { PhoneIncoming, Mic, ScreenShare, Camera } from 'lucide-react';
import React, { useContext, useState } from 'react';

interface VoiceAreaProps {
    currentChannel: string;
    token: string;
    serverUrl: string;
}

const VoiceArea = ({ currentChannel, token, serverUrl }: VoiceAreaProps) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true); // Empezamos con la cámara encendida

    const toggleMute = () => {
        setIsMuted((prev) => !prev); // Toggle de mute
    };

    const toggleScreenShare = () => {
        setIsScreenSharing((prev) => !prev); // Toggle de compartir pantalla
    };

    const toggleCamera = () => {
        setIsCameraOn((prev) => !prev); // Toggle de cámara
    };

    const trackRef = useContext(TrackRefContext);

    return (
        <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect={true}
            audio={!isMuted} // Si está muteado, no se publica el audio
            video={isCameraOn} // Si la cámara está activada, se comparte video
            screen={isScreenSharing} // Si se activa la compartición de pantalla
        >
            <VoiceAreaContent
                currentChannel={currentChannel}
                isMuted={isMuted}
                isScreenSharing={isScreenSharing}
                isCameraOn={isCameraOn}
                toggleMute={toggleMute}
                toggleScreenShare={toggleScreenShare}
                toggleCamera={toggleCamera}
            />

            <StartAudio label="Click to allow audio playback" />
            <StartMediaButton label="Click to allow media playback" />
        </LiveKitRoom>
    );
};

interface VoiceAreaContentProps {
    currentChannel: string;
    isMuted: boolean;
    isScreenSharing: boolean;
    isCameraOn: boolean;
    toggleMute: () => void;
    toggleScreenShare: () => void;
    toggleCamera: () => void;
}

const VoiceAreaContent = ({
    currentChannel,
    isMuted,
    isScreenSharing,
    isCameraOn,
    toggleMute,
    toggleScreenShare,
    toggleCamera,
}: VoiceAreaContentProps) => {
    const participants = useParticipants(); // Obtener participantes

    const trackRefs = useTracks([Track.Source.Camera]);


    return (
        <div className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Canal de Voz: {currentChannel}
                </h2>
                <div className="flex items-center space-x-2">
                    <PhoneIncoming className="text-red-500 hover:text-red-400 cursor-pointer h-6 w-6 transition-colors duration-200" />
                </div>
            </div>
            {/* Área de participantes */}
            <div className="flex-1 bg-gray-750 rounded-lg p-4 overflow-y-auto border border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Usuarios Conectados</h3>

                {/* GridLayout para renderizar participantes */}
                <GridLayout tracks={trackRefs}>
                    <div className="space-y-2 flex flex-wrap">
                        {/* Iterar sobre los tracks de los participantes */}
                        {trackRefs.map((trackRef, index) => (
                            <div key={index} className="w-32 h-32 bg-black rounded-lg overflow-hidden">
                                {/* Si trackRef tiene publicación, muestra el VideoTrack */}
                                {trackRef && trackRef.publication ? (
                                    <VideoTrack
                                        trackRef={trackRef}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    // Si no hay trackRef (sin cámara), muestra el nombre del participante
                                    <div className="flex items-center justify-center w-full h-full bg-gray-600 text-white rounded-lg">
                                        <span>{`Participante ${index + 1}`}</span> {/* Aquí puedes mostrar el nombre del participante */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </GridLayout>
            </div>


            <div className="mt-4 flex items-center justify-center space-x-6">
                <button
                    className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colores duration-200 border border-gray-600"
                    onClick={toggleMute}
                >
                    <Mic className="h-5 w-5" />
                    <span>{isMuted ? 'Desilenciar' : 'Silenciar'}</span>
                </button>
                <button
                    className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colores duration-200 border border-gray-600"
                    onClick={toggleScreenShare}
                >
                    <ScreenShare className="h-5 w-5" />
                    <span>{isScreenSharing ? 'Dejar de Compartir Pantalla' : 'Compartir Pantalla'}</span>
                </button>
                <button
                    className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colores duration-200 border border-gray-600"
                    onClick={toggleCamera}
                >
                    <Camera className="h-5 w-5" />
                    <span>{isCameraOn ? 'Apagar Cámara' : 'Compartir Cámara'}</span>
                </button>
            </div>
        </div>
    );
};

export default VoiceArea;
