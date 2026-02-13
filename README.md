<img alt="GC" title="#gc" src=".github/diet.png" width="250px" />

# 🥗 Diet -- Mamba Fast Tracker

Aplicativo mobile para controle de jejum intermitente e registro de
calorias.

O app permite selecionar protocolos de jejum, iniciar timers com
persistência em background, registrar refeições, acompanhar histórico e
visualizar evolução semanal através de gráficos.

---

# 🚀 Como rodar o projeto

## Pré-requisitos

- Node \>= 18
- Yarn ou npm
- React Native CLI
- Android Studio (Android)
- Xcode (iOS -- macOS)

---

## 1️⃣ Instalar dependências

```bash
yarn
```

ou

```bash
npm install
```

---

## 2️⃣ iOS (apenas macOS)

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

---

## 3️⃣ Android

```bash
npx react-native run-android
```

---

# 🧠 Stack escolhida

- React Native (sem Expo)
- TypeScript
- Zustand (gerenciamento de estado)
- AsyncStorage (persistência local)
- Styled-components
- React Navigation (Native Stack)
- react-native-gifted-charts (gráficos)

---

# 🏗 Arquitetura utilizada

Estrutura baseada em separação clara de responsabilidades:

    src/
     ├── components/
     ├── screens/
     │     ├── useContainer.ts
     │     ├── styles.ts
     │     └── index.tsx
     ├── store/
     ├── utils/
     ├── routes/
     └── styles/

### 📌 Padrões adotados

- Container Pattern (separação de lógica da UI)
- Stores isoladas por domínio (fasting, meals, protocol, auth)
- Persistência via Zustand + AsyncStorage
- Helpers e formatações isoladas em utils
- Styled-components para padronização visual

---

# ⚙️ Decisões técnicas

### 🔹 Zustand ao invés de Redux

Escolhido por simplicidade, menos boilerplate e melhor ergonomia.

### 🔹 Persistência via AsyncStorage

Leve e suficiente para o escopo do desafio.

### 🔹 Timer baseado em timestamps

O timer calcula o tempo com base em:

Date.now() - startedAt - totalPausedMs

Garantindo continuidade em background e consistência após reinício do
app.

---

# 📚 Bibliotecas utilizadas

- zustand
- @react-native-async-storage/async-storage
- styled-components
- @react-navigation/native
- @react-navigation/native-stack
- react-native-gifted-charts

---

# ⚖️ Trade-offs considerados

- Não utilização de banco SQLite (AsyncStorage atende ao escopo)
- Autenticação local simples em vez de Firebase Auth
- Notificações locais simplificadas

---

# 🚀 O que melhoraria com mais tempo

- Dark mode
- Design system completo
- Testes unitários (Jest)
- Testes E2E (Detox)
- Animações com Reanimated
- Barra de progresso visual no timer
- Internacionalização (i18n)
- Melhor tratamento de erros
- Acessibilidade aprimorada

---

# ⏱ Tempo gasto no desafio

Aproximadamente 5--6 horas distribuídas entre:

- Estruturação da arquitetura
- Implementação do timer com persistência
- Criação das stores
- Telas principais
- Refatoração para styled-components
- Documentação final

---

# 📱 Funcionalidades implementadas

- Login local com persistência de sessão
- Seleção e criação de protocolos
- Timer com pausa, retomada e encerramento
- Persistência do estado do jejum
- Registro de refeições
- Cálculo diário de calorias e meta de jejum
- Histórico de dias anteriores
- Gráfico semanal de evolução

---

# 🏁 Conclusão

O projeto foi desenvolvido com foco em organização, clareza
arquitetural, performance e escalabilidade.

Obrigado pela oportunidade 🚀
