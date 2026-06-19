#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "prompt-reviewer",
  version: "1.0.0",
});

server.registerTool(
  "audit_prompt",
  {
    title: "Audit Prompt",
    description:
      "Aplica checks determinísticos del rubric del proyecto a un prompt: " +
      "ejemplos few-shot, tags XML, formato de salida especificado, longitud.",
    inputSchema: {
      prompt: z.string().describe("El texto del prompt a auditar"),
    },
  },
  async ({ prompt }) => {
    const results = auditPrompt(prompt);
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
    };
  }
);

function auditPrompt(prompt) {
  const checks = {};

  // 1. Ejemplos (few-shot)
  const hasExamples = /ejemplo|input:|output:|few-shot/i.test(prompt);
  checks.ejemplos_fewshot = {
    cumple: hasExamples,
    detalle: hasExamples
      ? "Se detectaron referencias a ejemplos o pares input/output."
      : "No se encontraron ejemplos concretos en el prompt.",
  };

  // 2. Tags XML
  const hasXmlTags = /<[a-z_]+>[\s\S]*<\/[a-z_]+>/i.test(prompt);
  checks.tags_xml = {
    cumple: hasXmlTags,
    detalle: hasXmlTags
      ? "El prompt usa tags XML para estructurar contenido."
      : "No se detectaron tags XML.",
  };

  // 3. Formato de salida especificado
  const hasOutputFormat =
    /formato de salida|responde en|output format|en formato|como (una tabla|json|lista)/i.test(prompt);
  checks.formato_salida = {
    cumple: hasOutputFormat,
    detalle: hasOutputFormat
      ? "El prompt especifica el formato de salida esperado."
      : "No se especifica explícitamente el formato de salida.",
  };

  // 4. Longitud (proxy crudo de claridad — la ambigüedad fina queda
  //    para la evaluación cualitativa que hace el skill, no el server)
  const wordCount = prompt.trim().split(/\s+/).length;
  const tooShort = wordCount < 8;
  checks.claridad_longitud = {
    cumple: !tooShort,
    detalle: tooShort
      ? `Prompt muy corto (${wordCount} palabras), probablemente ambiguo.`
      : `Longitud razonable (${wordCount} palabras).`,
  };

  return checks;
}

const transport = new StdioServerTransport();
await server.connect(transport);