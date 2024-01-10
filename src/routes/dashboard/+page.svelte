<script lang="ts">
  import { Card } from "flowbite-svelte";
  import TaskCard from "../../components/TaskCard.svelte";
  import { readTasks } from "../../services/service";
  import { onMount } from "svelte";
  import { formatDate } from "../../date";
  import Loader from "../../components/Loader.svelte";

  let data: any = [];
  let todayData: any = [];
  let pastData: any = [];

  let loading = false;
  let today: any = new Date();

  async function getTasks() {
    try {
      loading = true;
      const res: any = await readTasks();
      if (res.success) {
        data = res.data;
        todayData = data.filter(
          (f: any) => formatDate(f.createdDate) === formatDate(today)
        ).splice(0, 3);
        pastData = res.data.filter(
          (f: any) => formatDate(f.createdDate) !== formatDate(today)
        ).splice(0, 3);;
        console.log({ todayData });
        loading = false;
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  onMount(async () => {
    getTasks();
  });
</script>

<div class="h-full p-8">
  {#if loading}
  <div class="h-full flex justify-center items-center">
    <Loader loadingMsg=" " />
  </div>
  {:else}
  <div class="text-4xl">
    Today's Tasks
  </div>


  <div class="mt-4 space-y-2">
    {#if todayData?.length > 0}
      {#each todayData as item}
        <TaskCard data={item} />
      {/each}
    {:else}
      <div>No tasks yet</div>
    {/if}
  </div>

  <div class="pt-8 text-4xl">
    Past Tasks
  </div>
  <div class="mt-4 space-y-2">
    {#each pastData as item}
      <TaskCard data={item} />
    {/each}
  </div>
{/if}
</div>
