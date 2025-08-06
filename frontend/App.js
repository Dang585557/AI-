import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './components/CommentList';
import PostPreview from './components/PostPreview';
import ReplyGenerator from './components/ReplyGenerator';

function App() {
  const [postUrl, setPostUrl] = useState('');
  const [tone, setTone] = useState('professional');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [postPreview, setPostPreview] = useState(null);

  const fetchComments = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/facebook/comments`,
        { postUrl }
      );
      setComments(response.data);
      // For demo: create a mock post preview
      setPostPreview({
        id: extractPostId(postUrl),
        content: "🚀 เปิดตัวผลิตภัณฑ์ใหม่ของเรา! SuperTech Pro - อุปกรณ์ล้ำสมัยที่ช่วยให้ชีวิตคุณง่ายขึ้นด้วยเทคโนโลยี AI\n\n💡 คุณสมบัติเด่น:\n• ประมวลผลเร็วขึ้น 200%\n• ใช้งานง่ายด้วยระบบสัมผัส\n• แบตเตอรี่ใช้งานได้นาน 48 ชั่วโมง\n• ราคาพิเศษเพียง 5,990 บาท ในช่วงเปิดตัว 2 สัปดาห์แรก!\n\n#SuperTechPro #NewProduct #TechInnovation",
        stats: {
          likes: 245,
          comments: response.data.length,
          shares: 12
        }
      });
    } catch (err) {
      setError('Failed to fetch comments: ' + err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const extractPostId = (url) => {
    const regex = /(\d+)(?:\?|$)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center justify-center">
            <i className="fab fa-facebook mr-3"></i>
            Facebook Comment AI Assistant
          </h1>
          <p className="text-center mt-2 opacity-90">
            ระบบช่วยตอบคอมเมนต์ Facebook อัตโนมัติด้วยเทคโนโลยี AI
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                URL โพสต์ Facebook
              </label>
              <input
                type="text"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://www.facebook.com/ExamplePage/posts/101010101010"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                หรือใช้ Post ID เช่น: 1234567890_1234567890
              </p>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  โทนการตอบกลับ
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="friendly">เป็นกันเอง</option>
                  <option value="professional">มืออาชีพ</option>
                  <option value="casual">สบายๆ</option>
                  <option value="enthusiastic">กระตือรือร้น</option>
                  <option value="supportive">ให้การสนับสนุน</option>
                </select>
              </div>

              <button
                onClick={fetchComments}
                disabled={isLoading || !postUrl}
                className={`w-full py-3 px-6 rounded-lg font-medium ${
                  isLoading || !postUrl
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    กำลังดึงข้อมูล...
                  </span>
                ) : (
                  'ดึงคอมเมนต์'
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}
        </div>

        {postPreview && <PostPreview post={postPreview} />}

        {comments.length > 0 && (
          <CommentList 
            comments={comments} 
            tone={tone} 
            postUrl={postUrl} 
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Facebook Comment AI Assistant</p>
          <p className="text-gray-400 text-sm mt-2">
            ระบบช่วยตอบคอมเมนต์อัตโนมัติด้วยเทคโนโลยี AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
