<script>
	import { onMount } from 'svelte';
	import { fetchSavingsData } from '../../services/api';

	let title = 'Percentage';
	let percentageChange = 0;

	async function fetchData() {
		const data = await fetchSavingsData();

		if (data && data.overview) {
			percentageChange = data.overview.percentageChange;
		}
	}

	onMount(fetchData);
</script>

<div class="border-north w-full rounded-lg border p-6 sm:max-w-sm">
	<h5 class="text-gray-north mb-3 font-normal uppercase">{title}</h5>
	<p class="satoshi text-green-north mb-2 text-2xl font-bold tracking-tight">
		+{percentageChange.toFixed(2)}% <span class="material-symbols-outlined"> trending_up </span>
	</p>
</div>
