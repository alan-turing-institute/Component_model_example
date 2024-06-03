const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const emptyFunc = () => {};

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function finalizationRegistryCreate (unregister) {
  if (typeof FinalizationRegistry === 'undefined') {
    return { unregister () {} };
  }
  return new FinalizationRegistry(unregister);
}

const handleTables = [];

const instantiateCore = WebAssembly.instantiate;

const T_FLAG = 1 << 30;

function rscTableCreateOwn (table, rep) {
  const free = table[0] & ~T_FLAG;
  if (free === 0) {
    table.push(0);
    table.push(rep | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep | T_FLAG;
  return free;
}

function rscTableRemove (table, handle) {
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) throw new TypeError('Invalid handle');
  table[handle << 1] = table[0] | T_FLAG;
  table[0] = handle | T_FLAG;
  return { rep, scope, own };
}

const symbolRscHandle = Symbol('handle');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const utf8Decoder = new TextDecoder();


let exports0;
let exports1;
let exports2;
let memory0;
let postReturn0;
let postReturn1;
const handleTable1 = [T_FLAG, 0];
const finalizationRegistry1 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable1, handle);
  exports0['0'](rep);
});

handleTables[1] = handleTable1;
const trampoline0 = rscTableCreateOwn.bind(null, handleTable1);

function getStructure() {
  const ret = exports1['get-structure']();
  var ptr0 = dataView(memory0).getInt32(ret + 8, true);
  var len0 = dataView(memory0).getInt32(ret + 12, true);
  var result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  postReturn0(ret);
  return {
    number: BigInt.asUintN(64, dataView(memory0).getBigInt64(ret + 0, true)),
    someStr: result0,
  };
}

class TestResource{
  constructor() {
    const ret = exports1['component:test-component/resource-interface#[constructor]test-resource']();
    var handle1 = ret;
    var rsc0 = new.target === TestResource ? this : Object.create(TestResource.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    finalizationRegistry1.register(rsc0, handle1, rsc0);
    Object.defineProperty(rsc0, symbolDispose, { writable: true, value: function () {
      finalizationRegistry1.unregister(rsc0);
      rscTableRemove(handleTable1, handle1);
      rsc0[symbolDispose] = emptyFunc;
      rsc0[symbolRscHandle] = null;
      exports0['0'](handleTable1[(handle1 << 1) + 1] & ~T_FLAG);
    }});
    return rsc0;
  }
}

TestResource.prototype.doSomething = function doSomething() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable1[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "TestResource" resource.');
  }
  var handle0 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['component:test-component/resource-interface#[method]test-resource.do-something'](handle0);
  var ptr2 = dataView(memory0).getInt32(ret + 0, true);
  var len2 = dataView(memory0).getInt32(ret + 4, true);
  var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
  postReturn1(ret);
  return result2;
};

TestResource.prototype.addOne = function addOne() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable1[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "TestResource" resource.');
  }
  var handle0 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  exports1['component:test-component/resource-interface#[method]test-resource.add-one'](handle0);
};

TestResource.prototype.getValue = function getValue() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable1[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "TestResource" resource.');
  }
  var handle0 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['component:test-component/resource-interface#[method]test-resource.get-value'](handle0);
  return ret >>> 0;
};

const $init = (async() => {
  const module0 = fetchCompile(new URL('./test_lib.core.wasm', import.meta.url));
  const module1 = base64Compile('AGFzbQEAAAABBQFgAX8AAwIBAAQFAXABAQEHEAIBMAAACCRpbXBvcnRzAQAKCwEJACAAQQARAAALAC4JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQGMC4xOC4yAGUEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQFJAQBGZHRvci1bZXhwb3J0XWNvbXBvbmVudDp0ZXN0LWNvbXBvbmVudC9yZXNvdXJjZS1pbnRlcmZhY2UtdGVzdC1yZXNvdXJjZQ');
  const module2 = base64Compile('AGFzbQEAAAABBQFgAX8AAhUCAAEwAAAACCRpbXBvcnRzAXABAQEJBwEAQQALAQAALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE4LjIAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  ({ exports: exports0 } = await instantiateCore(await module1));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    '[export]component:test-component/resource-interface': {
      '[resource-new]test-resource': trampoline0,
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module2, {
    '': {
      $imports: exports0.$imports,
      '0': exports1['component:test-component/resource-interface#[dtor]test-resource'],
    },
  }));
  memory0 = exports1.memory;
  postReturn0 = exports1['cabi_post_get-structure'];
  postReturn1 = exports1['cabi_post_component:test-component/resource-interface#[method]test-resource.do-something'];
})();

await $init;
const resourceInterface = {
  TestResource: TestResource,
  
};

export { resourceInterface, resourceInterface as 'component:test-component/resource-interface', getStructure,  }