import React, { useReducer, useMemo, useEffect, useState } from "react";
import {   
  Trophy, Clock, Zap, CheckCircle, XCircle, ChevronRight, 
  BrainCircuit, Activity, Loader2, Server, Save, GraduationCap, 
  BookOpen, FlaskConical, Calculator, Languages, ArrowLeft, 
  LayoutGrid, List, Settings, Database, Plus, FileText, Shield, User, Instagram, AlertCircle, HelpCircle 
} from "lucide-react";

// ==========================================
// MODULE: SEO & METADATA (NEXT.JS SIMULATION)
// ==========================================

export const metadata = {
  title: "Class 1 to 12 Online MCQ Test | Free NCERT Quiz",
  description: "AI-based MCQ test for Class 1–12. Chapter-wise, timer quiz, instant result with detailed explanations.",
};

// ==========================================
// MODULE: DATA/SYLLABUS (FULL 1-12 COVERAGE)
// ==========================================

// Helper to generate generic syllabus for missing classes
const GENERIC_SYLLABUS = {
  Maths: ["General Math", "Algebra", "Geometry"],
  Science: ["General Science", "Environment", "Physics Basics"],
  English: ["Grammar", "Vocabulary", "Comprehension"],
  "Social Science": ["History", "Civics", "Geography"]
};

export const SYLLABUS: Record<number, Record<string, string[]>> = {
  1: {
    Maths: ["Numbers", "Addition", "Subtraction"],
    English: ["Alphabet", "Words"],
    EVS: ["My Family", "Plants"]
  },
  9: {
    Maths: ["Number Systems", "Polynomials", "Lines & Angles"],
    Science: ["Matter in Our Surroundings", "Force and Laws"],
    English: ["Beehive Ch 1", "Beehive Ch 2"],
    "Social Science": ["French Revolution", "India - Size and Location"]
  },
  10: {
    Maths: ["Real Numbers", "Polynomials", "Trigonometry"],
    Science: ["Chemical Reactions", "Acids Bases Salts", "Life Processes"],
    English: ["A Letter to God", "Nelson Mandela"],
    "Social Science": ["Nationalism in Europe", "Resources"]
  },
  12: {
    Maths: ["Relations", "Calculus", "Vectors"],
    Physics: ["Electrostatics", "Magnetism", "Optics"],
    Chemistry: ["Solid State", "Electrochemistry", "Solutions"]
  }
};

// Fill gaps for 2-8 and 11
for (let i = 1; i <= 12; i++) {
  if (!SYLLABUS[i]) {
    SYLLABUS[i] = GENERIC_SYLLABUS;
  }
}

// ==========================================
// MODULE: CORE/DIFFICULTY & TIMER
// ==========================================

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_TIME = {
  easy: 30,
  medium: 45,
  hard: 60
};

// ==========================================
// MODULE: CORE/AI GENERATOR (ADSENSE OPTIMIZED)
// ==========================================

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export type Question = {
  id: string;
  class: number;
  subject: string;
  chapter: string;
  question: string;
  options: string[];
  correct: number; 
  difficulty: Difficulty;
  explanation: string; // REQUIRED FOR ADSENSE VALUE
};

export function generateMathMCQ(
  classNo: number,
  chapter: string, 
  level: Difficulty
): Question {
  let a: number, b: number;
  let questionText = "";
  let answer = 0;
  let explanationText = "";

  // Difficulty Logic
  if (level === "easy") {
    a = rand(1, 10); 
    b = rand(1, 10);
  } else if (level === "medium") {
    a = rand(10, 50); 
    b = rand(10, 50);
  } else {
    a = rand(50, 100); 
    b = rand(20, 80);
  }

  // Chapter Logic
  if (chapter.includes("Subtraction")) {
      answer = a - b;
      questionText = `Find the value of ${a} - ${b}`;
      explanationText = `Subtracting ${b} from ${a} gives ${answer}. (Concept: Basic Arithmetic)`;
  } else if (chapter.includes("Multiplication") || chapter.includes("Calculus")) {
      answer = a * b;
      questionText = `Calculate product: ${a} × ${b}`;
      explanationText = `Multiplying ${a} by ${b} results in ${answer}.`;
  } else {
      answer = a + b;
      questionText = `Find the value of ${a} + ${b}`;
      explanationText = `Adding ${a} and ${b} together results in a sum of ${answer}.`;
  }

  const options = shuffle([
    answer,
    answer + rand(1, 5),
    answer - rand(1, 5),
    answer + rand(6, 10),
  ]);

  return {
    id: crypto.randomUUID(),
    class: classNo,
    subject: "Maths",
    chapter,
    question: questionText,
    options: options.map(String),
    correct: options.indexOf(answer),
    difficulty: level,
    explanation: explanationText
  };
}

