import { any } from "prop-types";
import React, { FC, useState } from "react";
import { createContext, useContext } from "react";
import { IGeoDataManager, IMapConfigManager, IMapDataManager, IMapGlobals, IMapTemplates, IMapTool, IMapToolsManager } from "../..";
import { IMyGeovistoMapProps } from "../MyGeovistoMap";
import { IToolProps } from "../Tool";
import { IGeovistoContext } from "./GeovistoContext.types";

// *************************************
// POZOR, tento soubor je TS a ne TSX //
// *************************************

const errorHandler = (subject : string) => { throw new Error(subject + ' must be defined in provider'); };


const geovistoContextDefault = {
    // templates: any,
    // globals: any,
    // data: undefined,
    // geoData: any,
    // tools: any,
    // config: any,

    sample: undefined,
    setSample: () => errorHandler('setSample'),
    data: undefined,
    setData: () => errorHandler('setData'),
    tools: undefined,
    setTools: () => errorHandler('setTools')

    // invokeAddToolHandler: errorHandler , 
    // registerAddToolHandler: errorHandler
};

// Partial<IThemeContext> -- The Partial generic function tells TypeScript that we don't require all values to be defined
export const GeovistoContext = createContext<IGeovistoContext>(
   geovistoContextDefault
);

export function useGeovistoContext(): IGeovistoContext {
    const context = useContext(GeovistoContext);

    if (context === undefined) {
        throw new Error('useGeovistoContext must be used within a GeovistoContextProvider');
    }

    // TODO: Muze byt null? Asi ani ne, kdyz jsi oddelal typ
    if (context == null) {
        throw new Error('No context provided');
    }

    return context;
  }











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