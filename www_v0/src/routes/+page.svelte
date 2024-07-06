<script lang="ts">
	import { getStructure, resourceInterface } from '../wasm/test_lib';
	let a = getStructure();
	let tr = new resourceInterface.ResourceCounter();

	let value = $state(0);
	$effect(() => {
		console.log(tr.getValue());
	});

	function update() {
		console.log('before ', tr.getValue());
		tr.addOne();
		console.log('after ', tr.getValue());
		value = tr.getValue();
	}
</script>

<pre>
	<p>Structure is</p>
	<p>number: {a.number}</p>
	<p>string: {a.someStr}</p>
	<p>{value}</p>
	<button on:click={update}>add</button>
</pre>
