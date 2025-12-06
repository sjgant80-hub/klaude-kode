// 🎲 FileCube [8 files + 1 index] - 8 related files + central hub
import { ClaudeNode } from './claude-node.js';

// Cube modes for different file types
export const MODES = {
  CODE: ['js','ts','jsx','tsx','py','rs','go','cpp'],
  WEB:  ['html','css','js','json','md','yml','xml','svg'],
  DATA: ['json','csv','xml','sql','db','log','bin','dat'],
  DOCS: ['md','rst','txt','pdf','doc','html','tex','adoc']
};

export class FileCube {
  constructor(id, mode = 'WEB') {
    this.id = id;
    this.V = MODES[mode];  // 8 vertices
    this.files = {};
    this.V.forEach(v => this.files[v] = '');
    this.index = '';       // central hub
    this.claude = new ClaudeNode();
  }

  // Get file by extension
  get(ext) { return this.files[ext] || ''; }

  // Set file content
  set(ext, content) { this.files[ext] = content; }

  // Get all non-empty files
  active() {
    return Object.entries(this.files)
      .filter(([_, v]) => v.length > 0);
  }

  // AI-assist all files
  async improveAll() {
    for (const ext of this.V) {
      if (this.files[ext]) {
        this.files[ext] = await this.claude.improve(this.files[ext]);
      }
    }
  }

  // Export cube state
  toJSON() {
    return { id: this.id, files: this.files, index: this.index };
  }
}
