import React from "react";
import { value as valueType, animate, children, indicatorProps } from "../../types/components/tabs";
export interface TabsContextType {
    tab: {
        active: valueType;
        appliedAnimation: animate;
        indicatorProps: indicatorProps;
    };
    setTab: React.Dispatch<React.SetStateAction<{
        active: valueType;
        appliedAnimation: animate;
        indicatorProps: indicatorProps;
    }>>;
}
export interface TabsContextProviderProps {
    value: valueType;
    children: children;
}
export declare const TabsContext: React.Context<TabsContextType>;
export declare function useTabs(): TabsContextType;
export declare const TabsContextProvider: {
    ({ value, children }: TabsContextProviderProps): JSX.Element;
    propTypes: {
        value: any;
        children: any;
    };
    displayName: string;
};
//# sourceMappingURL=TabsContext.d.ts.map