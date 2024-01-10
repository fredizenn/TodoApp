<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Button, ButtonGroup, Input, Label, Modal } from "flowbite-svelte";
  import { completeTask, createTask, deleteTask, readTasks } from "../../services/service";
  import { onMount } from "svelte";
  import { formatDate } from "../../date";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import { reporter, ValidationMessage } from "@felte/reporter-svelte";
  import * as z from "zod";
  import Loader from "../../components/Loader.svelte";

  let data: any = [];
  let loading = false;
  let saving = false;
  let showModal = false;
  let finishing = false;
  let taskIdInProgress: any = null;
  let deleting = false;
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  });

  async function getTasks() {
    try {
      loading = true;
      const res: any = await readTasks();
      if (res.success) {
        data = res.data;
        loading = false;
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const { form, isValid, touched } = createForm({
    initialValues: {
      title: "",
      description: "",
    },

    extend: [validator({ schema }), reporter()],

    onSubmit: async (values) => {
      await addTask(values);
    },
  });

  async function addTask(values: any) {
    try {
      saving = true;
      const res = await createTask(values.title, values.description);
      if (res.success) {
        showModal = false;
        saving = false;
        getTasks();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function done(id: any) {
    try {
      finishing = true;
      taskIdInProgress = id;
      const res = await completeTask(id);
      if(res.success) {
        await getTasks();
        finishing = false;
      } else {
        finishing = false;
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function removeTask(id: any) {
    try {
      deleting = true;
      taskIdInProgress = id;
      const res: any = await deleteTask(id);
      if (res.success) {
        deleting = false;
        await getTasks();
      } else {
        deleting = false;
        alert(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  onMount(async () => {
    await getTasks();
  });
</script>

<div class="h-full overflow-hidden p-8">
  <div class="text-4xl">Tasks</div>
  <div class="flex justify-end">
    <Button
      class="rounded-full p-0 h-12 w-12 flex items-center justify-center"
      color="yellow"
      on:click={() => (showModal = true)}
    >
      <Icon icon="carbon:add" class="w-8 h-8" />
    </Button>
  </div>

  {#if loading}
    <div class="h-full flex justify-center items-center">
      <Loader loadingMsg="Loading tasks" />
    </div>
  {:else}
    <div class="mt-2 flex flex-shrink justify-center mx-auto align-middle">
      <ButtonGroup>
        <Button color="light">
          <Icon icon="clarity:list-solid" class="w-3 h-3 me-2" />
          All
        </Button>
        <Button color="light">
          <Icon
            icon="fluent-mdl2:completed-solid"
            class="w-3 h-3 me-2 text-green-600"
          />
          Completed
        </Button>
        <Button color="light">
          <Icon icon="carbon:close-filled" class="w-3 h-3 me-2 text-red-600" />
          Not Completed
        </Button>
      </ButtonGroup>
    </div>

    {#if data.length > 0}
      <div class="h-5/6 overflow-auto">
        <ul role="list" class="divide-y divide-gray-100 p-4">
          {#each data as task}
            <li class="flex items-center justify-between gap-x-6 py-5">
              <div class="min-w-0">
                <div class="flex items-start gap-x-3">
                  <p class="text-sm font-semibold leading-6 text-gray-900">
                    {task.title}
                  </p>
                  {#if task.isCompleted}
                    <p
                      class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20"
                    >
                      Complete
                    </p>
                  {:else}
                    <p
                      class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20"
                    >
                      Not Completed
                    </p>
                  {/if}
                </div>
                <div
                  class="mt-1 items-center gap-x-2 text-xs leading-5 text-gray-500"
                >
                  <p class="truncate">{task.description}</p>

                  <p class="whitespace-nowrap">
                    {formatDate(task.createdDate)}
                  </p>
                  <!-- <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                    <circle cx="1" cy="1" r="1" />
                  </svg> -->
                </div>
              </div>
              <div class="flex flex-none items-center gap-x-2">
                <Button
                  color="alternative"
                  class="hidden rounded-md px-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm sm:block"
                  >View task</Button
                >
                {#if !task.isCompleted}
                {#if finishing && task.id === taskIdInProgress}
                  <Button
                    color="light"
                    class="hidden rounded-md p-2 text-sm font-semibold text-gray-900 shadow-sm sm:block"
                    ><Icon icon="line-md:loading-loop" class="w-4 h-4" /></Button
                  >
                  {:else} 
                  <Button
                  color="light"
                  on:click={() => done(task.id)}
                  class="hidden rounded-md p-2 text-sm font-semibold text-gray-900 shadow-sm sm:block"
                  ><Icon icon="tabler:check" class="w-4 h-4" /></Button
                >
                  {/if}
                {/if}
                {#if deleting && task.id === taskIdInProgress}
                
                <Button
                color="light"
                class="hidden rounded-md p-2 text-sm font-semibold text-gray-900 shadow-sm sm:block"
                ><Icon icon="line-md:loading-loop" class="w-4 h-4 text-red-700" /></Button
              >
                {:else}
                <Button
                color="light"
                on:click={() => removeTask(task.id)}
                class="hidden rounded-md p-2 text-sm font-semibold text-gray-900 shadow-sm sm:block"
                ><Icon icon="iconamoon:trash-fill" class="w-4 h-4 text-red-700" /></Button
              >
                {/if}
                
                <!-- <div class="relative flex-none">
                  <button type="button" class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900" id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open options</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                    </svg>
                  </button>
                
                </div> -->
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <p class="text-sm text-gray-500">No tasks found.</p>
    {/if}
  {/if}
</div>

{#if showModal}
  <Modal bind:open={showModal} title="Add Task">
    <form use:form>
      <div class="mb-6">
        <Label for="title" class="block mb-2">Title</Label>
        <Input id="title" name="title" size="sm" />
      </div>
      <div class="mb-6">
        <Label for="description" class="block mb-2">Description</Label>
        <Input id="description" name="description" size="sm" />
      </div>
      {#if saving}
        <Button color="green" disabled class="flex mx-auto align-middle"
          >Saving...</Button
        >
      {:else}
        <Button
          color="green"
          disabled={$isValid ? false : true}
          class="flex mx-auto align-middle"
          type="submit">Save</Button
        >
      {/if}
    </form>
  </Modal>
{/if}
