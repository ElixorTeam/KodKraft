<script lang="ts">
  import { Fancybox, type FancyboxOptions } from "@fancyapps/ui";
  import { tick } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    options,
    children,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    options?: Partial<FancyboxOptions>;
  } = $props();

  let container: HTMLElement | null = null;

  $effect(() => {
    if (!container) return;

    async function init() {
      await tick();
      if (!container) return;

      Fancybox.bind(container, "[data-fancybox]", options);
    }

    init();

    return () => {
      if (container) {
        Fancybox.unbind(container);
        Fancybox.close();
      }
    };
  });
</script>

<div bind:this={container} {...restProps}>
  {@render children?.()}
</div>
