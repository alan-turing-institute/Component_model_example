const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

function clampGuest(i, min, max) {
  if (i < min || i > max) throw new TypeError(`must be between ${min} and ${max}`);
  return i;
}

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

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();


let exports0;
let exports1;
let exports2;
let memory0;
let postReturn0;
const handleTable0 = [T_FLAG, 0];
const finalizationRegistry0 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable0, handle);
  exports0['0'](rep);
});

handleTables[0] = handleTable0;
const trampoline0 = rscTableCreateOwn.bind(null, handleTable0);
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable0, handle);
  if (handleEntry.own) {
    
    exports0['0'](handleEntry.rep);
  }
}

class UniverseResource{
  constructor() {
    const ret = exports1['component:pkg-component/universe#[constructor]universe-resource']();
    var handle1 = ret;
    var rsc0 = new.target === UniverseResource ? this : Object.create(UniverseResource.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    finalizationRegistry0.register(rsc0, handle1, rsc0);
    Object.defineProperty(rsc0, symbolDispose, { writable: true, value: function () {
      finalizationRegistry0.unregister(rsc0);
      rscTableRemove(handleTable0, handle1);
      rsc0[symbolDispose] = emptyFunc;
      rsc0[symbolRscHandle] = null;
      exports0['0'](handleTable0[(handle1 << 1) + 1] & ~T_FLAG);
    }});
    return rsc0;
  }
}

UniverseResource.prototype.tick = function tick() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable0[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "UniverseResource" resource.');
  }
  var handle0 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  exports1['component:pkg-component/universe#[method]universe-resource.tick'](handle0);
};

UniverseResource.prototype.render = function render() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable0[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "UniverseResource" resource.');
  }
  var handle0 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['component:pkg-component/universe#[method]universe-resource.render'](handle0);
  var ptr2 = dataView(memory0).getInt32(ret + 0, true);
  var len2 = dataView(memory0).getInt32(ret + 4, true);
  var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
  postReturn0(ret);
  return result2;
};

UniverseResource.prototype.width = function width() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable0[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "UniverseResource" resource.');
  }
  var handle0 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['component:pkg-component/universe#[method]universe-resource.width'](handle0);
  return ret >>> 0;
};

UniverseResource.prototype.height = function height() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable0[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "UniverseResource" resource.');
  }
  var handle0 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['component:pkg-component/universe#[method]universe-resource.height'](handle0);
  return ret >>> 0;
};

UniverseResource.prototype.cells = function cells() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable0[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "UniverseResource" resource.');
  }
  var handle0 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['component:pkg-component/universe#[method]universe-resource.cells'](handle0);
  var ptr2 = dataView(memory0).getInt32(ret + 0, true);
  var len2 = dataView(memory0).getInt32(ret + 4, true);
  var result2 = new Uint8Array(memory0.buffer.slice(ptr2, ptr2 + len2 * 1));
  postReturn0(ret);
  return result2;
};

UniverseResource.prototype.getValue = function getValue(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable0[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "UniverseResource" resource.');
  }
  var handle0 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['component:pkg-component/universe#[method]universe-resource.get-value'](handle0, toUint32(arg1));
  return clampGuest(ret, 0, 255);
};

const $init = (async() => {
  const module0 = fetchCompile(new URL('./pkg_component.core.wasm', import.meta.url));
  const module1 = base64Compile('AGFzbQEAAAABBQFgAX8AAwIBAAQFAXABAQEHEAIBMAAACCRpbXBvcnRzAQAKCwEJACAAQQARAAALAC8JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQHMC4yMDguMQBeBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0BQgEAP2R0b3ItW2V4cG9ydF1jb21wb25lbnQ6cGtnLWNvbXBvbmVudC91bml2ZXJzZS11bml2ZXJzZS1yZXNvdXJjZQ');
  const module2 = base64Compile('AGFzbQEAAAABBQFgAX8AAhUCAAEwAAAACCRpbXBvcnRzAXABAQEJBwEAQQALAQAALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIwOC4xABwEbmFtZQAVFHdpdC1jb21wb25lbnQ6Zml4dXBz');
  ({ exports: exports0 } = await instantiateCore(await module1));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    '[export]component:pkg-component/universe': {
      '[resource-drop]universe-resource': trampoline1,
      '[resource-new]universe-resource': trampoline0,
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module2, {
    '': {
      $imports: exports0.$imports,
      '0': exports1['component:pkg-component/universe#[dtor]universe-resource'],
    },
  }));
  memory0 = exports1.memory;
  postReturn0 = exports1['cabi_post_component:pkg-component/universe#[method]universe-resource.cells'];
})();

await $init;
const universe = {
  UniverseResource: UniverseResource,
  
};

export { universe, universe as 'component:pkg-component/universe',  }