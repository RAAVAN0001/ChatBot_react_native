const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");

// Initialize the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function runChat() {
  const genAI = new GoogleGenerativeAI("AIzaSyAwbDRT2evHU0CH3004xgdTEM03q_0JAmU");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  console.log("Chatbot is ready! Type your message below:");

  // Function to handle user input
  const handleInput = async (prompt) => {
    try {
      const result = await model.generateContent(prompt);
      console.log(`Bot: ${result.response.text()}`);
    } catch (error) {
      console.error("Error:", error.message);
    }
    askForInput(); // Ask for the next prompt
  };

  // Function to prompt the user for input
  const askForInput = () => {
    rl.question("You: ", (prompt) => {
      if (prompt.toLowerCase() === "exit") {
        console.log("Goodbye!");
        rl.close();
        return;
      }
      handleInput(prompt);
    });
  };

  askForInput(); // Start the chat
}

runChat();
