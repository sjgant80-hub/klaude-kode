// 🧭 Nav - 3D coordinate navigation
export class Nav {
  constructor(bounds = [100, 100, 100]) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.bounds = bounds;
    this.onChange = null;
  }

  // Current position
  pos() { return [this.x, this.y, this.z]; }
  key() { return `${this.x},${this.y},${this.z}`; }
  path() { return `${this.x}/${this.y}/${this.z}.js`; }

  // Move with bounds check
  move(dx, dy, dz) {
    const [mx, my, mz] = this.bounds;
    this.x = Math.max(0, Math.min(mx - 1, this.x + dx));
    this.y = Math.max(0, Math.min(my - 1, this.y + dy));
    this.z = Math.max(0, Math.min(mz - 1, this.z + dz));
    this.onChange?.(...this.pos());
  }

  // Direction moves
  north() { this.move(0, 1, 0); }
  south() { this.move(0, -1, 0); }
  east() { this.move(1, 0, 0); }
  west() { this.move(-1, 0, 0); }
  up() { this.move(0, 0, 1); }
  down() { this.move(0, 0, -1); }

  // Get neighbor offsets for 9-cell view
  neighbors() {
    return [
      [-1, 1], [0, 1], [1, 1],
      [-1, 0], [0, 0], [1, 0],
      [-1, -1], [0, -1], [1, -1]
    ];
  }

  // Jump to coordinate
  goto(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    this.onChange?.(...this.pos());
  }
}
