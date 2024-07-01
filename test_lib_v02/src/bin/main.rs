use test_lib_v02::{bindings::Guest, bindings::Structure, Component};
// use test_lib_v02::{bindings::Guest, Component};

fn main() {
    println!("{}", Component::hello_world());
    println!("{:?}", Component::get_structure());
}
