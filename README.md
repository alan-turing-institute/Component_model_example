# Component model example

This repo is to explore using the component model in wasm through rust to deliver functionality to web apps.

It uses 
- [WIT](https://component-model.bytecodealliance.org/design/wit.html) to define an interface
- [cargo-component](https://github.com/bytecodealliance/cargo-component) to build it in to a wasm component 
- [jco](https://github.com/bytecodealliance/jco) to produce bindings for that component for JS 
- [svelte]() as a framework 

## Building the wasm component 

The wasm component can be built using

```bash
pnpm build_wasm 
```

this will produce the wasm file and the JS bindings 

## Runnning the app 

```
pnpm dev 
```
