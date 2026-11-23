<script lang="ts">
	// Test double for a third-party component: records a copy of every prop it is given.
	let props: Record<string, unknown> = $props();
	$effect.pre(() => {
		(globalThis as { spiedProps?: Record<string, unknown> }).spiedProps = { ...props };
	});
</script>

<div class="props-spy"></div>
