<script lang="ts">
	import { getStructure } from '../wasm/test_lib';
	let a = getStructure();
	console.log(a);
</script>

<pre>
	<p>Structure is</p>
	<p>number: {a.number}</p>
	<p>string: {a.someStr}</p>
</pre>
