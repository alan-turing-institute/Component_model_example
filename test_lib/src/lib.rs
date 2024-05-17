use std::collections::HashMap;
cargo_component_bindings::generate!();
use bindings::{Guest, Structure};

struct Component;

impl Guest for Component {
    fn get_structure() -> Structure {
        Structure {
            number: 2,
            some_str: "test".into(),
        }
    }
}
