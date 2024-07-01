use std::cell::RefCell;

use bindings::exports::component::test_component::resource_interface::Guest as ExampleResourceInterface;
use bindings::exports::component::test_component::resource_interface::GuestTestResource as ResourceInterface;
use bindings::{Guest as ExampleGetStructure, Structure};

mod bindings;

struct Component;

pub struct ExternalResource {
    count: RefCell<u32>,
}

impl ResourceInterface for ExternalResource {
    fn new() -> Self {
        Self {
            count: RefCell::new(0),
        }
    }
    fn do_something(&self) -> String {
        "something".into()
    }
    fn get_value(&self) -> u32 {
        self.count.take()
    }
    fn add_one(&self) {
        println!("adding one");
        *self.count.borrow_mut() += 1;
    }
}

impl ExampleResourceInterface for Component {
    type TestResource = ExternalResource;
}

impl ExampleGetStructure for Component {
    fn get_structure() -> Structure {
        Structure {
            number: 100,
            some_str: "A number for the structure".to_string(),
        }
    }
}

bindings::export!(Component with_types_in bindings);
