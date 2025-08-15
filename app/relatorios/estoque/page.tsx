"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RelatorioEstoque({ produtos = [], isLoading = false }) {
  const calcularResumo = () => {
    const produtosAtivos = produtos.filter(p => p.ativo);
    const totalProdutos = produtosAtivos.length;
    const produtosBaixoEstoque = produtosAtivos.filter(p => p.estoque_atual <= (p.estoque_minimo || 0)).length;
    const valorTotalEstoque = produtosAtivos.reduce((acc, p) => acc + (p.estoque_atual * (p.preco_custo || 0)), 0);
    const valorTotalVenda = produtosAtivos.reduce((acc, p) => acc + (p.estoque_atual * (p.preco_venda_varejo || 0)), 0);
    return { totalProdutos, produtosBaixoEstoque, valorTotalEstoque, valorTotalVenda };
  };

  const resumo = calcularResumo();
  const categoriaLabels = {
    insumo: "Insumo",
    produto_acabado: "Produto Acabado",
    materia_prima: "Matéria Prima", 
    embalagem: "Embalagem"
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total de Produtos</p>
                <p className="text-2xl font-bold text-slate-900">{resumo.totalProdutos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Baixo Estoque</p>
                <p className="text-2xl font-bold text-red-600">{resumo.produtosBaixoEstoque}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Valor Custo</p>
                <p className="text-2xl font-bold text-green-600">R$ {resumo.valorTotalEstoque.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Valor Venda</p>
                <p className="text-2xl font-bold text-purple-600">R$ {resumo.valorTotalVenda.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}