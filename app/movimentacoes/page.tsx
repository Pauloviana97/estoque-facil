"use client";

import React, { useState, useEffect } from "react";
import { Movimentacao, Produto } from "@/entities/all";
import { Input, Button } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MovimentacoesPage() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setIsLoading(true);
    try {
      const movData = [
        { id: 1, produto_id: 1, tipo: "entrada", quantidade: 50, valor_total: 25, created_date: "2025-04-05T10:00:00Z", motivo: "Compra" },
        { id: 2, produto_id: 1, tipo: "saida", quantidade: 25, valor_total: 20, created_date: "2025-04-04T14:30:00Z", motivo: "Venda" }
      ];
      const prodData = [
        { id: 1, nome: "Parafuso 5mm", codigo: "PAR01" }
      ];
      setMovimentacoes(movData);
      setProdutos(prodData);
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
    }
    setIsLoading(false);
  };

  const produtoMap = produtos.reduce((acc, p) => { acc[p.id] = p; return acc; }, {});

  const movimentacoesFiltradas = movimentacoes.filter(mov => {
    const produto = produtoMap[mov.produto_id];
    const matchBusca = !busca || 
      (produto?.nome?.toLowerCase().includes(busca.toLowerCase()) ||
       produto?.codigo?.toLowerCase().includes(busca.toLowerCase()));
    const matchTipo = tipo === "todos" || mov.tipo === tipo;
    return matchBusca && matchTipo;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Movimentações</h1>
          <p className="text-slate-600">Histórico de entradas e saídas de estoque</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos os tipos</option>
            <option value="entrada">Entradas</option>
            <option value="saida">Saídas</option>
          </select>
          <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-slate-700">Produto</th>
                  <th className="text-left py-3 px-6 font-semibold text-slate-700">Tipo</th>
                  <th className="text-left py-3 px-6 font-semibold text-slate-700">Quantidade</th>
                  <th className="text-left py-3 px-6 font-semibold text-slate-700">Valor Total</th>
                  <th className="text-left py-3 px-6 font-semibold text-slate-700">Motivo</th>
                  <th className="text-left py-3 px-6 font-semibold text-slate-700">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr><td colSpan={6} className="text-center py-8">Carregando...</td></tr>
                ) : movimentacoesFiltradas.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-slate-500">Nenhuma movimentação encontrada.</td></tr>
                ) : (
                  movimentacoesFiltradas.map((mov) => {
                    const produto = produtoMap[mov.produto_id];
                    return (
                      <tr key={mov.id} className="hover:bg-slate-50">
                        <td className="py-3 px-6">
                          <div>
                            <p className="font-medium text-slate-900">{produto?.nome || "Produto excluído"}</p>
                            <p className="text-sm text-slate-500">#{produto?.codigo}</p>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${mov.tipo === "entrada" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-slate-700">{mov.quantidade} {produto?.unidade_saida}</td>
                        <td className="py-3 px-6 text-slate-700">{mov.valor_total > 0 ? `R$ ${mov.valor_total.toFixed(2)}` : "-"}</td>
                        <td className="py-3 px-6 text-slate-700">{mov.motivo}</td>
                        <td className="py-3 px-6 text-slate-700">{format(new Date(mov.created_date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}