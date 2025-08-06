import React, { useState } from 'react';
import axios from 'axios';

const ReplyGenerator = ({ comment, tone, onGenerate, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateReply = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/ai/generate-reply`,
        { comment, tone }
      );
      
      onGenerate(response.data.reply);
    } catch (err) {
      setError('ไม่สามารถสร้างคำตอบได้: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700">
          สร้างคำตอบสำหรับคอมเมนต์นี้
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <p className="text-gray-700 italic">"{comment}"</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {error}
        </div>
      )}
      
      <button
        onClick={generateReply}
        disabled={isGenerating}
        className={`w-full py-3 px-6 rounded-lg font-medium ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            AI กำลังสร้างคำตอบ...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <i className="fas fa-robot mr-2"></i>
            สร้างคำตอบด้วย AI
          </span>
        )}
      </button>
    </div>
  );
};

export default ReplyGenerator;
