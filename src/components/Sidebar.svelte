<script lang="ts" context="module">
	export interface IMenu {
		label: string;
		path: string;
		icon: string | IconifyIcon;
		iconColor: string;
	}
</script>

<script lang="ts">
	import {
		Sidebar,
		SidebarWrapper,
		SidebarBrand,
		SidebarItem,
		SidebarGroup
	} from 'flowbite-svelte';
	import Icon, { type IconifyIcon } from '@iconify/svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	export let menus: IMenu[] = [];

	let activeClass = 'bg-amber-200 text-gray-700 font-bold shadow';
	let nonActiveClass = 'text-gray-500 font-medium'
	$: activeUrl = $page.route.id;

	$: if (activeUrl) {
		let splitResult: any = $page.route.id?.split('/');
		if ((splitResult?.length ?? 0) > 2) {
			activeUrl = `/${splitResult[2]}`;
		}
	 console.log(activeUrl);
	}

	let site = {
		name: '',
		href: '/',
		img: ""
	};

	$: console.log(activeUrl)
</script>

<Sidebar {activeUrl} {activeClass} {nonActiveClass} asideClass="hidden bg-white lg:block w-40 h-full">
	<SidebarWrapper divClass="h-full py-2">
		<SidebarGroup ulClass="space-y-3 ">
			<SidebarBrand
				{site}
				aClass="flex items-center gap-3 m-5 justify-center"
				imgClass="h-20 sm:h-20"
			/>
			{#if menus.length}
				{#each menus as { icon, path, label, iconColor }}
					<div class="mx-auto align-middle px-4" in:fade out:fade>
						<SidebarItem
							href={path}
							{label}
							class="space-x-2 py-2 rounded-lg  flex mx-auto align-middle items-center transition ease-in-out hover:text-gray-800 delay-150 hover:-translate-y-1 hover:scale-100 duration-300"
						>
							<svelte:fragment slot="icon">
								<Icon
									{icon}
									class="ml-2 h-5 w-5"
								/>
							</svelte:fragment>
						</SidebarItem>
					</div>
				{/each}
			{/if}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
