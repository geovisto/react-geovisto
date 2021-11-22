import React, { FC, useState } from "react";
import { createContext, useContext } from "react";
import { IGeoDataManager, IMapConfigManager, IMapDataManager, IMapGlobals, IMapTemplates, IMapTool, IMapToolsManager } from "..";
import { IMyGeovistoMapProps } from "./MyGeovistoMap";

// *************************************
// POZOR, tento soubor je TS a ne TSX //
// *************************************

type IGeovistoContext = IMyGeovistoMapProps;
// interface IGeovistoContext {
//     templates: IMapTemplates;
//     globals: IMapGlobals;
//     data: IMapDataManager;
//     geoData: IGeoDataManager;
//     tools: IMapToolsManager;
//     config: IMapConfigManager;
// };
  
const geovistoContextDefault = {
    data : undefined
};

// Partial<IThemeContext> -- The Partial generic function tells TypeScript that we don't require all values to be defined
const GeovistoContext = createContext<IGeovistoContext>(
  geovistoContextDefault
);

export const GeovistoProvider = GeovistoContext.Provider;

export function useGeovistoContext(): Partial<IGeovistoContext> {
    const context = useContext(GeovistoContext);

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