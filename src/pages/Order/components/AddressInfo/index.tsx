import { MapPin, Plus, Star, Trash } from '@phosphor-icons/react'
import { FormEvent, useCallback, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { fetchAddressByCep, onlyDigits } from '../../../../util/cep'
import {
  ADDRESS_LABELS,
  addressEquals,
  SavedAddress,
} from '../../../../services/address'
import { OrderFormData, toAddressFields } from '../../orderForm'
import {
  AddressCard,
  ErrorMessage,
  Field,
  Input,
  NewAddressButton,
  SaveBlock,
  SavedAddresses,
  SectionContainer,
  Status,
} from './styles'

type CepStatus = 'idle' | 'loading' | 'error'

const ADDRESS_FIELDS = [
  'postalCode',
  'street',
  'number',
  'complement',
  'neighborhood',
  'city',
  'state',
] as const

interface AddressInfoProps {
  isAuthenticated: boolean
  addresses: SavedAddress[]
  onSetDefault: (id: string) => void
  onRemove: (id: string) => void
}

export function AddressInfo({
  isAuthenticated,
  addresses,
  onSetDefault,
  onRemove,
}: AddressInfoProps) {
  const {
    register,
    setValue,
    setFocus,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext<OrderFormData>()

  const [cepStatus, setCepStatus] = useState<CepStatus>('idle')
  const lastLookedUpCep = useRef<string>('')

  const values = watch()
  const currentFields = toAddressFields(values)
  const matchedSaved = addresses.find((saved) =>
    addressEquals(saved, currentFields),
  )
  const hasContent =
    currentFields.street.trim().length > 0 &&
    currentFields.number.trim().length > 0
  const showSaveBlock = isAuthenticated && hasContent && !matchedSaved
  const saveChecked = !!values.saveAddress

  function selectAddress(address: SavedAddress) {
    setValue('postalCode', address.postalCode, { shouldValidate: true })
    setValue('street', address.street, { shouldValidate: true })
    setValue('number', address.number, { shouldValidate: true })
    setValue('complement', address.complement ?? '')
    setValue('neighborhood', address.neighborhood, { shouldValidate: true })
    setValue('city', address.city, { shouldValidate: true })
    setValue('state', address.state, { shouldValidate: true })
    setValue('addressId', address.id)
    setValue('addressLabel', address.label)
    setValue('makeDefault', address.isDefault)
    setValue('saveAddress', false)
  }

  function startNewAddress() {
    for (const field of ADDRESS_FIELDS) {
      setValue(field, '')
    }
    setValue('addressId', '')
    setValue('addressLabel', 'Casa')
    setValue('makeDefault', addresses.length === 0)
    setValue('saveAddress', true)
    clearErrors()
    setFocus('postalCode')
  }

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

      {isAuthenticated && addresses.length > 0 && (
        <SavedAddresses>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              $selected={values.addressId === address.id}
            >
              <button
                type="button"
                className="select"
                onClick={() => selectAddress(address)}
              >
                <span className="label">
                  {address.label}
                  {address.isDefault && <Star size={12} weight="fill" />}
                </span>
                <span className="summary">
                  {address.street}, {address.number} — {address.city}/
                  {address.state}
                </span>
              </button>
              <div className="actions">
                {!address.isDefault && (
                  <button
                    type="button"
                    title="Tornar preferencial"
                    aria-label={`Tornar ${address.label} preferencial`}
                    onClick={() => onSetDefault(address.id)}
                  >
                    <Star size={16} />
                  </button>
                )}
                <button
                  type="button"
                  title="Remover endereço"
                  aria-label={`Remover ${address.label}`}
                  onClick={() => onRemove(address.id)}
                >
                  <Trash size={16} />
                </button>
              </div>
            </AddressCard>
          ))}
          <NewAddressButton type="button" onClick={startNewAddress}>
            <Plus size={16} />
            Novo endereço
          </NewAddressButton>
        </SavedAddresses>
      )}

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

      {showSaveBlock && (
        <SaveBlock>
          <label className="save-toggle">
            <input type="checkbox" {...register('saveAddress')} />
            Salvar este endereço para a próxima vez
          </label>
          {saveChecked && (
            <div className="save-options">
              <label>
                Rótulo
                <select {...register('addressLabel')}>
                  {ADDRESS_LABELS.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="default-toggle">
                <input type="checkbox" {...register('makeDefault')} />
                Definir como preferencial
              </label>
            </div>
          )}
        </SaveBlock>
      )}
    </SectionContainer>
  )
}
