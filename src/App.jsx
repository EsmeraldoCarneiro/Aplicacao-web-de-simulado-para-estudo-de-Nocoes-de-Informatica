import { useState } from "react";
// Importamos o banco de dados das 70 questões
import { questionsData } from "./data/questions";

/**
 * FUNÇÃO DE EMBARALHAMENTO (Fisher-Yates modificado)
 * Esta função embaralha a ordem das questões e, para cada questão,
 * também embaralha a ordem das suas alternativas.
 */
const shuffleAll = (array) => {
  // 1. Cria uma cópia e embaralha a ordem das questões
  let newArray = [...array].sort(() => Math.random() - 0.5);

  // 2. Embaralha as alternativas internamente em cada objeto de questão
  newArray = newArray.map((question) => ({
    ...question,
    options: [...question.options].sort(() => Math.random() - 0.5),
  }));

  return newArray;
};

export default function App() {
  /**
   * ESTADOS (STATES)
   * questions: Armazena a lista misturada. Usamos um inicializador de função
   * para o embaralhamento ocorrer apenas no carregamento inicial.
   */
  const [questions, setQuestions] = useState(() => shuffleAll(questionsData));
  const [answers, setAnswers] = useState({}); // { id: "Texto da opção" }
  const [submitted, setSubmitted] = useState(false); // Alterna entre prova e resultado

  // Estilo base para os botões arredondados (estilo pílula)
  const pillButtonStyle = {
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,51,102,0.2)",
    transition: "all 0.2s ease",
    outline: "none",
  };

  /**
   * FUNÇÕES DE AÇÃO
   */
  const handleSelect = (questionId, optionText) => {
    setAnswers({ ...answers, [questionId]: optionText });
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted(false);
    setQuestions(shuffleAll(questionsData)); // Novo embaralhamento ao reiniciar
    window.scrollTo(0, 0);
  };

  // Calcula a nota de 0 a 10 com base nos acertos
  const calculateScore = () => {
    const correctCount = questions.reduce((acc, curr) => {
      // Comparação direta de texto (independente de letras A, B, C...)
      return acc + (answers[curr.id] === curr.answer ? 1 : 0);
    }, 0);
    return correctCount;
  };

  const score = calculateScore();
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        padding: "20px",
        paddingBottom: "120px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        {/* CABEÇALHO UNICAMP - Design Elegante e Sem Sobreposição */}
        <header
          style={{
            backgroundColor: "#003366",
            borderRadius: "15px",
            padding: "40px 20px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            marginBottom: "40px",
            borderBottom: "6px solid #ffc107",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h1
            style={{
              color: "#fff",
              margin: "0",
              fontSize: "2.4rem",
              lineHeight: "1.2",
              textTransform: "uppercase",
              fontWeight: "800",
            }}
          >
            Simulado <br />{" "}
            <span style={{ fontSize: "1.6rem", fontWeight: "400" }}>
              Noções de Informática
            </span>
          </h1>
          <h2 style={{ color: "#ffc107", margin: "0", fontSize: "1.6rem" }}>
            UNICAMP
          </h2>
          <p style={{ color: "#cbd5e0", margin: "0", fontStyle: "italic" }}>
            Profissional de Administração
          </p>
        </header>

        {!submitted ? (
          <main>
            {/* RENDERIZAÇÃO DAS QUESTÕES MISTURADAS */}
            {questions.map((item, index) => (
              <section
                key={item.id}
                style={{
                  marginBottom: "25px",
                  padding: "25px",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  borderLeft: `8px solid ${answers[item.id] ? "#003366" : "#cbd5e0"}`,
                  transition: "0.3s",
                }}
              >
                <p
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: "700",
                    color: "#1a202c",
                    marginBottom: "20px",
                  }}
                >
                  {index + 1}. {item.q}
                </p>
                {item.options.map((opt) => {
                  const isSelected = answers[item.id] === opt;
                  return (
                    <label
                      key={opt}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "14px",
                        margin: "10px 0",
                        borderRadius: "10px",
                        cursor: "pointer",
                        border: "2px solid #003366",
                        backgroundColor: isSelected ? "#003366" : "#ffffff",
                        color: isSelected ? "#ffffff" : "#003366",
                        transition: "0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name={`q-${item.id}`}
                        checked={isSelected}
                        onChange={() => handleSelect(item.id, opt)}
                        style={{ marginRight: "15px", accentColor: "#ffc107" }}
                      />
                      <span style={{ fontWeight: "500" }}>{opt}</span>
                    </label>
                  );
                })}
              </section>
            ))}

            {/* RODAPÉ FIXO (IDÊNTICO À IMAGEM) COM EFEITO HOVER */}
            <footer
              style={{
                position: "fixed",
                bottom: "0",
                left: "0",
                right: "0",
                backgroundColor: "#fff",
                padding: "15px 30px",
                zIndex: "1000",
                boxShadow: "0 -5px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  maxWidth: "850px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "#4a5568",
                  }}
                >
                  Respondidas: {answeredCount} / {totalQuestions}
                </span>

                <button
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#004a8d";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#003366";
                    e.target.style.transform = "scale(1)";
                  }}
                  onClick={() => {
                    if (confirm("Deseja finalizar o simulado agora?")) {
                      window.scrollTo(0, 0);
                      setSubmitted(true);
                    }
                  }}
                  style={{
                    ...pillButtonStyle,
                    padding: "12px 35px",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                  }}
                >
                  Finalizar Simulado
                </button>
              </div>
            </footer>
          </main>
        ) : (
          /* TELA DE RESULTADOS (SEM SOBREPOSIÇÃO) */
          <aside style={{ paddingBottom: "50px" }}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "50px 40px",
                borderRadius: "20px",
                border: "2px solid #003366",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                textAlign: "center",
                marginBottom: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "25px",
              }}
            >
              <h2
                style={{
                  color: "#003366",
                  fontSize: "2.5rem",
                  margin: "0",
                  textTransform: "uppercase",
                }}
              >
                Resultado
              </h2>

              {/* Nota Calculada de 0 a 10 */}
              <div
                style={{
                  fontSize: "6rem",
                  fontWeight: "800",
                  color: "#003366",
                  lineHeight: "1",
                }}
              >
                {((score / totalQuestions) * 10).toFixed(1)}
              </div>

              <p style={{ fontSize: "1.4rem", color: "#4a5568", margin: "0" }}>
                Você acertou <strong>{score}</strong> de{" "}
                <strong>{totalQuestions}</strong> questões.
              </p>

              <button
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#004a8d";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#003366";
                  e.target.style.transform = "scale(1)";
                }}
                onClick={handleRestart}
                style={{
                  ...pillButtonStyle,
                  padding: "15px 40px",
                  borderRadius: "30px",
                  fontSize: "1.2rem",
                }}
              >
                Tentar Novamente
              </button>
            </div>

            {/* REVISÃO DE ERROS E ACERTOS */}
            <h3 style={{ color: "#003366", marginBottom: "20px" }}>
              Revisão de Desempenho:
            </h3>
            {questions.map((item) => {
              const isCorrect = answers[item.id] === item.answer;
              return (
                <div
                  key={item.id}
                  style={{
                    padding: "20px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    borderLeft: `10px solid ${isCorrect ? "#48bb78" : "#f56565"}`,
                  }}
                >
                  <p style={{ fontWeight: "bold", margin: "0" }}>{item.q}</p>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: isCorrect ? "#2f855a" : "#c53030",
                      fontWeight: "bold",
                    }}
                  >
                    <>
                      <p>{isCorrect ? "✓ Você acertou!" : "✗ Você errou!"}</p>
                      <p style={{ color: "#003366" }}>
                        <strong>R:</strong> {item.answer}
                      </p>
                    </>
                  </p>
                </div>
              );
            })}
          </aside>
        )}
      </div>
    </div>
  );
}
