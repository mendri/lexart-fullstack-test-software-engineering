import IMessage from "../interfaces/IMessage"
import InitiateOrClosingChat from "./InitiateOrClosingChat"
import LoanRelevantInfo from "./LoanRelevantInfo"
import "./Message.css"

function MessageHandler(props: {m: IMessage}) {
  const { m } = props

  if (m.action == "chatbot_answer") {
    return (
      <div className="chatbot-message p-2 m-1 bg-slate-300 rounded-xl animate-chat-bot-animation">
        <p>{m.message}</p>
      </div>
      )
  }

  if (m.action == "chatbot_loan_answer") {
    return (
      <div>
        <div className="chatbot-message p-2 m-1 mb-6 bg-slate-300 rounded-xl animate-chat-bot-animation">
          <p>{m.message}</p>
        </div>
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          m.loan_helpers.map((helper, index) => {
            return <LoanRelevantInfo helper={helper} key={index} />
          })
        }
      </div>
    )
  }

  if (m.action == "initiate_chat") {
    return (
      <>
        <InitiateOrClosingChat type={m.action} />
        <div className="chatbot-message p-2 m-1 bg-slate-300 rounded-xl animate-chat-bot-animation">
          <p>{m.message}</p>
        </div>
      </>
    )
  }

  if (m.action == "closing_chat") {
    return (
      <>
        <div className="chatbot-message p-2 m-1 bg-slate-300 rounded-xl animate-chat-bot-animation">
          <p>{m.message}</p>
        </div>
        <InitiateOrClosingChat type={m.action} />
      </>
    )
  }

  return (
    <div className="user-message p-2 m-1 bg-blue-300 rounded-xl self-end">
      <p>{m.message}</p>
    </div>
  )
}

export default MessageHandler
