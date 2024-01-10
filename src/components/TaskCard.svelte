<script lang="ts">
  import Icon from "@iconify/svelte";
  import { formatDate } from "../date";

  export let data: any
  export let completed: boolean = false;
  

</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div
    class:bg-green-200={data.isCompleted}
    class="relative flex items-center space-x-3 rounded-lg bg-white p-5 shadow-md hover:border-gray-400"
  >
    <div class="min-w-0 flex-1">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-md font-bold text-sm text-gray-900">
          <span
            class="flex items-center mr-2 justify-center flex-shrink-0 bg-amber-100 rounded-md h-8 w-8"
            class:bg-white={data.isCompleted}
          >
            {#if data.isCompleted}
              <Icon icon="tabler:check" class="w-5 h-5 text-green-600" />
            {:else}
              <Icon icon="ph:clock" class="w-5 h-5" />
            {/if}
        </span>
          {data.title}
        </div>
        <div class="text-sm font-bold text-gray-500">{formatDate(data.createdDate)}</div>
      </div>
      {#if !data.isCompleted}
        <div class="p-1 text-sm font-medium truncate text-gray-500">
          {data.description}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- More people... -->
