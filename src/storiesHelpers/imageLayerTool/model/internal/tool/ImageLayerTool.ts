// Leaflet
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Geovisto
import { AbstractLayerTool, IMapChangeEvent, IMapEvent, IMapForm, IMapFormControl,
    IMapToolInitProps } from 'geovisto';

// Geovisto Themes Tool API
import { IMapTheme, IThemesToolAPI, IThemesToolAPIGetter } from 'geovisto-themes';

import IImageLayerTool from '../../types/tool/IImageLayerTool';
import IImageLayerToolConfig from '../../types/tool/IImageLayerToolConfig';
import IImageLayerToolDefaults from '../../types/tool/IImageLayerToolDefaults';
import IImageLayerToolState from '../../types/tool/IImageLayerToolState';
import IImageLayerToolProps from '../../types/tool/IImageLayerToolProps';
import ImageLayerToolDefaults from './ImageLayerToolDefaults';
import ImageLayerToolMapForm from '../form/ImageLayerToolMapForm';
import ImageLayerToolState from './ImageLayerToolState';

/**
 * This class represents Image layer tool.
 */
class ImageLayerTool extends AbstractLayerTool implements IImageLayerTool, IMapFormControl {
    
    private themesToolAPI: IThemesToolAPI | undefined;
    private mapForm!: IMapForm;

    /**
     * It creates a new tool with respect to the props.
     * 
     * @param props 
     */
    public constructor(props?: IImageLayerToolProps) {
        super(props);
    }

    /**
     * It creates a copy of the uninitialized tool.
     */
    public copy(): IImageLayerTool {
        return new ImageLayerTool(this.getProps());
    }

    /**
     * Help function which returns the props given by the programmer.
     */
    public getProps(): IImageLayerToolProps {
        return <IImageLayerToolProps> super.getProps();
    }

    /**
     * It returns default values of the state properties.
     */
    public getDefaults(): IImageLayerToolDefaults {
        return <IImageLayerToolDefaults> super.getDefaults();
    }

    /**
     * It creates new defaults of the layer tool.
     */
    protected createDefaults(): IImageLayerToolDefaults {
        return new ImageLayerToolDefaults();
    }

    /**
     * It returns the layer tool state.
     */
    public getState(): IImageLayerToolState {
        return <IImageLayerToolState> super.getState();
    }

    /**
     * It creates new defaults of the layer tool.
     */
    protected createState(): IImageLayerToolState {
        return new ImageLayerToolState(this);
    }

    /**
     * It returns a sidebar tab with respect to the configuration.
     */
    public getMapForm(): IMapForm {
        if(this.mapForm == undefined) {
            this.mapForm = this.createMapForm();
        }
        return this.mapForm;
    }

    /**
     * It creates new tab control.
     */
    protected createMapForm(): IMapForm {
        return new ImageLayerToolMapForm(this);
    }

    /**
     * Help function which acquires and returns the themes tool if available.
     */
    private getThemesTool(): IThemesToolAPI | undefined {
        if(this.themesToolAPI == undefined) {
            const api = this.getMap()?.getState().getToolsAPI() as IThemesToolAPIGetter;
            if(api.getGeovistoThemesTool) {
                this.themesToolAPI = api.getGeovistoThemesTool();
            }
        }
        return this.themesToolAPI;
    }

    /**
     * Overrides the super method.
     * 
     * @param initProps
     */
    public initialize(initProps: IMapToolInitProps<IImageLayerToolConfig>): this {
        return super.initialize(initProps);
    }

    /**
     * It creates layer items.
     */
    protected createLayerItems(): L.Layer[] {
        const layer: L.ImageOverlay = this.createImageLayer(this.getState().getUrl(), this.getState().getBounds());

        this.getState().setImageLayer(layer);

        return [ layer ];
    }

    /**
     * Creates new image layer
     */
    protected createImageLayer(url: string, bounds : L.LatLngBoundsLiteral): L.ImageOverlay {

        const map: L.Map | undefined = this.getMap()?.getState().getLeafletMap();
        
        const layer: L.ImageOverlay = L.imageOverlay(url, bounds).addTo(map!);
        return layer;
    }

    /**
     * This function is called when a custom event is invoked.
     * 
     * @param event 
     */
    public handleEvent(event: IMapEvent): void {
        if(event.getType() == this.getThemesTool()?.getChangeEventType()) {
            this.onThemeChange(<IMapTheme> (<IMapChangeEvent> event).getChangedObject());
        }
    }

    /**
     * This function updates theme used in the tool.
     */
    protected onThemeChange(theme: IMapTheme): void {

        let layer: L.ImageOverlay | undefined = this.getState().getImageLayer();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if(layer && (layer as any)._url != theme.getBaseMap()) {
            // remove the old layer
            const leafltMap = this.getMap()?.getState().getLeafletMap();
            if(leafltMap) {
                leafltMap.removeLayer(layer);

                // create a new image layer
                layer = this.createImageLayer(this.getState().getUrl(), this.getState().getBounds());

                // update state
                this.getState().setImageLayer(layer);

                // add the new layer to the leaflet map
                layer.addTo(leafltMap);
            }
        }
    }
}

export default ImageLayerTool;