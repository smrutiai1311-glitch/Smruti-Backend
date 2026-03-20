const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/evaluate', async (req, res) => {
  try {
    // Force Haiku model — 7x cheaper than Sonnet, still great for evaluation
    const body = { ...req.body, model: 'claude-haiku-4-5-20251001', max_tokens: 3000 };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('SMRUTI Evaluator Backend is running!'));

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));
