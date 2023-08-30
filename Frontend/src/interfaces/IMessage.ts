import ILoanHelpers from "./ILoanHelpers";

interface IMessage {
  action: string;
  message: string;
  started?: boolean;
  loan_helpers?: Array<ILoanHelpers>;
}

export default IMessage
