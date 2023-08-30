import { useState } from "react"
import ILoanHelpers from "../interfaces/ILoanHelpers"

function LoanRelevantInfo(props: {helper: ILoanHelpers}) {
  const { helper } = props
  const [ CanItBeRevealed, setCanItBeRevealed ] = useState(false)
  
  
  return (
    <div>
      <div className="chatbot-message w-5/12 p-2 m-1 mt-8 bg-slate-600 rounded-full shadow-2xl flex justify-center">
        <button disabled={CanItBeRevealed} onClick={() => setCanItBeRevealed(true)} className="text-white font-bold">{helper.button_text}</button>
      </div>
      {
        CanItBeRevealed
        ? (
          <div className="chatbot-message
           flex flex-col justify-center">
            <p className="m-1 rounded-2xl bg-slate-600 p-2 text-white font-medium">{ helper.relevant_information }</p>
            <p className="m-1 rounded-2xl bg-slate-600 mt-4 p-2 text-white font-medium">
              Interested?
              <a className="text-slate-100 font-extrabold" target="_blank" href={window.location.href}> CLICK HERE </a>
              to learn more!
            </p>
          </div>
        )
        : (
          null
        )
      }
    </div>
  )
} 


export default LoanRelevantInfo