export function generateGenericMCQ(classNo: number, subject: string, chapter: string, level: Difficulty): Question {
   const concepts = [
      { q: "What is the primary function of", a: "Regulation", exp: "Regulation ensures stability within the system." },
      { q: "Which of these is a key component of", a: "Core Structure", exp: "The Core Structure provides the necessary support." },
      { q: "Identify the correct characteristic of", a: "Variability", exp: "Variability allows for adaptation in changing environments." }
   ];
   const template = concepts[rand(0, 2)];
   
   return {
     id: crypto.randomUUID(),
     class: classNo,
     subject,
     chapter,
     question: `[${subject}] ${template.q} ${chapter}?`,
     options: ["Unknown Factor", template.a, "External Force", "Null Value"],
     correct: 1,
     difficulty: level,
     explanation: `Correct Answer: ${template.a}. Reason: ${template.exp}`
   };
}

// ==========================================
// MODULE: LIB/FIREBASE (SIMULATED)
// ==========================================

export const dbService = {
  saveScore: async (data: any) => {
    console.log("[FIREBASE] Saving Score:", data);
    return new Promise((resolve) => setTimeout(resolve, 800));
  }
};

// ==========================================
// MODULE: CORE/ROUTER & STATE
// ==========================================

const api = {
  fetchQuestions: async (classLevel: number, subject: string, topic: string): Promise<Question[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const questions: Question[] = [];
        const levels: Difficulty[] = ["easy", "easy", "medium", "medium", "hard"];
        
        for (const level of levels) {
           if (subject === "Maths") {
               questions.push(generateMathMCQ(classLevel, topic, level));
           } else {
               questions.push(generateGenericMCQ(classLevel, subject, topic, level));
           }
        }
        resolve(questions);
      }, 600);
    });
  }
};

type QuizStatus = 'idle' | 'privacy_policy' | 'about_us' | 'selecting_subject' | 'selecting_topic' | 'loading_questions' | 'active' | 'submitting_result' | 'finished' | 'error';

type State = {
  status: QuizStatus;
  selectedClass: number | null;
  selectedSubject: string | null;
  selectedTopic: string | null;
  questions: Question[];
  index: number;
  answers: Record<number, number>;
  timeLeft: number; 
  score: number;
  serverResult: any | null;
  showExplanation: boolean; // NEW: Controls flow
};

type Action =
  | { type: "NAVIGATE_PAGE"; page: QuizStatus }
  | { type: "SELECT_CLASS"; classLevel: number }
  | { type: "SELECT_SUBJECT"; subject: string }
  | { type: "SELECT_TOPIC"; topic: string }
  | { type: "LOAD_QUESTIONS"; payload: Question[] }
  | { type: "TICK" }
  | { type: "ANSWER"; index: number }
  | { type: "NEXT" }
  | { type: "TIME_UP" }
  | { type: "SUBMIT_SUCCESS"; payload: any }
  | { type: "GO_BACK" }
  | { type: "RESET" };

