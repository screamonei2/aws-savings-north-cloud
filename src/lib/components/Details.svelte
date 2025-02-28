<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchSavingsData } from '../../services/api';

	let title: string = 'Details';
	let detailedSavings: { date: string; service: string; amount: number }[] = [];
	let totalAmount: number = 0;

	async function fetchData(): Promise<void> {
		const data = await fetchSavingsData();
		if (data && data.detailedSavings) {
			detailedSavings = data.detailedSavings;
			totalAmount = detailedSavings.reduce((sum, item) => sum + item.amount, 0);
		}
	}

	onMount(fetchData);
</script>

<div class="border-north w-full rounded-lg border">
	<div class="card-header border-north my-6 border-b p-6">
		<h5 class="satoshi mb-3 text-xl font-normal text-white uppercase">{title}</h5>
	</div>
	<div class="overflow-x-auto px-6 pb-6">
		<table class="text-gray-north-sec w-full border-collapse text-left">
			<thead>
				<tr class="border-north-2 border-b">
					<th class="w-1/3 py-5 font-semibold">Date</th>
					<th class="w-1/3 py-5 font-semibold">Service</th>
					<th class="w-1/3 py-5 text-right font-semibold">Amount ($)</th>
				</tr>
			</thead>
			<tbody>
				{#each detailedSavings as { date, service, amount }}
					<tr class="text-gray-north border-north-2 border-t border-b">
						<td class="w-1/3 py-5">{date}</td>
						<td class="w-1/3 py-5">{service}</td>
						<td class="w-1/3 py-5 text-right">${amount.toFixed(2)}</td>
					</tr>
				{/each}
				<!-- Linha do Total -->
				<tr class="border-north-2 border-t font-semibold">
					<td class="w-1/3 py-5" colspan="2">Total</td>
					<td class="text-gray-north w-1/3 py-5 text-right">${totalAmount.toFixed(2)}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
