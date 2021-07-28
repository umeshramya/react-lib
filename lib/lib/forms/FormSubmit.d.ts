import { ReactFragment } from "react";
import { propMaster } from "../Interfaces/interfaces";
interface Props extends propMaster {
    /**This is Form input elements. do not add Form elemet thise get rendered inside the form itself */
    Inputs: ReactFragment;
    showResetButton: boolean;
}
declare const FormSubmit: ({ curObj, curUri, Inputs, reset, onSuccess, onError, successCallBack, errorCallback, validation, AxiosRequestConfig, triggerSubmit, triggerReset, showResetButton }: Props) => JSX.Element;
export default FormSubmit;
//# sourceMappingURL=FormSubmit.d.ts.map