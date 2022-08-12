import { MapPin } from 'phosphor-react'
import { Input, SectionContainer } from './styles'

export function AddressInfo() {
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
        <Input type="text" required placeholder="CEP" title="cep" />
        <Input type="text" required placeholder="Rua" title="rua" />
        <div>
          <Input type="text" required placeholder="Numero" title="numero" />
          <Input type="text" placeholder="Complemento" title="complemento" />
        </div>
        <div>
          <Input type="text" required placeholder="Bairro" title="bairro" />
          <Input type="text" required placeholder="Cidade" title="cidade" />
          <Input type="text" required placeholder="UF" title="estado" />
        </div>
      </fieldset>
    </SectionContainer>
  )
}
