import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
/* Load the Google maps SCRIPT dynamically.
TypeScript users need to install:
npm i -D @types/google.maps */
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AlertService } from '../../services';

@Component({
  selector: 'formly-map-field',
  template: `
    <button pButton type="button"
      (click)="loadMap()"
      class="p-button-link shadow-none text-primary px-0"
      [label]="props.isReadOnlyMap ? 'Show Location On Map' : 'Set Location On Map'"
      icon="fas fa-location-dot"></button>

    <div [hidden]="!isMapDisplayed()">
      <!-- here if we use @if () {} in place of [hidden], it will give us
        TypeError: Cannot read property 'nativeElement' (#mapCanvas) of undefined,
        This error occurs when you're trying to target an element (#mapCanvas) that is wrapped in a condition (if your target element is inside a hidden element).

        for example: @if (canShow) {<p #target>Targeted Element</p> }

        In this code, if canShow is false, Angular won't be able to get that #target element as it won't be rendered.

        So use [hidden], class.show or class.hide in place of @if () {},
        so the element gets rendered but is hidden until your condition is fulfilled. -->
      <div #mapCanvas class="w-full h-22rem mt-3"></div>
    </div>
  `,
  standalone: true,
  imports: [ButtonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent extends FieldType<FieldTypeConfig> implements OnInit {
  #alert = inject(AlertService);

  @ViewChild("mapCanvas") mapCanvas!: ElementRef<HTMLElement>;

  isMapDisplayed = signal(false);
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  center!: google.maps.LatLngLiteral;

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = +this.field.model?.geo_location?.lat;
          const lng = +this.field.model?.geo_location?.lng;
          this.center = {
            lat: lat || position.coords.latitude, // 29.917184 (current)
            lng: lng || position.coords.longitude // 31.2508416 (current)
          };
        },
        (error: GeolocationPositionError) => {
          if (error.PERMISSION_DENIED)
            this.#alert.showMsg("error", "Permission denied");
          else if (error.POSITION_UNAVAILABLE)
            this.#alert.showMsg("error", "Position unavailable");
          else if (error.TIMEOUT)
            this.#alert.showMsg("error", "Timed out");
          else
            this.#alert.showMsg("error", `Error: ${error.code} ${error.message}`);
        },
        { enableHighAccuracy: true }
      );
    } else {
      this.#alert.showMsg("error", "Geolocation is not supported by this browser.");
    }
  };

  loadMap() {
    this.isMapDisplayed.update(isMapDisplayed => !isMapDisplayed);

    const loader = new Loader({
      apiKey: ""// AIzaSyDHSr5fg_yOBBNd8LJfgEUFtqjDuqgdnF4
    });

    const mapOptions = {
      center: this.center,
      zoom: 8
    };

    loader.importLibrary('maps').then(({ Map }) => {
      this.map = new Map(this.mapCanvas.nativeElement, mapOptions);
    });

    loader.importLibrary('marker').then(({ Marker }) => {
      this.marker = new Marker({
        position: this.center,
        map: this.map,
        draggable: true,
        icon: "assets/media/icons/marker-icon.svg",
        animation: !this.props.isReadOnlyMap ? google.maps.Animation.BOUNCE : null
      });

      if (this.props.isReadOnlyMap) return;
      this.map.addListener('click', (event: any) => {
        const { latLng } = event;
        this.marker.setPosition(latLng);
        // setCenter() method reloads the map. For enabling the animation, use panTo() instead.
        this.map.panTo(latLng);
        this.formControl?.setValue(latLng);
        this.formControl?.updateValueAndValidity();
      });

      this.marker.addListener('click', (event: any) => {
        const { latLng } = event;
        // setCenter() method reloads the map. For enabling the animation, use panTo() instead.
        this.map.panTo(latLng);
        this.formControl?.setValue(latLng);
        this.formControl?.updateValueAndValidity();
      });

      this.marker.addListener('dragend', (event: any) => {
        const { latLng } = event;
        this.formControl?.setValue(latLng);
        this.formControl?.updateValueAndValidity();
      });
    });
  };
}
