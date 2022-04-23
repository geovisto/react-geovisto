import { ISidebarTab } from "geovisto-sidebar";

import { IToolDataProps } from "./IComponentTool";

// Exclude undesirable default sidebar properties
export type  ISidebarToolDataProps<T> = IToolDataProps<Omit<T, "tabs">>;

// Handle ref calls from parent
export type ISidebarToolHandle =  {
    getTabs: () => void;
}

// Default sidebar tab type
export type ISidebarTabs = [ string | undefined, ISidebarTab ][];