// Leaflet
import * as L from 'leaflet';
import "leaflet-sidebar-v2";
import "leaflet-sidebar-v2/css/leaflet-sidebar.min.css";

// styles
import "font-awesome/css/font-awesome.min.css";
import "../../../styles/style.scss";

// Geovisto core
import {
    DataManagerChangeEvent,
    IMapEvent,
    IMapTool,
    IMapToolInitProps,
    instanceOfMapForm,
    MapTool
} from '../../../../../index.core';

import DummyTabTool from '../dummy/DummyTabTool';
import ISidebarTab from '../../types/tab/ISidebarTab';
import ISidebarTabConfig from '../../types/tab/ISidebarTabConfig';
import ISidebarTool from '../../types/tool/ISidebarTool';
import ISidebarToolConfig from '../../types/tool/ISidebarToolConfig';
import ISidebarToolDefaults from '../../types/tool/ISidebarToolDefaults';
import ISidebarToolProps from '../../types/tool/ISidebarToolProps';
import ISidebarToolState from '../../types/tool/ISidebarToolState';
import SidebarTab from '../tab/SidebarTab';
import SidebarToolDefaults from "./SidebarToolDefaults";
import SidebarToolState from "./SidebarToolState";
import ThemeChangeAdapter from '../adapters/ThemeChangeAdapter';

/**
 * This class provides the sidebar tool.
 *
 * @author Jiri Hynek
 */
class SidebarTool extends MapTool implements ISidebarTool {

    private themeChangeAdapter!: ThemeChangeAdapter;

    /**
     * It creates a new tool with respect to the props.
     *
     * @param props
     */
    public constructor(props?: ISidebarToolProps) {
        super(props);
    }

    /**
     * It creates a copy of the uninitialized tool.
     */
    public copy(): ISidebarTool {
        return new SidebarTool(this.getProps());
    }

    /**
     * It returns the props given by the programmer.
     */
    public getProps(): ISidebarToolProps {
        return <ISidebarToolProps> super.getProps();
    }
    
    /**
     * It returns default values of the sidebar tool.
     */
    public getDefaults(): ISidebarToolDefaults {
        return <ISidebarToolDefaults> super.getDefaults();
    }

    /**
     * It creates new defaults of the tool.
     */
    protected createDefaults(): ISidebarToolDefaults {
        return new SidebarToolDefaults();
    }

    /**
     * It returns the sidebar tool state.
     */
    public getState(): ISidebarToolState {
        return <ISidebarToolState> super.getState();
    }

    /**
     * It returns default tool state.
     */
    protected createState(): ISidebarToolState {
        return new SidebarToolState(this);
    }

    /**
     * It returns theme change adapter.
     */
    protected getThemeChangeAdapter(): ThemeChangeAdapter {
        if(!this.themeChangeAdapter) {
            this.themeChangeAdapter = new ThemeChangeAdapter(this);
        }
        return this.themeChangeAdapter;
    }

    /**
     * Overrides the super method.
     * 
     * @param initProps
     */
    public initialize(initProps: IMapToolInitProps<ISidebarToolConfig>): this {
        return super.initialize(initProps);
    }

    /**
     * It creates sidebar.
     */
    public create(): this {
        super.create();
        this.createSidebar();
        this.createTabs();
        return this;
    }

    /**
     * It creates a sidebar tool and its parts (leaflet sidebar and sidebar tabs).
     */
    protected createSidebar(): void {
        if(this.isEnabled()) {
            const map = this.getMap()?.getState().getLeafletMap();
            if(map) {
                let sidebar = undefined;
                // create sidebar control and add it to the map
                sidebar = L.control.sidebar(this.getSidebarStructure()).addTo(map);
                // update state
                this.getState().setSidebar(sidebar);
            }
        }
    }

    /**
     * It returns structure of sidebar defined with respect to the leaflet-sidebar-v2 plugin specification.
     *
     * See: https://github.com/noerw/leaflet-sidebar-v2
     */
    protected getSidebarStructure(): L.Control.SidebarOptions {
        return {
            autopan: false,
            closeButton: true,
            //container: 'sidebar'
            position: 'left',
        };
    }

    /**
     * Help function which returns sidebar tabs.
     */
    public getTabs(): ISidebarTab[] {
        return this.getState().getTabs();
    }

    /**
     * It returns sidebar tabs.
     */
    protected createTabs(): void {
        const map = this.getMap();
        const propsTabs = this.getProps().tabs;
        if(map) {
            // import tabs
            const tabsConfigs: ISidebarTabConfig[] | undefined = this.getState().getTabsConfigs();
            if(tabsConfigs) {
                // based on config
                let tabConfig: ISidebarTabConfig, tool: IMapTool | undefined;
                for(let i = 0; i < tabsConfigs.length; i++) {
                    tabConfig = tabsConfigs[i];
                    // if the tool id is undefined a dummy tab tool is created and initialized
                    tool = tabConfig.tool ? map.getState().getTools().getById(tabConfig.tool) : new DummyTabTool().initialize({
                        map: map
                    });
                    this.createSidebarTab(tool, tabConfig, undefined);
                }
            } else if(propsTabs) {
                 for(const [ toolId, sidebarTab ] of propsTabs) {
                    // if the tool id is undefined a dummy tab tool is created and initialized
                    this.createSidebarTab(toolId ? map.getState().getTools().getById(toolId) : new DummyTabTool().initialize({
                        map: map
                    }), undefined, sidebarTab);
                 }
            } else {
                // based on the implicit order of the tools in the list of the tools
                const tools: IMapTool[] = map.getState().getTools().getAll();
                for(let i = 0; i < tools.length; i++) {
                    this.createSidebarTab(tools[i], undefined, undefined);
                }
            }
        }
    }

    /**
     * Help function which loops up a sidebar tab in props
     * 
     * @param toolId
     */
    protected getPropsSidebarTab(toolId: string): ISidebarTab | undefined {
        const propsTabs = this.getProps().tabs;
        if(propsTabs) {
            for(const [ id, sidebarTab ] of propsTabs) {
                if(id === toolId) {
                    return sidebarTab;
                }
            }
        }
    }

    /**
     * Help function which initializes and creates sidebar tab for a tool with respect to a given config.
     *
     * @param tool
     * @param config
     */
    protected createSidebarTab(tool: IMapTool | undefined, config: ISidebarTabConfig | undefined, propsSidebarTab: ISidebarTab | undefined): void {
        if(tool && instanceOfMapForm<IMapTool>(tool)) {
            const sidebar: L.Control.Sidebar | null = this.getState().getSidebar();
            if(sidebar) {
                // get the sidebar tab defined in props or create a new one
                const sidebarTab = propsSidebarTab ?? this.getPropsSidebarTab(tool.getId()) ?? new SidebarTab({
                    // defined by the sidebar tab defaults
                    name: tool.getDefaults().getLabel(),
                    icon: tool.getDefaults().getIcon()
                });
                // render sidebar
                sidebarTab.initialize({ tool: tool, sidebarTool: this, config: config });
                sidebarTab.create();
                // update state
                this.getState().addTab(sidebarTab);
            }
        }
    }

    /**
     * This function is called when a custom event is invoked.
     * 
     * @param event 
     */
     public handleEvent(event: IMapEvent): void {
        let tabs;
        switch (event.getType()) {
            case DataManagerChangeEvent.TYPE():
                tabs = this.getState().getTabs();
                for(let i = 0; i < tabs.length; i++) {
                    tabs[i].redraw();
                }
                break;
            default:
                this.getThemeChangeAdapter().handleEvent(event);
                break;
        }
    }
}
export default SidebarTool;
