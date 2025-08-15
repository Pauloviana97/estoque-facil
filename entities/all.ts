// entities/all.ts
// Simulação das entidades (em produção, viriam de uma API)

export class Produto {
  static async list(sort = '') {
    // Simulando dados
    return [
      { id: 1, nome: "Parafuso 5mm", codigo: "PAR01", categoria: "insumo", ativo: true, estoque_atual: 12, estoque_minimo: 10, unidade_saida: "un", preco_custo: 0.50, preco_venda_varejo: 0.80, preco_venda_atacado: 0.60, quantidade_minima_atacado: 100 },
      { id: 2, nome: "Caixa Plástica", codigo: "CX12", categoria: "embalagem", ativo: true, estoque_atual: 5, estoque_minimo: 10, unidade_saida: "un", preco_custo: 10.00, preco_venda_varejo: 15.00, preco_venda_atacado: 12.00, quantidade_minima_atacado: 20 }
    ];
  }

  static async create(data) {
    console.log('Criar produto:', data);
  }

  static async update(id, data) {
    console.log('Atualizar produto:', id, data);
  }

  static async delete(id) {
    console.log('Excluir produto:', id);
  }
}

export class Movimentacao {
  static async list(sort = '', limit = 50) {
    const produtos = await Produto.list();
    return [
      { id: 1, produto_id: 1, tipo: "entrada", quantidade: 50, valor_total: 25, created_date: "2025-04-05T10:00:00Z", motivo: "Compra" },
      { id: 2, produto_id: 1, tipo: "saida", quantidade: 25, valor_total: 20, created_date: "2025-04-04T14:30:00Z", motivo: "Venda" }
    ];
  }
}