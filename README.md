# 💻 Simulado - Noções de Informática

Repositório do simulado interativo focado no estudo de **Noções de Informática** (Profissional de Administração). A aplicação foi desenhada para testar conhecimentos em Google Workspace, Microsoft 365 (Office), Windows e Segurança.

---

## 🎯 Conteúdo Programático Abrangido

O simulado conta com **60 questões** inéditas e de concursos anteriores, divididas em três blocos estratégicos:

*   **Bloco 1: Google Workspace & Colaboração** (Drive, Meet, Documentos, Planilhas, Agenda e Gmail).
*   **Bloco 2: Microsoft 365 & Windows** (Word, Excel, PowerPoint e comandos do Windows 10/11).
*   **Bloco 3: Segurança da Informação** (Phishing, Ransomware, Backup, Firewall, Criptografia e Engenharia Social).

---

## ✨ Funcionalidades Técnicas

*   **Algoritmo de Embaralhamento Aleatório:** 
    *   A ordem das **60 questões** muda a cada tentativa.
    *   As **alternativas** também são embaralhadas internamente, garantindo que o estudante aprenda o conceito e não apenas a "letra da resposta".
*   **Correção por String (Texto):** Lógica robusta que valida a resposta comparando o conteúdo textual, eliminando erros causados pelo reordenamento das opções.
*   **Cálculo de Desempenho (Escala 0-10):** 
    *   Fórmula: $$(Acertos / 60) \times 10$$
    *   Exibição formatada com uma casa decimal (Ex: 8.5).
*   **UI/UX:**
    *   Cores institucionais (Azul Marinho e Dourado).
    *   **Rodapé Dinâmico:** Contador de questões respondidas posicionado à esquerda e botão de finalização em estilo pílula à direita.
    *   **Micro-interações:** Efeitos de *hover* (escala e cor) nos botões principais.

---

## 🛠️ Stack Tecnológica

*   **Core:** React.js 18+
*   **Build Tool:** Vite
*   **Lógica:** JavaScript ES6 (Map, Reduce, Spread Operator)
*   **Estilização:** CSS-in-JS (Inline Styles com transições dinâmicas)

---

## 📂 Estrutura de Dados

O banco de dados de questões está estruturado de forma a facilitar a manutenção e adição de novos blocos:

```javascript
// Exemplo de objeto no questions.js
{
  id: 41,
  q: "O golpe que consiste em enviar e-mails falsos para roubar senhas é o:",
  options: ["Spam.", "Phishing.", "Backup.", "Firewall."],
  answer: "Phishing."
}
```

---

## ⚙️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/EsmeraldoCarneiro/Aplicacao-web-de-simulado-para-estudo-de-Nocoes-de-Informatica.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o projeto em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🛡️ Melhores Práticas de Desenvolvimento

*   **Performance:** Uso de *Lazy State Initialization* no `useState` para garantir que o processo de embaralhamento ocorra apenas uma vez por ciclo de vida do componente.
*   **Acessibilidade:** Uso de labels semânticos para as opções de rádio, facilitando a interação via clique em toda a área da alternativa.
*   **Feedback Imediato:** Revisão detalhada após a finalização, exibindo o gabarito apenas nas questões onde houve erro, otimizando o tempo de estudo.

---

**Desenvolvido para fins educacionais e preparação para concurso.**  
*Bons estudos!* 🚀
