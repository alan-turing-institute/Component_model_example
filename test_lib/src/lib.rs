use std::cell::RefCell;

// Non-exports
use bindings::{Guest as ExampleGetStructure, Structure};

// Exports
use bindings::exports::component::test_component::{logger, resource_interface};

use logger::Guest as ExampleLoggerInterface;
use resource_interface::{Guest as ResourceInterface, GuestResourceCounter as ResourceCounter};

mod bindings;

struct Component;

pub struct ExternalResource {
    count: RefCell<u32>,
}

impl ResourceCounter for ExternalResource {
    fn new() -> Self {
        Self {
            count: RefCell::new(0),
        }
    }
    fn do_something(&self) -> String {
        "something".into()
    }
    fn get_value(&self) -> u32 {
        *self.count.borrow()
    }
    fn add_one(&self) {
        println!("adding one");
        *self.count.borrow_mut() += 1;
    }
}

impl ResourceInterface for Component {
    type ResourceCounter = ExternalResource;
}

impl ExampleLoggerInterface for Component {
    fn my_print_log(text: String) {
        println!("Logging: {text}");
    }
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
