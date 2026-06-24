import * as zod from 'zod'
import { AddressFields, ADDRESS_LABELS } from '../../services/address'

export const addressValidationSchema = zod.object({
  postalCode: zod
    .string()
    .min(10, 'Informe um código postal válido')
    .max(10, 'Informe um código postal válido'),
  street: zod.string().min(1, 'Informe a rua').max(120),
  number: zod.string().min(1, 'Informe o número').max(20),
  complement: zod.string().max(80).optional(),
  neighborhood: zod.string().min(1, 'Informe o bairro').max(60),
  city: zod.string().min(1, 'Informe a cidade').max(60),
  state: zod.string().min(1, 'UF').max(20),

  // Saved-address metadata (not part of the delivery address itself).
  addressId: zod.string().optional(),
  saveAddress: zod.boolean().optional(),
  addressLabel: zod.enum(ADDRESS_LABELS).optional(),
  makeDefault: zod.boolean().optional(),
})

export type OrderFormData = zod.infer<typeof addressValidationSchema>

export function toAddressFields(data: OrderFormData): AddressFields {
  return {
    postalCode: data.postalCode,
    street: data.street,
    number: data.number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state,
  }
}
