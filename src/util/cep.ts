export interface CepAddress {
  street: string
  neighborhood: string
  city: string
  state: string
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Looks up a Brazilian address by postal code via ViaCEP.
 * Returns `null` when the CEP is malformed or not found; throws on network
 * failure so the caller can distinguish "not found" from "request failed".
 */
export async function fetchAddressByCep(
  cep: string,
): Promise<CepAddress | null> {
  const digits = onlyDigits(cep)
  if (digits.length !== 8) return null

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
  if (!response.ok) {
    throw new Error(`ViaCEP request failed with status ${response.status}`)
  }

  const data = await response.json()
  if (data.erro) return null

  return {
    street: data.logradouro ?? '',
    neighborhood: data.bairro ?? '',
    city: data.localidade ?? '',
    state: data.uf ?? '',
  }
}
