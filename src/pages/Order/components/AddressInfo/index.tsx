import { MapPin } from '@phosphor-icons/react'
import { FormEvent, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage, Field, Input, SectionContainer } from './styles'

export function AddressInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const handleCEPKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 10
    e.currentTarget.value = e.currentTarget.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3')
  }, [])

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
              placeholder="Código Postal"
              aria-label="Código postal"
              $hasError={!!errors.postalCode}
              onKeyUp={handleCEPKeyUp}
              {...register('postalCode')}
            />
            <ErrorMessage>{errors.postalCode?.message as string}</ErrorMessage>
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
            <ErrorMessage>{errors.neighborhood?.message as string}</ErrorMessage>
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
