const express = require('express');
const router = express.Router();
const axios = require('axios');

// DeepSeek API configuration
const DEEPSEEK_API_URL = "https://api.deepseek.ai/v1/chat/completions";
const DEEPSEEK_API_KEY = "89aqJaKLYqngWlpuVQrEU9nWlkB83odn8yrf59XlGCepIQDN"; // Free API key for demo purposes

// Local summary generation as fallback
const generateLocalSummary = (text) => {
  // Extract the first few sentences for the mock summary
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) {
    return 'Unable to generate summary. Please provide more content.';
  }
  
  // Extract a more comprehensive summary for longer texts
  const summaryLength = Math.min(Math.max(3, Math.floor(sentences.length / 5)), 8);
  
  // Take first sentence, one from middle, and last sentence for very short texts
  let summaryText = '';
  
  if (sentences.length <= 5) {
    summaryText = sentences.join('. ');
  } else {
    // Get introduction (first 1-2 sentences)
    summaryText += sentences.slice(0, 2).join('. ') + '. ';
    
    // Get key points from throughout the text
    const step = Math.floor(sentences.length / summaryLength);
    for (let i = 2; i < summaryLength - 1; i++) {
      const index = Math.min(i * step, sentences.length - 2);
      summaryText += sentences[index] + '. ';
    }
    
    // Get conclusion (last sentence)
    summaryText += sentences[sentences.length - 1] + '.';
  }
  
  return summaryText.replace(/\.+/g, '.').trim();
};

// Add legal-specific terms extraction
const extractLegalTerms = (text) => {
  const legalTerms = [
    'plaintiff', 'defendant', 'court', 'appeal', 'judgment', 'petition', 
    'verdict', 'ruling', 'statute', 'jurisdiction', 'prosecution', 'testimony',
    'precedent', 'evidence', 'damages', 'tort', 'hearing', 'injunction',
    'affidavit', 'conviction', 'allegation', 'pleading', 'settlement',
    'constitutional', 'judicial', 'statutory', 'contract', 'liability'
  ];
  
  // Find legal terms in the text
  const matches = [];
  const lowerText = text.toLowerCase();
  
  legalTerms.forEach(term => {
    if (lowerText.includes(term)) {
      matches.push(term);
    }
  });
  
  return matches.slice(0, 5); // Return up to 5 key legal terms
};

// Implement an alternative API call if the primary one fails
const tryAlternativeAPI = async (text) => {
  try {
    // Use a different free AI API (Text Monkey Summarizer API)
    const response = await axios.post(
      "https://api.textmonkey.io/v1/summarize",
      {
        input_text: text,
        max_sentences: 5
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'tmk_qv9hNpkWJBvXsZj56tQzXwu7fG0k3d8Y'
        },
        timeout: 25000
      }
    );
    
    if (response.data && response.data.summary) {
      return response.data.summary;
    }
    throw new Error('Invalid response from alternative API');
  } catch (error) {
    console.error('Alternative API error:', error.message);
    return null;
  }
};

// @route   POST /api/ai/summarize
// @desc    Summarize legal text using DeepSeek API or local processing
// @access  Public
router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, error: 'Please provide text to summarize' });
    }
    
    // Make sure text is not too long
    const processedText = text.length > 8000 ? text.substring(0, 8000) : text;
    
    try {
      // DeepSeek API call for summarization
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are a legal assistant that summarizes legal texts, cases, and documents. Your summaries should be concise, accurate, and highlight the key legal points, facts, and arguments. Focus on extracting the most relevant information that would be useful for a legal professional."
            },
            {
              role: "user",
              content: `Please summarize the following legal text in a clear and concise manner. Highlight the most important legal arguments, facts, and conclusions: "${processedText}"`
            }
          ],
          max_tokens: 1000,
          temperature: 0.3
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          },
          timeout: 30000
        }
      );
      
      if (response.data && response.data.choices && response.data.choices[0]) {
        const summary = response.data.choices[0].message.content;
        
        // Extract legal terms as an enhancement
        const legalTerms = extractLegalTerms(processedText);
        
        // Combine AI summary with legal terms (if any)
        let finalSummary = summary;
        if (legalTerms.length > 0) {
          finalSummary += '\n\nKey legal concepts: ' + legalTerms.join(', ') + '.';
        }
        
        return res.json({ 
          success: true, 
          summary: finalSummary,
          ai: true
        });
      } else {
        throw new Error('Invalid DeepSeek API response');
      }
    } catch (error) {
      console.error('DeepSeek API Error:', error.message);
      
      // Try alternative API before falling back to local processing
      console.log('Attempting to use alternative API...');
      const alternativeSummary = await tryAlternativeAPI(processedText);
      
      if (alternativeSummary) {
        // Alternative API worked
        const legalTerms = extractLegalTerms(processedText);
        let finalSummary = alternativeSummary;
        
        if (legalTerms.length > 0) {
          finalSummary += '\n\nKey legal concepts: ' + legalTerms.join(', ') + '.';
        }
        
        return res.json({
          success: true,
          summary: finalSummary,
          ai: true,
          alternative: true
        });
      }
      
      // Both APIs failed, fall back to local processing
      const summary = generateLocalSummary(processedText);
      const legalTerms = extractLegalTerms(processedText);
      
      let finalSummary = summary;
      if (legalTerms.length > 0) {
        finalSummary += '\n\nKey legal concepts: ' + legalTerms.join(', ') + '.';
      }
      
      return res.json({ 
        success: true, 
        summary: finalSummary,
        fallback: true
      });
    }
  } catch (error) {
    console.error('Summarization Error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: `Processing error: ${error.message}` 
    });
  }
});

module.exports = router; 