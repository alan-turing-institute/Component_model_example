mod bindings;

use std::cell::RefCell;

use bindings::exports::component::pkg_component::universe;

use universe::{Guest, GuestUniverseResource};

struct Component;

impl Guest for Component {
    type UniverseResource = Universe;
}

#[derive(Debug, Clone, Copy, PartialEq, PartialOrd, Eq, Ord)]
enum Cell {
    Alive,
    Dead,
}

struct Universe {
    width: u32,
    height: u32,
    cells: RefCell<Vec<Cell>>,
}
impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        let cells = self.cells.borrow();
        // Loop over: row before in periodic positive integers, 0, 1
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            // Can't do this as u32s
            // for delta_row in [-1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                // Ignore the centre square
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }
                // Periodic wrapping
                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                // Linear indexing
                let idx = self.get_index(neighbor_row, neighbor_col);
                // Count
                count += match cells.get(idx).unwrap() {
                    Cell::Alive => 1,
                    Cell::Dead => 0,
                };
            }
        }
        count
    }
}

use std::fmt;

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.borrow().as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            writeln!(f)?;
        }

        Ok(())
    }
}

impl GuestUniverseResource for Universe {
    fn new() -> Self {
        let width = 256;
        let height = 256;
        // let width = 140;
        // let height = 140;

        let cells = RefCell::new(
            (0..width * height)
                .map(|i| {
                    if i % 2 == 0 || i % 7 == 0 {
                        Cell::Alive
                    } else {
                        Cell::Dead
                    }
                })
                .collect(),
        );

        Universe {
            width,
            height,
            cells,
        }
    }

    fn tick(&self) {
        let mut next = self.cells.borrow().clone();
        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells.borrow()[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbours
                    // dies, as if caused by underpopulation.
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    // Rule 2: Any live cell with two or three live neighbours
                    // lives on to the next generation.
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    // Rule 3: Any live cell with more than three live
                    // neighbours dies, as if by overpopulation.
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    // Rule 4: Any dead cell with exactly three live neighbours
                    // becomes a live cell, as if by reproduction.
                    (Cell::Dead, 3) => Cell::Alive,
                    // All other cells remain in the same state.
                    (otherwise, _) => otherwise,
                };

                next[idx] = next_cell;
            }
        }
        *self.cells.borrow_mut() = next;
    }

    fn render(&self) -> String {
        self.to_string()
    }

    fn width(&self) -> u32 {
        self.width
    }

    fn height(&self) -> u32 {
        self.height
    }

    fn cells(&self) -> Vec<u8> {
        self.cells.borrow().iter().fold(vec![], |mut acc, cell| {
            acc.push(match cell {
                Cell::Alive => 1,
                Cell::Dead => 0,
            });
            acc
        })
    }

    fn get_value(&self, idx: u32) -> u8 {
        match (*self.cells.borrow())[usize::try_from(idx).unwrap()] {
            Cell::Alive => 1,
            Cell::Dead => 0,
        }
    }
}

bindings::export!(Component with_types_in bindings);
