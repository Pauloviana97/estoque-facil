"use client";

import React, { useState, useEffect } from "react";
import { Produto, Movimentacao } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Simulação de componentes (substitua pelos reais)
function EstoqueCards({ produtos, movimentacoes, isLoading }) {
  const totalProdutos = produtos.length;
  const produtosBaixo = produtos.filter(p => p.estoque_atual <= (p.estoque_minimo || 0)).length;
  const valorTotal = produtos.reduce((acc, p) => acc + (p.estoque_atual * (p.preco_custo || 0)), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total de Produtos</p>
              <p className="text-2xl font-bold text-slate-900">{totalProdutos}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Baixo Estoque</p>
              <p className="text-2xl font-bold text-red-600">{produtosBaixo}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Valor Total</p>
              <p className="text-2xl font-bold text-green-600">R$ {valorTotal.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GraficoMovimentacoes({ movimentacoes, isLoading }) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Volume de Movimentações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-slate-400">
          {isLoading ? "Carregando gráfico..." : "Gráfico de barras"}
        </div>
      </CardContent>
    </Card>
  );
}

function ProdutosBaixoEstoque({ produtos, isLoading }) {
  const baixos = produtos.filter(p => p.estoque_atual <= (p.estoque_minimo || 0));
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Produtos em Baixa</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {isLoading ? (
            <li>Carregando...</li>
          ) : (
            baixos.map(p => (
              <li key={p.id} className="flex justify-between">
                <span>{p.nome}</span>
                <span className="text-red-600 font-medium">{p.estoque_atual} {p.unidade_saida}</span>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}

function UltimasMovimentacoes({ movimentacoes, produtos, isLoading }) {
  const produtoMap = produtos.reduce((acc, p) => { acc[p.id] = p; return acc; }, {});

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Últimas Movimentações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-3">Produto</th>
                <th className="pb-3">Tipo</th>
                <th className="pb-3">Quantidade</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-8">Carregando...</td></tr>
              ) : (
                movimentacoes.slice(0, 10).map(mov => {
                  const produto = produtoMap[mov.produto_id];
                  return (
                    <tr key={mov.id} className="border-b border-slate-100">
                      <td className="py-3">{produto?.nome || "Produto excluído"}</td>
                      <td>
                        <Badge 
                          variant="secondary" 
                          className={mov.tipo === "entrada" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                        </Badge>
                      </td>
                      <td>{mov.quantidade} {produto?.unidade_saida}</td>
                      <td>{format(new Date(mov.created_date), "dd/MM/yyyy", { locale: ptBR })}</td>
                      <td>{mov.motivo}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setIsLoading(true);
    try {
      const produtosData = [
        { id: 1, nome: "Parafuso 5mm", codigo: "PAR01", categoria: "insumo", ativo: true, estoque_atual: 12, estoque_minimo: 10, unidade_saida: "un", preco_custo: 0.50 },
        { id: 2, nome: "Caixa Plástica", codigo: "CX12", categoria: "embalagem", ativo: true, estoque_atual: 5, estoque_minimo: 10, unidade_saida: "un", preco_custo: 10.00 }
      ];
      const movimentacoesData = [
        { id: 1, produto_id: 1, tipo: "entrada", quantidade: 50, created_date: "2025-04-05T10:00:00Z", motivo: "Compra" },
        { id: 2, produto_id: 1, tipo: "saida", quantidade: 25, created_date: "2025-04-04T14:30:00Z", motivo: "Venda" }
      ];
      setProdutos(produtosData);
      setMovimentacoes(movimentacoesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600 text-lg">Visão geral do seu controle de estoque</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <EstoqueCards produtos={produtos} movimentacoes={movimentacoes} isLoading={isLoading} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <GraficoMovimentacoes movimentacoes={movimentacoes} isLoading={isLoading} />
          </div>
          <div>
            <ProdutosBaixoEstoque produtos={produtos} isLoading={isLoading} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <UltimasMovimentacoes movimentacoes={movimentacoes} produtos={produtos} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}