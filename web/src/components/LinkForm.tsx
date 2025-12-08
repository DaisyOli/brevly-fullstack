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
        shortCode: data.shortCode.trim() || undefined, // opcional de verdade
      })

      // limpa campos
      reset()

      // avisa a Home que deu certo
      onCreateSuccess?.(newLink)
    } catch (err: any) {
      console.error(err)

      // tenta pegar o status de diferentes formatos de erro (fetch, axios, erro customizado)
      const status =
        err?.status ??
        err?.response?.status ??
        err?.cause?.status

      if (status === 409) {
        // conflito -> shortCode já existe
        setApiErrorMessage('Essa URL encurtada já existe.')
      } else {
        setApiErrorMessage('Não foi possível criar o link. Tente novamente.')
      }
    }
  }

  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm px-6 pt-6 pb-5 md:px-8 md:pt-8 md:pb-6 w-full">
        <h2 className="text-lg pb-5 font-bold text-[#20222A] ">Novo link</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* LINK ORIGINAL */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-[#737A87]">
              LINK ORIGINAL
            </label>
            <input
              type="text"
              placeholder="www.exemplo.com.br"
              className="w-full rounded-lg border border-[#C6CBD6] bg-white px-3 py-2 text-[14px] text-[#20222A] outline-none focus:border-[#3C4BDD] focus:ring-1 focus:ring-[#3C4BDD]"
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
              <span className="text-[14px] text-[#737A87] mr-1">brev.ly/</span>
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

          {/* botão */}
          <button
  type="submit"
  className="
    mt-4 w-full 
    rounded-xl            
    bg-[#3C4BDD] 
    py-4                 
    text-sm md:text-base  
    font-semibold 
    text-white 
    shadow-sm 
    hover:bg-[#323CCB] 
    transition-colors
  "
>
            {isSubmitting ? 'Salvando...' : 'Salvar link'}
          </button>
        </form>
      </section>

      {/* Toast de erro no canto inferior direito */}
      {apiErrorMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-start gap-3 rounded-lg bg-[#FEE2E2] px-4 py-3 shadow-lg border border-[#FCA5A5] text-[#7F1D1D] min-w-[260px]">
            {/* ícone de alerta simples */}
            <div className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-[#DC2626] text-white text-xs font-bold">
              !
            </div>

            <div className="flex-1 text-sm">
              <p className="font-semibold">Erro no cadastro</p>
              <p>{apiErrorMessage}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
