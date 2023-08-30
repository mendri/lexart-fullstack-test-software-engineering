import { faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState, KeyboardEvent } from "react"
import ChatBotInstance from "./axios/ChatBotInstance"
import IMessage from "./interfaces/IMessage"
import Message from "./components/Message"

function App() {
  const [inputMessage, setInputMessage] = useState("")
  const [isStarted, setIsStarted] = useState(false)
  const [isLogged, setIsLogged] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [messageHistory, setMessageHistory] = useState<Array<IMessage>>([])
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }

  }, [messageHistory])

  async function handleLogin() {
    const { data } = await ChatBotInstance.post("/login", { username, password })
    setIsLogged(data.logged)
  }

  async function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      await handleClick()
    }
  }

  async function handleCloseChat() {
    await ChatBotInstance.post("/goodbye", {
      username,
      password,
      "message_history": messageHistory
    })
  }

  async function handleClick() {
    const { data } = await ChatBotInstance.post("/predict", { "message": inputMessage, "started": isStarted })

    if (!data.started && data.logged) {
      await handleCloseChat()
    }

    setIsStarted(data.started)
    setIsLogged(data.logged)
    const userMessage = { "action": "user_message", "message": inputMessage }
    const chatMessage = { "action": data.response_type, "message": data.answer, ...data } 
      
    setMessageHistory([...messageHistory, userMessage, chatMessage])
    setInputMessage("")
  }

  return (
    <main className="w-full h-full flex justify-center items-center bg-slate-600">
      <div className="w-full h-5/6 display flex justify-center">
        <div className="w-1/3 h-full bg-white shadow-2xl border border-black rounded-3xl flex flex-col items-center">
          <div ref={ref} className="w-full h-5/6 p-4 flex flex-col overflow-y-scroll">
            {
              messageHistory.map((m, index) => {
                return (
                  <Message key={index} m={m} />
                )
              })
            }
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="w-full h-1/6 flex justify-center items-center">
            <input disabled={!isLogged} onKeyDown={(e) => handleKeyDown(e)} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="w-4/5 m-4 p-2 border border-black rounded-lg shadow-2xl"/>
            <button disabled={inputMessage.length <= 0} onClick={handleClick} type="button" className="mr-4 w-10 h-10 flex justify-center items-center">
              <FontAwesomeIcon className="h-8 hover:h-9" icon={faShare} />
            </button>
          </form>
        </div>
        {
          isStarted && !isLogged
          ? (
            <div className="w-1/3 h-1/2 bg-white shadow-2xl border border-black rounded-3xl flex items-center justify-center">
              <form className="flex flex-col items-center w-full">
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="border w-7/12 mb-2 p-1 rounded-lg border-black" placeholder="Username" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="border w-7/12 mt-2 p-1 rounded-lg border-black" placeholder="Password" type="password" />
                <button onClick={handleLogin} className="w-2/12 mt-6 p-2 text-white font-extrabold bg-gradient-to-tr shadow-md from-blue-400 to-blue-600
                rounded-lg" type="button">Logar</button>
              </form>
            </div>
          ) : null
        }
      </div>
    </main>
  )
}

export default App
