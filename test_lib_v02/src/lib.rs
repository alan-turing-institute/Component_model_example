#[allow(warnings)]
pub mod bindings;

use bindings::{Guest, Structure};

pub struct Component;

impl Guest for Component {
    /// Say hello!
    fn hello_world() -> String {
        "Hello, World!".to_string()
    }

    /// Return a structure
    fn get_structure() -> Structure {
        Structure {
            number: 22,
            some_str: "birthday".to_string(),
        }
    }
}

bindings::export!(Component with_types_in bindings);

#[cfg(test)]
mod test {
    use super::*;
    use bindings::{Guest, Structure};

    #[test]
    fn test_structure() {
        Component::get_structure();
    }
}
