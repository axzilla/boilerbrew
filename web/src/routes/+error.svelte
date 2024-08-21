<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
</script>

<div class="h-screen flex items-center justify-center">
	<div>
		<pre class="flex justify-center">
^__^
(oo)\_______
(__)\       )\/\
     ||----w |
     ||     ||
     </pre>
		<h1 class="text-4xl text-center font-bold mt-4">{$page.status}</h1>
		<h2 class="text-2xl text-center text-gray-600 mt-2">{$page.error?.message}</h2>
	</div>
</div>
