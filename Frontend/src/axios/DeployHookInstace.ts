import axios from "axios";

const DeployHookInstance = axios.create({
  baseURL: import.meta.env.VITE_DEPLOY_HOOK,
})

export default DeployHookInstance
