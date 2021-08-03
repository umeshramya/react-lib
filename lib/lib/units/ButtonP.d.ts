import { Component } from "react";
import { recpthaSetting } from "../Interfaces/interfaces";
interface Props {
    text: string;
    onClick?: () => void;
    color?: string;
    disabled: boolean;
    recpthaSetting?: recpthaSetting;
}
interface State {
    toggelSpin: boolean;
}
export default class ButtonP extends Component<Props, State> {
    state: {
        toggelSpin: boolean;
    };
    /**This toggles the spinner of the button */
    spin: () => void;
    /**This shows the spinner of the button */
    showSpin: () => void;
    /**This hides the spinner of the button */
    hideSpin: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=ButtonP.d.ts.map