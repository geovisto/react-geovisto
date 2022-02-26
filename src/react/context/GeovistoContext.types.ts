import { ISidebarTool, ISidebarToolProps, SidebarTool } from "../..";
import { IMapDataManager, IMapDataManagerFactory, IMapToolsManager } from "../../index.core";

// type IGeovistoContext = IMyGeovistoMapProps;
export interface IGeovistoContext {
    // templates: IMapTemplates;
    // globals: IMapGlobals;
    // data: IMapDataManager;
    // geoData: IGeoDataManager;
    // tools: IMapToolsManager;
    // config: IMapConfigManager;

    // sample?: string,
    // setSample: (sample: string) => void; 
    // data?: IMapDataManager;
    // setData: (data: IMapDataManager) => void;
    sidebar?: ISidebarToolProps;
    setSidebar: (sidebar: ISidebarToolProps) => void;
    tools?: IMapToolsManager;
    setTools: (tools: IMapToolsManager) => void;
    // invokeAddToolHandler: (value: IToolProps) => void;    
    // registerAddToolHandler: (handler:(value: IToolProps) => void) => void; 
}
  

export interface IGeovistoProvider {
    readonly children: React.ReactNode;
}
