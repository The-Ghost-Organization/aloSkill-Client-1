"use client"

import { X } from 'lucide-react';
import { useState } from 'react';

const SectionNameEditModal = ({ setSectionNameEditModal }: { setSectionNameEditModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [formData, setFormData] = useState({
        sectionName: ''
    });

    const handleSubmit = () => {
        setSectionNameEditModal(false);
    };

    const handleChange = (field: string, value: HTMLInputElement['value']) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
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
                            Edit Section Name
                        </h4>
                        <button
                            onClick={() => setSectionNameEditModal(false)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-4 space-y-4">
                        {/* Section Input Field */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Section
                            </label>
                            <input
                                type="text"
                                value={formData.sectionName}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Enter section name here..."
                                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-gray-400 placeholder:text-sm"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2">
                            <button
                                onClick={() => setSectionNameEditModal(false)}
                                className="px-4 py-1.5 text-gray-700 font-medium hover:bg-gray-100 rounded transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-1.5 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
                            >
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionNameEditModal;