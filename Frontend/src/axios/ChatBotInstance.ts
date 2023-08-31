import axios from "axios";

const ChatBotInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export default ChatBotInstance
