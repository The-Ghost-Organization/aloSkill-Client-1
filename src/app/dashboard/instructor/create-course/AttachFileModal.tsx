"use client"

import { X } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';

const AttachFileModal = ({ setAttachFileModal }: { setAttachFileModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [videoPreview, setVideoPreview] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (file && file.type.startsWith('application/pdf')) {
                setVideoFile(file);
                const previewUrl = URL.createObjectURL(file);
                setVideoPreview(previewUrl);
            } else {
                alert('Please select a valid file');
            }
        }
    };

    const handleUpload = () => {
        if (videoFile) {
            // Here you would implement your actual upload logic
            alert(`Uploading: ${videoFile.name}\nSize: ${formatFileSize(videoFile.size)}`);
            handleClose();
            setAttachFileModal(false);
        }
    };

    const handleClose = () => {
        // Clean up preview URL
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }
        setVideoFile(null);
        setVideoPreview('');
    };

    const handleReplaceVideo = () => {
        setVideoPreview("")
        setVideoFile(null)
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getVideoDuration = () => {
        // This is a placeholder - you'd need to load the video to get actual duration
        return '1:55';
    };


    return (
        <>
            {/* Backdrop Overlay */}
            <div className="fixed inset-0 bg-gray-600/60 bg-opacity-50 flex items-center justify-center z-50">
                {/* Modal Container */}
                <div className="bg-white rounded w-full max-w-md">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-900">
                            Lecture Video
                        </h4>
                        <button
                            onClick={() => setAttachFileModal(false)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-4 w-full">
                        {/* file Upload Field */}
                        {
                            videoPreview ?
                                <div className='w-full h-[80px]'>
                                    <div className='flex-1'>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs">
                                                FILE UPLOADED
                                            </span>
                                            <span className="text-gray-500 text-xs">• {getVideoDuration()}</span>
                                        </div>
                                        <p className="text-gray-800 text-xs">
                                            {videoFile?.name}
                                        </p>
                                        <button
                                            onClick={handleReplaceVideo}
                                            className="text-orange-500 text-xs hover:text-orange-600 transition-colors"
                                        >
                                            Replace Video
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className='w-full h-[100px] flex items-center justify-center px-6 border border-gray-200 rounded'>
                                    <label htmlFor='file' className='block w-full text-sm text-center'>
                                        <p>Attach File</p>
                                        <p className='text-xs'>Drag and drop or browse for files</p>
                                    </label>
                                    <input
                                        id='file'
                                        type="file"
                                        accept=".pdf,.doc"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                </div>
                        }

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-6">
                            <button
                                onClick={() => setAttachFileModal(false)}
                                className="px-4 py-1.5 text-gray-700 font-medium hover:bg-gray-100 rounded transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={!videoPreview}
                                className={`px-4 py-1.5 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-2 cursor-pointer ${!videoPreview ? "opacity-50 cursor-not-allowed" : ""}}`}
                            >
                                <span>Upload Video</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttachFileModal;