<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { formSchema } from "../model/form-schema";
  import { Input, MaskedInput } from "@/shared/ui/input";
  import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

  const API_URL = import.meta.env.PUBLIC_API_URL;

  let metric = $state("");

  const form = createForm(() => ({
    defaultValues: {
      name: "",
      phone: ""
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      await fetch(`${API_URL}/api/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ metric, ...value })
      });

      const callbackDialog = document.querySelector("#callback-dialog");
      const successDialog = document.querySelector("#success-dialog");

      callbackDialog?.dispatchEvent(new Event("dialog:close"));
      successDialog?.dispatchEvent(new Event("dialog:open"));
      form.reset();
    }
  }));

  const findDialogButton = (target: EventTarget | null): HTMLElement | null => {
    if (!(target instanceof HTMLElement)) return null;
    return target.closest('[data-dialog-for="callback-dialog"]');
  };

  const handleClick = (event: MouseEvent) => {
    const button = findDialogButton(event.target);
    if (!button) return;

    const metricValue = button.dataset.metric;
    metric = metricValue ?? "";
    console.log(metric);
  };
</script>

<svelte:document on:click={(event) => handleClick(event)} />

<form
  class="flex flex-col grow size-full gap-2 md:gap-4"
  onsubmit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }}
>
  <form.Field name="name">
    {#snippet children(field)}
      <Field
        data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      >
        <FieldLabel for={field.name}>Имя</FieldLabel>
        <Input
          id={field.name}
          type="text"
          placeholder="Имя"
          value={field.state.value}
          onblur={() => field.handleBlur()}
          oninput={(e: Event) => {
            const target = e.target as HTMLInputElement;
            field.handleChange(target.value);
          }}
        />

        {#if field.state.meta.isTouched && !field.state.meta.isValid}
          <FieldError errors={field.state.meta.errors} />
        {/if}
      </Field>
    {/snippet}
  </form.Field>

  <form.Field name="phone">
    {#snippet children(field)}
      <Field
        data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      >
        <FieldLabel for={field.name}>Телефон</FieldLabel>
        <MaskedInput
          id={field.name}
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          placeholder="+7 (___) ___-__-__"
          template={{ mask: "+7 (###) ###-##-##" }}
          value={field.state.value}
          onblur={() => field.handleBlur()}
          oninput={(e: Event) => {
            const target = e.target as HTMLInputElement;
            field.handleChange(target.value);
          }}
        />

        {#if field.state.meta.isTouched && !field.state.meta.isValid}
          <FieldError errors={field.state.meta.errors} />
        {/if}
      </Field>
    {/snippet}
  </form.Field>

  <div class="flex flex-col gap-2 mt-6 md:mt-10">
    <button
      type="submit"
      class="bg-primary text-primary-foreground font-semibold rounded-sm h-9 text-sm"
    >
      Отправить
    </button>
  </div>
</form>
