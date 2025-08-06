import React, { useState } from 'react';
import axios from 'axios';
import ReplyGenerator from './ReplyGenerator';

const CommentList = ({ comments, tone, postUrl }) => {
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [replies, setReplies] = useState({});

  const handleReplyGenerated = (commentId, reply) => {
    setReplies(prev => ({ ...prev, [commentId]: reply }));
  };

  const postReply = async (commentId, message) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/facebook/reply`,
        { commentId, message }
      );
      alert('ตอบกลับสำเร็จแล้ว!');
      setReplies(prev => ({ ...prev, [commentId]: '' }));
    } catch (error) {
      alert(`ข้อผิดพลาด: ${error.response?.data?.error || error.message}`);
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString('th-TH');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <i className="fas fa-comments mr-2 text-blue-600"></i>
        คอมเมนต์ทั้งหมด ({comments.length})
      </h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {comment.user.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">{comment.user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatTime(comment.created_time)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{comment.message}</p>
            </div>

            <div className="p-5 bg-gray-50">
              {activeCommentId === comment.id ? (
                <ReplyGenerator 
                  comment={comment.message}
                  tone={tone}
                  onGenerate={(reply) => handleReplyGenerated(comment.id, reply)}
                  onClose={() => setActiveCommentId(null)}
                />
              ) : (
                <button
                  onClick={() => setActiveCommentId(comment.id)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <i className="fas fa-robot mr-2"></i>
                  สร้างคำตอบด้วย AI
                </button>
              )}

              {replies[comment.id] && (
                <div className="mt-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-blue-800">
                        <i className="fas fa-robot mr-2"></i>
                        คำตอบที่สร้างโดย AI
                      </span>
                      <button
                        onClick={() => postReply(comment.id, replies[comment.id])}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        <i className="fas fa-paper-plane mr-2"></i>
                        ส่งคำตอบ
                      </button>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {replies[comment.id]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
