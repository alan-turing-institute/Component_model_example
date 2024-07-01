use std::cell::RefCell;

use bindings::{
    exports::component::test_component::resource_interface::GuestTestResource, Guest, Structure,
};
// cargo_component_bindings::generate!();

// use crate::bindings::component::test_component::logger::print;
// use crate::bindings::exports::component::test_component::resource_interface::GuestTestResource;
// use bindings::{Guest, Structure};

mod bindings;

// use bindings::Guest;

// struct Component;

pub struct TestResource {
    count: RefCell<u32>,
}

impl Guest for TestResource {
    fn get_structure() -> Structure {
        todo!()
    }
}

impl GuestTestResource for TestResource {
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
        // print("adding one");
        self.count.replace(5);
    }
}

// impl Guest for Component {
//     fn get_structure() -> Structure {
//         Structure {
//             number: 2,
//             some_str: "test".into(),
//         }
//     }
// }

// bindings::export!(Component with_types_in bindings);
bindings::export!(TestResource with_types_in bindings);
