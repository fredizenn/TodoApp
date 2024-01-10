<script lang="ts">
  import "../app.css";
  import { DarkMode } from "flowbite-svelte";
  import Sidebar from "../components/Sidebar.svelte";

  const sideBarMenus = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "ic:round-home",
      iconColor: "text-[#49B08A]",
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: "fluent:tasks-app-24-filled",
      iconColor: "text-[#49B08A]",
    },
  ];
</script>

<!-- <DarkMode /> -->
<div class="h-screen p-10 bg-slate-100 overflow-auto">
  <!-- <div class="h-full w-2/3 mx-auto align-middle bg-slate-50"> -->
    <div class="flex h-full rounded-3xl overflow-auto mx-auto align-middle w-4/5">
      <div class="sticky shadow-md top-0">
        <Sidebar menus={sideBarMenus} />
      </div>
      <div class="flex bg-white flex-col w-full p-4 overflow-auto">
        <slot />
      </div>
    </div>


  <!-- </div>  -->
</div>
