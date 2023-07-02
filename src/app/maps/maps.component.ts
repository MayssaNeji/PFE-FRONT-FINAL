import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef;
  map: Map;
  iconStyle: Style;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    const mapContainer = this.mapElement.nativeElement;

    const defaultCoordinates = [10.7116, 35.7513];

    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(defaultCoordinates)),
    });

    this.iconStyle = new Style({
      image: new Icon({
        src: 'assets/location-icon.png.png', // Path to your downloaded 3D location icon
        scale: 0.1, // Initial scale value for the icon
        anchor: [0.5, 1], // Anchor point of the icon
      }),
    });

    iconFeature.setStyle(this.iconStyle);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [iconFeature],
      }),
    });

    this.map = new Map({
      target: mapContainer,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(defaultCoordinates),
        zoom: 10,
      }),
    });

    this.map.getView().on('change:resolution', () => {
      const zoom = this.map.getView().getZoom();
      const scale = 0.1 / Math.pow(3, zoom - 10); // Adjust the divisor (10) as needed to control the scaling factor
      this.iconStyle.getImage().setScale(scale);
    });
  }
}