const initialState: State = {
  status: 'idle',
  selectedClass: null,
  selectedSubject: null,
  selectedTopic: null,
  questions: [],
  index: 0,
  answers: {},
  timeLeft: 0,
  score: 0,
  serverResult: null,
  showExplanation: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NAVIGATE_PAGE":
      return { ...state, status: action.page };
      
    case "SELECT_CLASS":
      return { ...state, status: 'selecting_subject', selectedClass: action.classLevel };

    case "SELECT_SUBJECT":
      return { ...state, status: 'selecting_topic', selectedSubject: action.subject };

    case "SELECT_TOPIC":
      return { ...state, status: 'loading_questions', selectedTopic: action.topic };
    
    case "LOAD_QUESTIONS":
      const firstQ = action.payload[0];
      return {
        ...state,
        status: 'active',
        questions: action.payload,
        index: 0,
        timeLeft: DIFFICULTY_TIME[firstQ.difficulty],
        showExplanation: false
      };

    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "ANSWER":
      const currentQ = state.questions[state.index];
      const isCorrect = action.index === currentQ.correct;
      return {
        ...state,
        answers: { ...state.answers, [state.index]: action.index },
        score: isCorrect ? state.score + 1 : state.score,
        showExplanation: true // PAUSE FOR EXPLANATION
      };

    case "NEXT":
      const nextIndex = state.index + 1;
      if (nextIndex >= state.questions.length) {
         return { ...state, status: 'submitting_result' };
      }
      const nextQ = state.questions[nextIndex];
      return { 
        ...state, 
        index: nextIndex,
        timeLeft: DIFFICULTY_TIME[nextQ.difficulty],
        showExplanation: false
      };

    case "TIME_UP":
      return { ...state, showExplanation: true }; // Show explanation even if time up

    case "SUBMIT_SUCCESS":
      return { ...state, status: 'finished', serverResult: action.payload };

    case "GO_BACK":
        if (['privacy_policy', 'about_us'].includes(state.status)) return { ...state, status: 'idle' };
        if (state.status === 'selecting_topic') return { ...state, status: 'selecting_subject', selectedSubject: null };
        if (state.status === 'selecting_subject') return { ...state, status: 'idle', selectedClass: null };
        return state;

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

// ==========================================
// MODULE: AD UNITS (ADSENSE)
// ==========================================

function AdUnit() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense failed to load (expected in preview environment)");
    }
  }, []);

  return (
    <div className="w-full my-6 bg-slate-900/50 border border-slate-800 border-dashed rounded-lg overflow-hidden flex flex-col items-center justify-center min-h-[100px]">
      <span className="text-[10px] font-mono uppercase tracking-widest mb-1 text-slate-600">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXX"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {/* Visual Fallback for Preview Only */}
      <div className="text-slate-700 text-xs">Google AdSense Space</div>
    </div>
  );
}

// ==========================================
// MODULE: VIEW COMPONENTS
// ==========================================

function Footer({ onNav }: { onNav: (page: QuizStatus) => void }) {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 p-8 mt-auto">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-400">
        <div>
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" /> NextGen AI Quiz
          </h3>
          <p className="mb-4">Free AI-based MCQ tests for Class 1–12. NCERT aligned content for student success.</p>
          
          <div className="mt-6">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Follow Us</span>
             <a 
               href="https://instagram.com/unown.649" 
               target="_blank"
               rel="noopener noreferrer" 
               className="inline-flex items-center gap-3 p-2 pr-4 bg-slate-800/50 border border-slate-700 rounded-full hover:border-pink-500/50 hover:bg-slate-800 transition-all group"
             >
                <div className="p-2 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-full text-white group-hover:scale-110 transition-transform">
                   <Instagram className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors">@unown.649</span>
             </a>
          </div>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><button onClick={() => onNav('idle')} className="hover:text-indigo-400">Home</button></li>
            <li><button onClick={() => onNav('about_us')} className="hover:text-indigo-400">About Us</button></li>
            <li><button onClick={() => window.alert("Contact: rajputmohit2378@gmail.com")} className="hover:text-indigo-400">Contact</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><button onClick={() => onNav('privacy_policy')} className="hover:text-indigo-400">Privacy Policy</button></li>
            <li><button onClick={() => onNav('privacy_policy')} className="hover:text-indigo-400">Terms & Conditions</button></li>
            <li><button onClick={() => onNav('privacy_policy')} className="hover:text-indigo-400">Disclaimer</button></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 pt-8 border-t border-slate-800 text-xs">
        © 2024 NextGen AI Quiz Platform. All Rights Reserved.
      </div>
    </footer>
  );
}

function StaticPageView({ title, content, onBack }: { title: string, content: React.ReactNode, onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <div className="p-6 max-w-4xl mx-auto w-full flex-grow animate-fade-in">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4"/> Back
        </button>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-black mb-6 text-indigo-400">{title}</h1>
          <div className="prose prose-invert max-w-none text-slate-300">
            {content}
          </div>
        </div>
      </div>
      <Footer onNav={() => {}} />
    </div>
  )
}

