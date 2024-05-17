let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

const instantiateCore = WebAssembly.instantiate;

const utf8Decoder = new TextDecoder();


let exports0;
let memory0;
let postReturn0;

function getStructure() {
  const ret = exports0['get-structure']();
  var ptr0 = dataView(memory0).getInt32(ret + 8, true);
  var len0 = dataView(memory0).getInt32(ret + 12, true);
  var result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  postReturn0(ret);
  return {
    number: BigInt.asUintN(64, dataView(memory0).getBigInt64(ret + 0, true)),
    someStr: result0,
  };
}

const $init = (async() => {
  const module0 = fetchCompile(new URL('./test_lib.core.wasm', import.meta.url));
  ({ exports: exports0 } = await instantiateCore(await module0));
  memory0 = exports0.memory;
  postReturn0 = exports0['cabi_post_get-structure'];
})();

await $init;

export { getStructure,  }