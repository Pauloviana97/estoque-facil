"use client";

import React, { useState, useEffect } from "react";
import { Produto, Movimentacao } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ProdutoForm from "../components/produtos/ProdutoForm";
import ProdutoCard from "../components/produtos/ProdutoCard";
import FiltrosProdutos from "../components/produtos/FiltrosProdutos";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoEdicao, setProdutoEdicao] = useState(null);
  const [filtros, setFiltros] = useState({ categoria: "todos", busca: "", status: "ativos" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('acao') === 'novo') {
      setMostrarForm(true);
    }
  }, []);

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
        { id: 1, produto_id: 1, tipo: "entrada", quantidade: 50, created_date: "2025-04-05T10:00:00Z" },
        { id: 2, produto_id: 1, tipo: "saida", quantidade: 25, created_date: "2025-04-04T14:30:00Z" }
      ];
      setProdutos(produtosData);
      setMovimentacoes(movimentacoesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
    setIsLoading(false);
  };

  const verificarTemMovimentacao = (produtoId) => {
    return movimentacoes.some(mov => mov.produto_id === produtoId);
  };

  const handleSubmit = async (produtoData) => {
    if (produtoEdicao) {
      // Simular atualização
    } else {
      // Simular criação
    }
    setMostrarForm(false);
    setProdutoEdicao(null);
    carregarDados();
  };

  const handleEditar = (produto) => {
    setProdutoEdicao(produto);
    setMostrarForm(true);
  };

  const handleExcluir = async (produtoId) => {
    setProdutos(prev => prev.filter(p => p.id !== produtoId));
  };

  const handleToggleAtivo = async (produto, novoStatus) => {
    setProdutos(prev => prev.map(p => p.id === produto.id ? { ...p, ativo: novoStatus } : p));
  };

  const produtosFiltrados = produtos.filter(produto => {
    const matchCategoria = filtros.categoria === "todos" || produto.categoria === filtros.categoria;
    const matchBusca = !filtros.busca || 
      produto.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(filtros.busca.toLowerCase());
    let matchStatus = true;
    switch (filtros.status) {
      case "ativos": matchStatus = produto.ativo; break;
      case "inativos": matchStatus = !produto.ativo; break;
      default: matchStatus = true;
    }
    return matchCategoria && matchBusca && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Produtos</h1>
            <p className="text-slate-600 text-lg">Gerencie seu catálogo de produtos</p>
          </div>
          <Button onClick={() => setMostrarForm(!mostrarForm)}>
            <Plus className="w-5 h-5 mr-2" />
            Novo Produto
          </Button>
        </div>
        {mostrarForm && (
          <ProdutoForm
            produto={produtoEdicao}
            onSubmit={handleSubmit}
            onCancel={() => {
              setMostrarForm(false);
              setProdutoEdicao(null);
            }}
          />
        )}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nome ou código..."
              value={filtros.busca}
              onChange={(e) => setFiltros(prev => ({...prev, busca: e.target.value}))}
              className="pl-10 glass-card border-0 shadow-lg"
            />
          </div>
          <FiltrosProdutos filtros={filtros} setFiltros={setFiltros} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onEditar={handleEditar}
              onExcluir={handleExcluir}
              onToggleAtivo={handleToggleAtivo}
              temMovimentacao={verificarTemMovimentacao(produto.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}