function PrivacyPolicy() {
  return (
    <div className="space-y-6 text-slate-300">
      <p>At <strong>NextGen AI Quiz Platform</strong>, we respect your privacy.</p>
      
      <p>We do not collect any personal information unless you voluntarily provide it (such as name or email for contact or result saving purposes).</p>
      
      <div>
        <h3 className="text-white font-bold text-lg mb-2">Google AdSense:</h3>
        <p>We use Google AdSense to display advertisements. Google may use cookies, including the DoubleClick cookie, to show ads to users based on their visits to this and other websites.</p>
        <p className="mt-2">Users may opt out of personalized advertising by visiting Google Ads Settings.</p>
      </div>

      <div>
        <h3 className="text-white font-bold text-lg mb-2">Cookies:</h3>
        <p>Our website may use cookies to improve user experience and analyze traffic. You can disable cookies through your browser settings.</p>
      </div>

      <div>
        <h3 className="text-white font-bold text-lg mb-2">Third-party Links:</h3>
        <p>Our website may contain links to third-party websites. We are not responsible for their content or privacy policies.</p>
      </div>

      <p>By using our website, you consent to this Privacy Policy.</p>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        If you have any questions, please contact us at: <br/>
        <span className="text-indigo-400 font-bold">📧 rajputmohit2378@gmail.com</span>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div className="space-y-6 text-slate-300">
      <p className="text-lg text-white">Welcome to <strong>NextGen AI Quiz Platform</strong>.</p>
      <p>We provide free, high-quality, AI-powered MCQ tests and quizzes for students from <strong>Class 1 to Class 12</strong>, based on the latest NCERT syllabus.</p>
      
      <p>Our platform is designed to help students practice chapter-wise questions with instant results, explanations, and difficulty levels such as Easy, Medium, and Hard. Each quiz is created to improve understanding, accuracy, and exam confidence.</p>
      
      <p>Our mission is to make learning simple, accessible, and effective for every student through technology-driven education.</p>
      
      <div className="p-4 border-l-4 border-yellow-500 bg-yellow-900/10 text-yellow-200">
        All questions are created for educational practice purposes only and are not intended to replace school textbooks or teachers.
      </div>
      
      <p>Thank you for learning with us.</p>
    </div>
  );
}

function Timer({ seconds, total }: { seconds: number; total: number }) {
   const percent = (seconds / total) * 100;
   const color = seconds < 10 ? 'bg-red-500' : 'bg-indigo-500';
   
   return (
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-6">
         <div 
            className={`h-full transition-all duration-1000 ease-linear ${color}`} 
            style={{ width: `${percent}%` }}
         />
      </div>
   )
}

