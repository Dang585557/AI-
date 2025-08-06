const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateCommentReply(comment, tone = 'professional') {
    try {
      const prompt = `
        คุณเป็นผู้ช่วยตอบคอมเมนต์ Facebook สำหรับธุรกิจ
        โปรดตอบคำถามต่อไปนี้อย่าง${tone}แต่เป็นกันเอง:
        "${comment}"
        
        กฎ:
        1. ตอบสั้นๆ กระชับ ไม่เกิน 2 ประโยค
        2. ใช้ภาษาธรรมชาติเหมือนมนุษย์
        3. หลีกเลี่ยงการพูดซ้ำคำถาม
        4. ลงท้ายด้วย emoji ที่เหมาะสม
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 150
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new Error('Failed to generate AI reply');
    }
  }
}

module.exports = new OpenAIService();
