import { useLocalParticipant, LiveKitRoom, ParticipantTile, StartAudio, StartMediaButton, TrackLoop, useParticipants, useTracks, VideoTrack, TrackRefContext, TrackMutedIndicator } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { PhoneIncoming, Mic, ScreenShare, Camera } from 'lucide-react';
import React, { useState } from 'react';

interface VoiceAreaProps {
    currentChannel: string;
    token: string;
    serverUrl: string;
    onDisconnect: () => void;  // Nueva prop
}

const VoiceArea = ({ currentChannel, token, serverUrl, onDisconnect }: VoiceAreaProps) => {
    return (
        <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect={true}
        >
            <VoiceAreaContent currentChannel={currentChannel} onDisconnect={onDisconnect} />
            <StartAudio label="Click to allow audio playback" />
            <StartMediaButton label="Click to allow media playback" />
        </LiveKitRoom>
    );
};

interface VoiceAreaContentProps {
    currentChannel: string;
    onDisconnect: () => void;  // Nueva prop
}

const VoiceAreaContent = ({ currentChannel, onDisconnect }: VoiceAreaContentProps) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    
    const { localParticipant } = useLocalParticipant();
    const participants = useParticipants();
    const videoTracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);
    const audioTracks = useTracks([Track.Source.Microphone]);

    const toggleMute = async () => {
        if (!localParticipant) return;

        try {
            await localParticipant.setMicrophoneEnabled(!isMuted);
            setIsMuted(!isMuted)
        } catch (error) {
            console.error('Error al cambiar estado del micrófono:', error);
        }
    };

    const toggleScreenShare = async () => {
        if (!localParticipant) return;

        try {
            await localParticipant.setScreenShareEnabled(!isScreenSharing);
            setIsScreenSharing(!isScreenSharing);
        } catch (error) {
            console.error('Error al cambiar estado de la compartición de pantalla:', error);
        }
    };

    const toggleCamera = async () => {
        if (!localParticipant) return;

        try {
            await localParticipant.setCameraEnabled(!isCameraOn);
            setIsCameraOn(!isCameraOn)
        } catch (error) {
            console.error('Error al cambiar estado de la cámara:', error);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Canal de Voz: {currentChannel}
                </h2>
                <div className="flex items-center space-x-2">
                    <PhoneIncoming 
                        className="text-red-500 hover:text-red-400 cursor-pointer h-6 w-6 transition-colors duration-200" 
                        onClick={onDisconnect}
                    />
                </div>
            </div>
            {/* Área de participantes */}
            <div className="flex-1 bg-gray-750 rounded-lg p-4 overflow-y-auto border border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Usuarios Conectados</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {participants.map((participant) => {
                        const cameraPublication = participant.getTrackPublication(Track.Source.Camera);
                        const micPublication = participant.getTrackPublication(Track.Source.Microphone);

                        return (
                            <div key={participant.identity} className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                                {cameraPublication && (
                                    <VideoTrack 
                                        trackRef={{
                                            participant,
                                            publication: cameraPublication,
                                            source: Track.Source.Camera
                                        }} 
                                    />
                                )}
                                <div className="absolute bottom-2 right-2 flex space-x-2">
                                    {cameraPublication && (
                                        <TrackMutedIndicator 
                                            trackRef={{
                                                participant,
                                                publication: cameraPublication,
                                                source: Track.Source.Camera
                                            }} 
                                        />
                                    )}
                                    {micPublication && (
                                        <TrackMutedIndicator 
                                            trackRef={{
                                                participant,
                                                publication: micPublication,
                                                source: Track.Source.Microphone
                                            }} 
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-center space-x-6">
                <button
                    className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colores duration-200 border border-gray-600"
                    onClick={toggleMute}
                >
                    <Mic className="h-5 w-5" />
                    <span>{isMuted ? 'Silenciar' : 'Desilenciar'}</span>
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
