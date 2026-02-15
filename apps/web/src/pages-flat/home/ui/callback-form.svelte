<script lang="ts">
    import { maska } from "maska/svelte"
    import { createForm } from '@tanstack/svelte-form'

    const API_URL = import.meta.env.PUBLIC_API_URL

  const form = createForm(() => ({
      defaultValues: {
        name: '',
        phone: '',
      },
      onSubmit: async ({ value }) => {
        await fetch(`${API_URL}/api/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        alert(`Запрос отправлен: ${JSON.stringify(value)}`)
      },
    }))
</script>

<form class="flex flex-col grow size-full gap-3 py-4" onsubmit={(e) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }}>
      <form.Field name="name">
        {#snippet children(field)}
            <div class="flex flex-col gap-1">
                <label for={field.name}>Имя</label>
                <input
                    id={field.name}
                    type="text"
                    placeholder="Имя"
                    value={field.state.value}
                    onblur={() => field.handleBlur()}
                    class="border border-input h-7.5 text-sm px-2 rounded-sm"
                    oninput={(e: Event) => {
                        const target = e.target as HTMLInputElement
                        field.handleChange(target.value)
                    }}
                />
            </div>
        {/snippet}
      </form.Field>

      <form.Field name="phone">
        {#snippet children(field)}
            <div class="flex flex-col gap-1">
                <label for={field.name}>Телефон</label>
                <input
                    id={field.name}
                    type="text"
                    placeholder="+7"
                    use:maska={'+7 (###) ###-##-##'}
                    value={field.state.value}
                    onblur={() => field.handleBlur()}
                    class="border border-input h-7.5 text-sm px-2 rounded-sm"
                    oninput={(e: Event) => {
                        const target = e.target as HTMLInputElement
                        field.handleChange(target.value)
                    }}
                />
            </div>
        {/snippet}
      </form.Field>

    <button type="submit" class="mt-auto bg-primary text-primary-foreground rounded-sm h-8 text-sm">
        Отправить
    </button>
</form>
