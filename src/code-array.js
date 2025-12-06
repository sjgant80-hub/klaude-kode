// 🧊 CodeArray [1000³ file grid] - 3D file space with Claude@coords
import { ClaudeNode } from './claude-node.js';

export class CodeArray {
  constructor(dims = [100, 100, 100]) {
    this.dims = dims;
    this.grid = new Map();  // sparse storage
    this.nodes = {};        // coord→Claude instances
  }

  // Key generator
  k(x, y, z) { return `${x},${y},${z}`; }

  // Set code at coordinate
  set(x, y, z, code) {
    this.grid.set(this.k(x, y, z), code);
  }

  // Get code at coordinate
  get(x, y, z) {
    return this.grid.get(this.k(x, y, z)) || '';
  }

  // Get/create Claude instance at coordinate
  claude(x, y, z) {
    const key = this.k(x, y, z);
    return this.nodes[key] ||= new ClaudeNode();
  }

  // Check if coordinate has code
  has(x, y, z) {
    return this.grid.has(this.k(x, y, z));
  }

  // Get all neighbors (6 adjacent)
  neighbors(x, y, z) {
    return [
      [x-1,y,z], [x+1,y,z],
      [x,y-1,z], [x,y+1,z],
      [x,y,z-1], [x,y,z+1]
    ].filter(([nx,ny,nz]) => this.has(nx,ny,nz));
  }

  // Export to JSON for cache
  toJSON() {
    return Object.fromEntries(this.grid);
  }

  // Import from cache
  fromJSON(data) {
    this.grid = new Map(Object.entries(data));
  }
}
