// COMPONENTS
export * from './react/components/index';
import'./stories/Demo.css';
import './ styles/common.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'leaflet';
import 'leaflet-sidebar-v2';
import "leaflet/dist/leaflet.css";
import "geovisto/dist/index.css";
import "geovisto-sidebar/dist/index.css";
import "geovisto-filters/dist/index.css";
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// styly sidebar

export const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';