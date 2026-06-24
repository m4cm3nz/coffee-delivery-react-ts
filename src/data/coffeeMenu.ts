import {
  Arabe,
  CafeComLeite,
  Capuccino,
  ChocolateQuente,
  Cubano,
  Expresso,
  ExpressoAmericano,
  ExpressoCremoso,
  ExpressoGelado,
  Havaiano,
  Irlandes,
  Latte,
  Macchiato,
  Mochaccino,
} from '../util/coffeeImages'

export interface Coffee {
  id: string
  image: string
  tags: string[]
  name: string
  description: string
  price: number
}

export const coffeeMenu: Coffee[] = [
  {
    id: 'expresso-tradicional',
    image: Expresso,
    tags: ['tradicional'],
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    price: 9.9,
  },
  {
    id: 'expresso-americano',
    image: ExpressoAmericano,
    tags: ['tradicional'],
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    price: 9.0,
  },
  {
    id: 'expresso-cremoso',
    image: ExpressoCremoso,
    tags: ['tradicional', 'com leite'],
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    price: 10.25,
  },
  {
    id: 'expresso-gelado',
    image: ExpressoGelado,
    tags: ['tradicional', 'gelado'],
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    price: 8,
  },
  {
    id: 'cafe-com-leite',
    image: CafeComLeite,
    tags: ['tradicional', 'com leite'],
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    price: 12.3,
  },
  {
    id: 'latte',
    image: Latte,
    tags: ['tradicional', 'com leite'],
    name: 'Latte',
    description:
      'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    price: 12,
  },
  {
    id: 'capuccino',
    image: Capuccino,
    tags: ['tradicional', 'com leite'],
    name: 'Capuccino',
    description:
      'Bebida com canela feita de doses iguais de café, leite e espuma',
    price: 9.9,
  },
  {
    id: 'macchiato',
    image: Macchiato,
    tags: ['tradicional', 'com leite'],
    name: 'Macchiato',
    description:
      'Café expresso misturado com um pouco de leite quente e espuma',
    price: 12,
  },
  {
    id: 'mochaccino',
    image: Mochaccino,
    tags: ['tradicional', 'com leite'],
    name: 'Mochaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    price: 15,
  },
  {
    id: 'chocolate-quente',
    image: ChocolateQuente,
    tags: ['especial', 'com leite'],
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    price: 17,
  },
  {
    id: 'cubano',
    image: Cubano,
    tags: ['especial', 'alcoólico', 'gelado'],
    name: 'Cubano',
    description:
      'Drink gelado de café expresso com rum, creme de leite e hortelã',
    price: 20,
  },
  {
    id: 'havaiano',
    image: Havaiano,
    tags: ['especial'],
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    price: 15,
  },
  {
    id: 'arabe',
    image: Arabe,
    tags: ['especial'],
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    price: 17,
  },
  {
    id: 'irlandes',
    image: Irlandes,
    tags: ['especial', 'alcoólico'],
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    price: 19,
  },
]
