"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";
export default function Chatbot() {
  const initialMessage = [
    {
      text: "👋 Welcome to SenseAI! I'm your career assistant. How can I support you today?",
      bot: true,
    },
  ];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessage);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // 🔥 Auto show help when chatbot opens
  useEffect(() => {
    if (open && messages.length === 1) {
      sendMessage("help");
    }
  }, [open]);

  // ================= BOT LOGIC =================
  const getBotResponse = (msg) => {
    const m = msg.toLowerCase().trim();

    // ================= GREETINGS =================
    if (["hi", "hello", "hey"].some((w) => m.includes(w))) {
      return "👋 Hello! How can I assist you today?";
    }

    if (m.includes("assalamualaikum")) {
      return "Wa Alaikum Assalam 🤝 How can I assist you today?";
    }

    // ================= HELP =================
    if (m === "Help" || m.includes("help")) {
      return {
        text: `I can help you with:

1️⃣ Industry Insights  
2️⃣ Build Resume  
3️⃣ Cover Letter  
4️⃣ Interview Preparation  
5️⃣ Career Roadmap



Please type any one of these to continue.`,
        options: [
          "Industry Insights",
          "Build Resume",
          "Cover Letter",
          "Interview Preparation",
          "Career Roadmap",
          "Sign-In",
        ],
      };
    }

    // ================= INDUSTRY INSIGHTS =================
    if (m.includes("industry")) {
      return `📊 *Industry Insights Module*

To access Industry Insights:

1. First, Sign Up or Log In.
2. Complete your onboarding form by adding:
   • Industry
   • Experience
   • Skills
   • Bio
3. Save your profile.

Once completed, you will receive:

✔ Market Outlook  
✔ Industry Growth  
✔ Demand Level  
✔ Top Skills to Learn  
✔ Salary Ranges  
✔ Key Industry Trends  
✔ Recommended Skills  

All insights are personalized based on your profile.`;
    }

    // ================= BUILD RESUME =================
    if (m.includes("resume")) {
      return `📄 *Resume Builder*

To build your resume:

1. Log in to your account.
2. Go to the Resume Builder section.
3. Fill in:
   • Contact Information  
   • Professional Summary  
   • Skills  
   • Work Experience (AI can improve descriptions)  
   • Education  
   • Projects (AI improvement available)

You can write in Markdown format.

After completion:
✔ Save your resume  
✔ Download as PDF  

Create professional resumes easily with AI assistance.`;
    }

    // ================= COVER LETTER =================
    if (m.includes("cover")) {
      return `✉ *Cover Letter Generator*

To create a cover letter:

1. Log in to your account.
2. Go to Cover Letter section.
3. Click on "+ Create New".
4. Enter:
   • Job Role
   • Job Description
5. Click Generate.

Your AI-powered cover letter will be generated instantly and ready to use.`;
    }

    // ================= INTERVIEW =================
    if (m.includes("interview")) {
      return `🎤 *Interview Preparation Module*

1. Start a quiz based on your profile.
2. After completing the quiz, you can see:

✔ Average Score  
✔ Questions Practiced  
✔ Latest Score  
✔ Performance Trends  
✔ Recent Quizzes Attempted  

Click on any quiz to review:

• Correct Answers  
• Wrong Answers  
• Detailed Explanations  

Track your progress and improve confidently.`;
    }


    if (m.includes("career roadmap")) {
  return `🗺️ *Career Roadmap Module*

1. Choose the career domain / skill roadmap you want (e.g., AI, Web Dev, Data Science).
2. Select your current level:

✔ Beginner  
✔ Intermediate  
✔ Advanced  

3. Click on *Generate Roadmap* to create your personalized plan.

After generation, you can explore:

✔ Recommended Career Path  
✔ Step-by-Step Learning Roadmap  
✔ Required Skills to Learn  
✔ Suggested Projects  
✔ Tools & Technologies  

Each step in the roadmap includes:

• Learning Resources  
• Estimated Time to Complete  
• Hands-on Tasks / Mini Projects  

Track your progress and build your career step-by-step with clarity 🚀`;
}
if (m.includes("career roadmap")) {
  return `🗺️ *Career Roadmap Module*

1. Fill in your profile details (skills, interests, goals).
2. Based on your input, the system generates a personalized roadmap.

After generation, you can explore:

✔ Recommended Career Path  
✔ Required Skills to Learn  
✔ Step-by-Step Learning Plan  
✔ Suggested Projects  
✔ Tools & Technologies to Focus On  

Each step in the roadmap includes:

• Learning Resources  
• Estimated Time to Complete  
• Practical Tasks / Mini Projects  

Track your journey and build your career step-by-step with clarity 🚀`;
}
    // ================= PROFILE CHANGE =================
    if (m.includes("change profile") || m.includes("edit profile")) {
      return `🔄 *How to Change Your Profile*

1. Go to Industry Insights.
2. Click on "Edit Profile" or "Change Industry".
3. Update your details.
4. Save changes.

New Industry Insights will be generated based on your updated profile.`;
    }

    // ================= SIGN IN HELP =================
    if (
      m.includes("sign in") ||
      m.includes("signin") ||
      m.includes("sign-in") || // ✅ ADD THIS
      m.includes("log in") ||
      m.includes("login")
    ) {
      return `🔐 *How to Sign In*

1. Click on the "Sign In" button.
2. You can sign in using:
   • Google Account  
   • Email Address  

If you don't have an account, click on "Sign Up" to create one.

Your authentication is securely managed by Clerk.`;
    }

    // ================= OKAY RESPONSE =================
    if (
      m === "ok" ||
      m === "okay" ||
      m.includes("ok ") ||
      m.includes("okay") ||
      m.includes("alright")
    ) {
      return "👍 Great! Is there anything else I can help you with?";
    }

    // ================= THANK YOU =================
    if (m.includes("thank")) {
      return "You're most welcome 😊 I'm glad I could assist you. Let me know if you need anything else!";
    }
    // ================= HOW ARE  YOU =================
    if (m.includes("how are you") || m.includes("how r u")) {
      return "I'm doing great! Thanks for asking. How can I assist you today?";
    }
    // ================= KHAIRIYAT =================
    if (
      m.includes("khairiyaat") ||
      m.includes("khaairiyat") ||
      m.includes("khairiyat")
    ) {
      return "Alhamdulillah 😊 I'm glad I could assist you. Let me know if you need anything else!";
    }

    // ================= GOODBYE =================
    if (m.includes("bye")) {
      return "👋 Goodbye! Wishing you success in your career journey 🚀";
    }

    // ================= DEFAULT =================
    return "I'm here to assist you with Industry Insights, Resume Building, Cover Letters, and Interview Preparation. Type 'help' to explore available options 😊";
  };

  // ================= SEND MESSAGE =================
  const sendMessage = (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg = { text: textToSend, bot: false };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      const response = getBotResponse(textToSend);

      if (typeof response === "string") {
        setMessages((m) => [...m, { text: response, bot: true }]);
      } else {
        setMessages((m) => [
          ...m,
          { text: response.text, bot: true, options: response.options },
        ]);
      }
    }, 800);
  };

  return (
    <>
      <button
        className={styles.toggle}
        onClick={() => {
          if (open) {
            // When closing → reset chat
            setMessages(initialMessage);
          }
          setOpen(!open);
        }}
      >
        🤖
      </button>

      {open && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h5>SenseAI Assistant</h5>
            <button
              onClick={() => {
                setMessages(initialMessage); // reset chat
                setOpen(false); // close chat
              }}
            >
              ✖
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  m.bot ? styles.botMessage : styles.userMessage
                }`}
              >
                <div>{m.text}</div>

                {m.options && (
                  <div className={styles.options}>
                    {m.options.map((opt, index) => (
                      <button
                        key={index}
                        className={styles.optionButton}
                        onClick={() => sendMessage(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                Assistant is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputBox}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your query...."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
