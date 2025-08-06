const axios = require('axios');

class FacebookService {
  constructor() {
    this.baseUrl = 'https://graph.facebook.com/v19.0';
    this.pageToken = process.env.FB_PAGE_TOKEN;
  }

  async getPostComments(postId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${postId}/comments`, 
        {
          params: {
            access_token: this.pageToken,
            fields: 'id,message,created_time,from{name,id}',
            order: 'chronological',
            limit: 50
          }
        }
      );
      
      return response.data.data.map(comment => ({
        id: comment.id,
        message: comment.message,
        created_time: comment.created_time,
        user: {
          id: comment.from.id,
          name: comment.from.name
        }
      }));
    } catch (error) {
      console.error('Facebook API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch comments from Facebook');
    }
  }

  async replyToComment(commentId, message) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${commentId}/comments`,
        {
          message,
          access_token: this.pageToken
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Facebook Reply Error:', error.response?.data || error.message);
      throw new Error('Failed to post reply to Facebook');
    }
  }
}

module.exports = new FacebookService();
