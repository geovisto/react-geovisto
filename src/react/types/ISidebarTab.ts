import { IToolDataProps } from "./IComponentTool";

export type ISidebarTabDataProps<T> =  IToolDataProps<T> & {
    tool: string
}