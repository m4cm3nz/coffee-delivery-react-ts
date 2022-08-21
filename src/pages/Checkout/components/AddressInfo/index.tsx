import { MapPin } from 'phosphor-react'
import { useFormContext } from 'react-hook-form'
import { Input, SectionContainer } from './styles'

export function AddressInfo() {
  const { register } = useFormContext()

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
        <Input
          id="cep"
          type="text"
          maxLength={8}
          placeholder="CEP"
          title="cep"
          {...register('cep')}
        />
        <Input
          id="street"
          type="text"
          maxLength={120}
          placeholder="Rua"
          title="rua"
          {...register('street')}
        />
        <div>
          <Input
            id="number"
            type="text"
            maxLength={12}
            placeholder="Numero"
            title="numero"
            {...register('number')}
          />
          <Input
            id="complement"
            type="text"
            maxLength={80}
            placeholder="Complemento"
            title="complemento"
            {...register('complement')}
          />
        </div>
        <div>
          <Input
            id="neighborhood"
            type="text"
            maxLength={60}
            placeholder="Bairro"
            title="bairro"
            {...register('neighborhood')}
          />
          <Input
            id="city"
            type="text"
            maxLength={80}
            placeholder="Cidade"
            title="cidade"
            {...register('city')}
          />
          <Input
            id="state"
            type="text"
            maxLength={20}
            placeholder="UF"
            title="estado"
            {...register('state')}
          />
        </div>
      </fieldset>
    </SectionContainer>
  )
}
