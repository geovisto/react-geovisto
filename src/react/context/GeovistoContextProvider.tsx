import React, { FC, useState } from "react";
import { ISidebarTool, ISidebarToolProps } from "../..";
import { IMapDataManager, IMapDataManagerFactory, IMapToolsManager } from "../../index.core";
import { GeovistoContext } from "./GeovistoContext";
import { IGeovistoContext, IGeovistoProvider } from "./GeovistoContext.types";


// *************************************
// POZOR, tento soubor je TS a ne TSX //
// *************************************



export const GeovistoProvider = ({ children }: IGeovistoProvider) => {
    
  const [sidebar, setSidebar] = useState<ISidebarToolProps>();
  const [tools, setTools] = useState<IMapToolsManager>();
    // const [data, setData] = useState<IMapDataManager>();
    // const [sample, setSample] = useState<string>();

//   var addToolHandler : (tool: IToolProps) => void = () => {};  

  const instance: IGeovistoContext = {
      // sample,
      // setSample,
      // data,
      // setData,
      sidebar,
      setSidebar,
      tools,
      setTools,
    //   invokeAddToolHandler: function (tool): void {
    //       addToolHandler(tool);
    //   },

    //   registerAddToolHandler: function (handler: (tool: IToolProps) => void): void {
    //     addToolHandler = handler;
    //   },
  }

  return (
      <GeovistoContext.Provider value={instance}>
          {children}
      </GeovistoContext.Provider>
  );
};












// https://felixgerschau.com/react-typescript-context/#tldr---how-to-make-react-context-typescript-compatible
//////////////////////////////////

// interface IThemeContext {
//     dark: boolean;
//     toggleDark?: () => void;
//   }
  
//   const defaultState = {
//     dark: false,
//   };
  
//   const ThemeContext = React.createContext<IThemeContext>(defaultState);

// export const ThemeProvider: FC = ({ children }) => {
//     const [dark, setDark] = useState(defaultState.dark);
  
//     const toggleDark = () => {
//       setDark(!dark);
//     };
  
//     return (
//       <ThemeContext.Provider
//         value={{
//           dark,
//           toggleDark,
//         }}
//       >
//         {children}
//       </ThemeContext.Provider>
//     );
//   };