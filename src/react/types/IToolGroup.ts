import { IMap } from "../..";


export type IToolGroupProps = {
    children?: React.ReactNode;
    onRenderChange?: (data: unknown) => IMap;
}

export type IToolGroupHandle = {
    rerenderTools: () => void;
}