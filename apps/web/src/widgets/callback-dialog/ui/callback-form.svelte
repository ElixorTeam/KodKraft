<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { formSchema } from "../model/form-schema";
  import { Input, MaskedInput } from "@/shared/ui/input";
  import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

  const API_URL = import.meta.env.PUBLIC_API_URL;

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
        body: JSON.stringify(value)
      });

      alert(`Запрос отправлен: ${JSON.stringify(value)}`);
    }
  }));
</script>

<form
  class="flex flex-col grow size-full gap-3 py-4"
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
      </Field>

      {#if field.state.meta.isTouched && !field.state.meta.isValid}
        <FieldError errors={field.state.meta.errors} />
      {/if}
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
          type="text"
          placeholder="+7"
          template={{ mask: "+7 (###) ###-##-##" }}
          value={field.state.value}
          onblur={() => field.handleBlur()}
          oninput={(e: Event) => {
            const target = e.target as HTMLInputElement;
            field.handleChange(target.value);
          }}
        />
      </Field>

      {#if field.state.meta.isTouched && !field.state.meta.isValid}
        <FieldError errors={field.state.meta.errors} />
      {/if}
    {/snippet}
  </form.Field>

  <div class="flex flex-col gap-2 mt-auto">
    <button
      type="submit"
      class="bg-primary text-primary-foreground rounded-sm h-8 text-sm"
    >
      Отправить
    </button>
  </div>
</form>