function QuizView({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const q = state.questions[state.index];
  const maxTime = DIFFICULTY_TIME[q.difficulty];

  useEffect(() => {
     if (state.timeLeft <= 0 && !state.showExplanation) {
        dispatch({ type: "TIME_UP" });
        return;
     }
     if (!state.showExplanation) {
       const timer = setInterval(() => dispatch({ type: "TICK" }), 1000);
       return () => clearInterval(timer);
     }
  }, [state.timeLeft, state.showExplanation]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center">
      {/* HEADER for SEO */}
      <header className="w-full bg-slate-900 border-b border-slate-800 p-4">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-xl md:text-2xl font-black text-white">
               Class {state.selectedClass} {state.selectedSubject} MCQ – {state.selectedTopic}
            </h1>
         </div>
      </header>

      <div className="w-full max-w-3xl flex-grow p-6 text-white">
        
        {/* SEO INTRO */}
        <p className="text-slate-400 mb-6 text-sm md:text-base">
           Practice free online MCQs for Class {state.selectedClass} {state.selectedSubject} Chapter "{state.selectedTopic}". 
           These objective questions are based on the latest NCERT syllabus and are designed to help students improve their concepts, 
           speed, and accuracy. Start the test below to check your knowledge.
        </p>

        {/* AD PLACEMENT: TOP */}
        <AdUnit />

        {/* Question Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-6 shadow-2xl relative overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
           
           <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
              <div>
                 <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Question {state.index + 1} of {state.questions.length}</h2>
                 <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold text-white ${q.difficulty === 'hard' ? 'bg-red-600' : q.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-green-600'}`}>
                    {q.difficulty} Level
                 </span>
              </div>
              <div className="flex items-center gap-2 text-indigo-400 bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-500/20">
                 <Clock className="w-4 h-4" />
                 <span className="font-mono font-bold">{state.timeLeft}s</span>
              </div>
           </div>

           <Timer seconds={state.timeLeft} total={maxTime} />
           
           <p className="text-xl md:text-2xl font-bold leading-relaxed mb-2">{q.question}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mb-6">
           {q.options.map((opt, i) => {
              const isSelected = state.answers[state.index] === i;
              const isCorrect = q.correct === i;
              const showResult = state.showExplanation;
              
              let style = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
              
              if (showResult) {
                 if (isCorrect) style = "bg-green-900/20 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                 else if (isSelected && !isCorrect) style = "bg-red-900/20 border-red-500 text-white";
                 else style = "bg-slate-900 border-slate-800 opacity-50";
              } else if (isSelected) {
                 style = "bg-indigo-600 border-indigo-500 text-white shadow-lg";
              }

              return (
                <button
                   key={i}
                   disabled={showResult}
                   onClick={() => dispatch({ type: "ANSWER", index: i })}
                   className={`p-4 text-left border rounded-xl transition-all font-medium ${style} flex justify-between items-center group relative overflow-hidden`}
                >
                   <span className="z-10 flex items-center gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-400 text-sm font-bold group-hover:bg-slate-700 transition-colors">
                         {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                   </span>
                   {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-green-400 z-10" />}
                   {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400 z-10" />}
                </button>
              );
           })}
        </div>

        {/* EXPLANATION BOX (ADSENSE VALUE) */}
        {state.showExplanation && (
           <div className="animate-fade-in-up mb-6">
              <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-xl p-6 mb-6">
                 <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Detailed Explanation
                 </h3>
                 <p className="text-slate-200 leading-relaxed">{q.explanation}</p>
              </div>
              <button 
                 onClick={() => dispatch({ type: "NEXT" })}
                 className="w-full py-4 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
              >
                 Next Question <ChevronRight className="w-5 h-5" />
              </button>
           </div>
        )}

        {/* AD PLACEMENT: BOTTOM */}
        <AdUnit />

        {/* SEO FAQs */}
        <div className="mt-12 pt-12 border-t border-slate-800">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" /> Frequently Asked Questions
           </h3>
           <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                 <h4 className="font-bold text-slate-200 mb-2">Q: Is this quiz for Class {state.selectedClass} free?</h4>
                 <p className="text-sm text-slate-400">Yes, all MCQ tests for Class {state.selectedClass} {state.selectedSubject} are completely free and aligned with the NCERT syllabus.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                 <h4 className="font-bold text-slate-200 mb-2">Q: How many questions are in this test?</h4>
                 <p className="text-sm text-slate-400">This chapter test contains 5-10 important multiple-choice questions with answers and explanations.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                 <h4 className="font-bold text-slate-200 mb-2">Q: Can I download the questions as PDF?</h4>
                 <p className="text-sm text-slate-400">Yes, join our Telegram channel (link in footer) to get free PDFs for all chapters.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Global Script Simulation (AdSense)
  useEffect(() => {
    // This is where you would normally see <Script src="..." /> in Next.js layout
    // We are simulating the side-effect here.
    console.log("Simulating AdSense Script Injection...");
  }, []);

  // SEO METADATA SIMULATION
  useEffect(() => {
     document.title = state.selectedSubject 
        ? `Class ${state.selectedClass} ${state.selectedSubject} MCQ – ${state.selectedTopic ? state.selectedTopic : 'Free Test'}` 
        : "NextGen AI Quiz - Class 1 to 12 MCQ";
  }, [state.selectedClass, state.selectedSubject, state.selectedTopic]);

  // AUTO SUBMIT
  useEffect(() => {
    if (state.status === 'submitting_result' && !state.serverResult) {
       (async () => {
          await dbService.saveScore({ 
             score: state.score, 
             total: state.questions.length
          });
          dispatch({ 
             type: "SUBMIT_SUCCESS", 
             payload: { rank: "Titan", percentile: 99 } 
          });
       })();
    }
  }, [state.status]);

  const selectTopic = async (topic: string) => {
     dispatch({ type: "SELECT_TOPIC", topic });
     const questions = await api.fetchQuestions(state.selectedClass!, state.selectedSubject!, topic);
     dispatch({ type: "LOAD_QUESTIONS", payload: questions });
  };

  // ROUTING
  if (state.status === 'privacy_policy') return <StaticPageView title="Privacy Policy" content={<PrivacyPolicy />} onBack={() => dispatch({type: 'GO_BACK'})} />;
  if (state.status === 'about_us') return <StaticPageView title="About Us" content={<AboutUs />} onBack={() => dispatch({type: 'GO_BACK'})} />;

  if (state.status === 'idle') {
     const classes = Array.from({ length: 12 }, (_, i) => i + 1);

     return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
           {/* HEADER */}
           <div className="p-6 flex items-center justify-center border-b border-slate-800 bg-slate-900/50">
               <GraduationCap className="w-8 h-8 text-indigo-500 mr-3" />
               <h1 className="text-xl font-bold text-white tracking-tight">NextGen AI Quiz</h1>
           </div>

           <div className="flex-grow flex flex-col items-center justify-center p-6 text-white">
              <div className="text-center max-w-2xl mb-10">
                 <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    NCERT MCQ TEST
                 </h2>
                 <p className="text-slate-400 text-lg">Select your class to start practicing.</p>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full max-w-4xl">
                 {classes.map(cls => (
                    <button 
                       key={cls}
                       onClick={() => dispatch({type: 'SELECT_CLASS', classLevel: cls})}
                       className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500 hover:bg-indigo-900/20 transition-all flex flex-col items-center justify-center gap-1 group shadow-lg"
                    >
                       <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Class</span>
                       <span className="text-3xl font-black text-white group-hover:text-indigo-400">{cls}</span>
                    </button>
                 ))}
              </div>

              <AdUnit />
           </div>

           <Footer onNav={(page) => dispatch({type: 'NAVIGATE_PAGE', page})} />
        </div>
     );
  }

  if (state.status === 'selecting_subject') {
     const subjects = SYLLABUS[state.selectedClass!] ? Object.keys(SYLLABUS[state.selectedClass!]) : [];
     return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
           <div className="flex-grow flex items-center justify-center p-6 text-white">
              <div className="w-full max-w-2xl">
                 <button onClick={() => dispatch({type: 'GO_BACK'})} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white"><ArrowLeft className="w-4 h-4"/> Change Class</button>
                 <h2 className="text-3xl font-bold mb-8">Class {state.selectedClass} Subjects</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subjects.map(sub => (
                       <button 
                          key={sub}
                          onClick={() => dispatch({type: 'SELECT_SUBJECT', subject: sub})}
                          className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:bg-indigo-900/20 hover:border-indigo-500 transition-all text-xl font-bold text-left flex items-center gap-4"
                       >
                          <div className="p-3 bg-slate-800 rounded-lg text-indigo-400">
                             <BookOpen className="w-6 h-6" />
                          </div>
                          {sub}
                       </button>
                    ))}
                 </div>
                 <AdUnit />
              </div>
           </div>
           <Footer onNav={(page) => dispatch({type: 'NAVIGATE_PAGE', page})} />
        </div>
     )
  }

  if (state.status === 'selecting_topic') {
     const topics = SYLLABUS[state.selectedClass!]?.[state.selectedSubject!] || [];
     return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
           <div className="flex-grow flex items-center justify-center p-6 text-white">
              <div className="w-full max-w-2xl">
                 <button onClick={() => dispatch({type: 'GO_BACK'})} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white"><ArrowLeft className="w-4 h-4"/> Back to Subjects</button>
                 <h2 className="text-3xl font-bold mb-8">{state.selectedSubject} Chapters</h2>
                 <div className="space-y-3">
                    {topics.map(topic => (
                       <button 
                          key={topic}
                          onClick={() => selectTopic(topic)}
                          className="w-full p-5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-indigo-900/20 hover:border-indigo-500 transition-all text-lg font-medium text-left flex justify-between items-center group"
                       >
                          {topic}
                          <div className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-400">Start Quiz</div>
                       </button>
                    ))}
                 </div>
              </div>
           </div>
           <Footer onNav={(page) => dispatch({type: 'NAVIGATE_PAGE', page})} />
        </div>
     )
  }

  if (state.status === 'active') {
     return <QuizView state={state} dispatch={dispatch} />;
  }

  if (state.status === 'loading_questions' || state.status === 'submitting_result') {
     return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
           <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
     )
  }

  if (state.status === 'finished') {
     return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
           <div className="flex-grow flex items-center justify-center text-white p-6">
              <div className="text-center max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
                 <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                 <h2 className="text-3xl font-bold mb-2">Quiz Completed</h2>
                 <p className="text-slate-400 mb-8">Score saved successfully.</p>
                 
                 <div className="text-5xl font-black mb-8 text-white">{state.score} <span className="text-2xl text-slate-500 font-bold">/ {state.questions.length}</span></div>
                 
                 <div className="space-y-3">
                    <button onClick={() => dispatch({type: 'RESET'})} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-colors">
                       Take Another Quiz
                    </button>
                    <a 
                       href="https://instagram.com/unown.649" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors text-white"
                    >
                       Join Instagram for PDF
                    </a>
                 </div>

                 <AdUnit />
              </div>
           </div>
           <Footer onNav={(page) => dispatch({type: 'NAVIGATE_PAGE', page})} />
        </div>
     )
  }

  return null;
}
