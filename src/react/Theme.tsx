import React, { useEffect } from 'react'

interface IThemeProps {
}

export const Theme: React.FC<IThemeProps> = ({}) => {

    useEffect(() => {
        // Update the document title using the browser API
        console.log("THEME has mounted");
      });

    return (<></>);
}