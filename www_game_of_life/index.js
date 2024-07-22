import { universe } from './pkg_component.js';

const CELL_SIZE = 2; // px
const GRID_COLOR = '#CCCCCC';
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#000000';

// Construct the universe, and get its width and height.
let universe_instance = new universe.UniverseResource();
const width = universe_instance.width();
const height = universe_instance.height();

console.log(width);
console.log(height);

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById('game-of-life-canvas');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const renderLoop = () => {
	universe_instance.tick();
	drawGrid();
	drawCells();
	requestAnimationFrame(renderLoop);
};

const drawGrid = () => {
	ctx.beginPath();
	ctx.strokeStyle = GRID_COLOR;

	// Vertical lines.
	for (let i = 0; i <= width; i++) {
		ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
		ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
	}

	// Horizontal lines.
	for (let j = 0; j <= height; j++) {
		ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
		ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
	}

	ctx.stroke();
};

const getIndex = (row, column) => {
	return row * width + column;
};

const drawCells = () => {
	ctx.beginPath();

	// Get state of cells from universe instance
	const cells = universe_instance.cells();
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			const idx = getIndex(row, col);
			// Can either get value from idx inside call
			// const val = universe_instance.getValue(idx);
			// OR
			// index into cells cloned from Wasm
			const val = cells[idx];

			ctx.fillStyle = val == 0 ? DEAD_COLOR : ALIVE_COLOR;

			ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
		}
	}

	ctx.stroke();
};

drawGrid();
drawCells();
requestAnimationFrame(renderLoop);
