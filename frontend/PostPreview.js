import React from 'react';

const PostPreview = ({ post }) => {
  if (!post) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-newspaper mr-2 text-blue-600"></i>
          ตัวอย่างโพสต์
        </h2>
        
        <div className="border border-gray-200 rounded-lg p-5">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              EP
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-800">Example Page</h3>
              <p className="text-sm text-gray-500">โพสต์เมื่อ 2 ชั่วโมงที่แล้ว</p>
            </div>
          </div>
          
          <div className="text-gray-700 whitespace-pre-line mb-4">
            {post.content}
          </div>
          
          <div className="flex border-t border-gray-200 pt-4 text-gray-500">
            <div className="flex items-center mr-6">
              <i className="far fa-thumbs-up mr-1"></i>
              {post.stats.likes}
            </div>
            <div className="flex items-center mr-6">
              <i className="far fa-comment mr-1"></i>
              {post.stats.comments} คอมเมนต์
            </div>
            <div className="flex items-center">
              <i className="far fa-share-square mr-1"></i>
              {post.stats.shares} แชร์
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
