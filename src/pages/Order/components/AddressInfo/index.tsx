import { MapPin } from '@phosphor-icons/react'
import { FormEvent, useCallback, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { fetchAddressByCep, onlyDigits } from '../../../../util/cep'
import {
  ErrorMessage,
  Field,
  Input,
  SectionContainer,
  Status,
} from './styles'

type CepStatus = 'idle' | 'loading' | 'error'

export function AddressInfo() {
  const {
    register,
    setValue,
    setFocus,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const [cepStatus, setCepStatus] = useState<CepStatus>('idle')
  const lastLookedUpCep = useRef<string>('')

  const lookupCep = useCallback(
    async (cep: string) => {
      setCepStatus('loading')

      try {
        const address = await fetchAddressByCep(cep)

        if (!address) {
          setCepStatus('error')
          setError('postalCode', {
            type: 'manual',
            message: 'CEP não encontrado',
          })
          return
        }

        setCepStatus('idle')
        clearErrors('postalCode')
        setValue('street', address.street, { shouldValidate: true })
        setValue('neighborhood', address.neighborhood, { shouldValidate: true })
        setValue('city', address.city, { shouldValidate: true })
        setValue('state', address.state, { shouldValidate: true })
        setFocus('number')
      } catch {
        setCepStatus('error')
        setError('postalCode', {
          type: 'manual',
          message: 'Não foi possível buscar o CEP. Tente novamente.',
        })
      }
    },
    [setValue, setFocus, setError, clearErrors],
  )

  const handleCEPKeyUp = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const input = event.currentTarget
      input.maxLength = 10
      input.value = onlyDigits(input.value).replace(
        /^(\d{2})(\d{3})(\d)/,
        '$1.$2-$3',
      )

      const digits = onlyDigits(input.value)
      if (digits.length === 8 && digits !== lastLookedUpCep.current) {
        lastLookedUpCep.current = digits
        lookupCep(digits)
      }
    },
    [lookupCep],
  )

  return (
    <SectionContainer>
      <header>
        <MapPin size={22} />
        <div>
          <h4>Endereço de entrega</h4>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
      </header>
      <fieldset>
        <div>
          <Field $width="12.5rem">
            <Input
              id="postal-code"
              type="text"
              inputMode="numeric"
              placeholder="Código Postal"
              aria-label="Código postal"
              $hasError={!!errors.postalCode}
              onKeyUp={handleCEPKeyUp}
              {...register('postalCode')}
            />
            {cepStatus === 'loading' ? (
              <Status role="status">Buscando endereço…</Status>
            ) : (
              <ErrorMessage>
                {errors.postalCode?.message as string}
              </ErrorMessage>
            )}
          </Field>
        </div>

        <div>
          <Field $grow>
            <Input
              id="street"
              type="text"
              maxLength={120}
              placeholder="Rua"
              aria-label="Rua"
              $hasError={!!errors.street}
              {...register('street')}
            />
            <ErrorMessage>{errors.street?.message as string}</ErrorMessage>
          </Field>
        </div>

        <div>
          <Field $width="7.5rem">
            <Input
              id="number"
              type="text"
              maxLength={12}
              placeholder="Número"
              aria-label="Número"
              $hasError={!!errors.number}
              {...register('number')}
            />
            <ErrorMessage>{errors.number?.message as string}</ErrorMessage>
          </Field>
          <Field $grow>
            <Input
              id="complement"
              type="text"
              maxLength={80}
              placeholder="Complemento"
              aria-label="Complemento (opcional)"
              {...register('complement')}
            />
          </Field>
        </div>

        <div>
          <Field $width="12.5rem">
            <Input
              id="neighborhood"
              type="text"
              maxLength={60}
              placeholder="Bairro"
              aria-label="Bairro"
              $hasError={!!errors.neighborhood}
              {...register('neighborhood')}
            />
            <ErrorMessage>
              {errors.neighborhood?.message as string}
            </ErrorMessage>
          </Field>
          <Field $grow>
            <Input
              id="city"
              type="text"
              maxLength={80}
              placeholder="Cidade"
              aria-label="Cidade"
              $hasError={!!errors.city}
              {...register('city')}
            />
            <ErrorMessage>{errors.city?.message as string}</ErrorMessage>
          </Field>
          <Field $width="4rem">
            <Input
              id="state"
              type="text"
              maxLength={2}
              placeholder="UF"
              aria-label="Estado (UF)"
              $hasError={!!errors.state}
              {...register('state')}
            />
            <ErrorMessage>{errors.state?.message as string}</ErrorMessage>
          </Field>
        </div>
      </fieldset>
    </SectionContainer>
  )
}
