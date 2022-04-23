import { IToolDataProps } from "./IComponentTool";

// Sidebar tab data props extended of tool id
export type ISidebarTabDataProps<T> = IToolDataProps<T> & {
    tool?: string
}