import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchAddressByCep, onlyDigits } from './cep'

function mockFetch(impl: () => Partial<Response> | Promise<Partial<Response>>) {
  vi.stubGlobal('fetch', vi.fn(impl))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('onlyDigits', () => {
  it('strips non-digit characters', () => {
    expect(onlyDigits('90.000-123')).toBe('90000123')
  })
})

describe('fetchAddressByCep', () => {
  it('returns null without fetching when the CEP is incomplete', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    expect(await fetchAddressByCep('9000')).toBeNull()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('maps the ViaCEP payload to a CepAddress', async () => {
    mockFetch(() => ({
      ok: true,
      json: async () => ({
        logradouro: 'Av. Ipiranga',
        bairro: 'Praia de Belas',
        localidade: 'Porto Alegre',
        uf: 'RS',
      }),
    }))

    expect(await fetchAddressByCep('90160-093')).toEqual({
      street: 'Av. Ipiranga',
      neighborhood: 'Praia de Belas',
      city: 'Porto Alegre',
      state: 'RS',
    })
  })

  it('returns null when ViaCEP reports the CEP was not found', async () => {
    mockFetch(() => ({ ok: true, json: async () => ({ erro: true }) }))
    expect(await fetchAddressByCep('00000-000')).toBeNull()
  })

  it('throws on a failed network response', async () => {
    mockFetch(() => ({ ok: false, status: 500, json: async () => ({}) }))
    await expect(fetchAddressByCep('90160-093')).rejects.toThrow()
  })
})
