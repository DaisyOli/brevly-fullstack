import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createLink, type Link } from '../lib/api'
import {
  createLinkSchema,
  type CreateLinkInput,
} from '../validation/link'

interface LinkFormProps {
  onCreateSuccess?: (link: Link) => void
}

export function LinkForm({ onCreateSuccess }: LinkFormProps) {
  // erro de requisição (API), separado dos erros de validação
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalUrl: '',
      shortCode: '',
    },
  })

  async function onSubmit(data: CreateLinkInput) {
    try {
      setApiErrorMessage(null)

      const newLink = await createLink({
        originalUrl: data.originalUrl,
        shortCode: data.shortCode || undefined,
      })

      // limpa campos
      reset()

      // avisa a Home que deu certo
      onCreateSuccess?.(newLink)
    } catch (err) {
      console.error(err)
      setApiErrorMessage('Não foi possível criar o link. Tente novamente.')
    }
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[#20222A]">Novo link</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* LINK ORIGINAL */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-[#737A87]">
            LINK ORIGINAL
          </label>
          <input
            type="text"
            placeholder="www.exemplo.com.br"
            className="w-full rounded-lg border border-[#C6CBD6] bg-white px-3 py-2 text-sm text-[#20222A] outline-none focus:border-[#3C4BDD] focus:ring-1 focus:ring-[#3C4BDD]"
            {...register('originalUrl')}
          />
          {errors.originalUrl && (
            <p className="mt-1 text-xs text-[#E73D4D]">
              {errors.originalUrl.message}
            </p>
          )}
        </div>

        {/* LINK ENCURTADO (opcional) */}
        <div className="flex flex-col gap-1">
  <label className="text-[10px] font-semibold text-[#737A87]">
    LINK ENCURTADO
  </label>

  <div className="flex items-center rounded-lg border border-[#C6CBD6] bg-white px-3 py-2 focus-within:border-[#3C4BDD] focus-within:ring-1 focus-within:ring-[#3C4BDD]">
    <span className="text-sm text-[#737A87] mr-1">brev.ly/</span>
    <input
      type="text"
      className="flex-1 outline-none text-sm text-[#20222A]"
      {...register('shortCode')}
    />
  </div>

  {errors.shortCode && (
    <p className="mt-1 text-xs text-[#E73D4D]">
      {errors.shortCode.message}
    </p>
  )}
</div>

        {/* Erro de API (não de validação) */}
        {apiErrorMessage && (
          <p className="text-xs text-[#E73D4D]">{apiErrorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-lg bg-[#3C4BDD] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2f3ec0] disabled:opacity-60"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar link'}
        </button>
      </form>
    </section>
  )
}
