<script lang="ts">
  import Icon from "@iconify/svelte";

  export let loadingMsg = "Loading"

</script>
<div class="flex flex-col items-center justify-center">
    <Icon icon="ph:dot-duotone" class="w-20 h-20 animate animate-bounce text-amber-600" />
    <div class="text-sm font-bold text-gray-400">{loadingMsg}...</div>
</div>