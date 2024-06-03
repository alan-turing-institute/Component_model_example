<script lang="ts">
	import { getStructure, resourceInterface } from '../wasm/test_lib';
	let a = getStructure();
	let tr = new resourceInterface.TestResource();

	$effect(() => {
		console.log(tr.getValue());
	});

	function update() {
		console.log('here ', tr.getValue());
		tr.addOne();
		console.log('after ', tr.getValue());
	}

	console.log(a);
</script>

<pre>
	<p>Structure is</p>
	<p>number: {a.number}</p>
	<p>string: {a.someStr}</p>
	<p>{tr.getValue()}</p>
	<p>do something: {tr.doSomething()}</p>
	<button on:click={update}>add</button>
</pre>
