import { useState } from "react"

function InitiateOrClosingChat(props: {type: string}) {
  const {type} = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, _setDate] = useState(`${new Date().getHours()}:${new Date().getMinutes()} de ${ new Date().getDate() }/${ new Date().getMonth()}/${ new Date().getFullYear() }`)

  if (type == "initiate_chat") {
    return <p className="text-center text-white mt-6 mb-6 w-full bg-gray-800 rounded-2xl shadow-2xl">Iniciando o chat às {date}</p>
  }

  return <p className="text-center text-white mt-5 mb-6 w-full bg-gray-800 rounded-2xl shadow-2xl">Encerrando o chat às {date}</p>
}

export default InitiateOrClosingChat