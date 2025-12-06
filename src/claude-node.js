// 🤖 ClaudeNode [Embedded AI per file] - 4KB|inline|fast
const API = 'https://api.anthropic.com/v1/messages';

export class ClaudeNode {
  constructor(key = null) {
    this.key = key || localStorage.getItem('ant_key');
  }

  // Query Claude with context
  async q(task, code) {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `Task: ${task}\n\nCode:\n${code}`
        }]
      })
    });
    const data = await res.json();
    return data.content[0].text;
  }

  // Quick operations
  async improve(code) { return this.q('improve this code', code); }
  async explain(code) { return this.q('explain this code briefly', code); }
  async fix(code) { return this.q('fix bugs in this code', code); }
  async minify(code) { return this.q('minify this code', code); }
}
