import { Component, OnInit } from '@angular/core';

import { VisitorsService } from './services/api.service';

declare const L: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ipaddress = '';
  latitude = '';
  longitude = '';
  region = '';
  isp = '';
  city = '';
  location = '';
  country = '';
  postalCode = '';
  timezone = '';
  search = '';

  constructor(private visitorsService: VisitorsService) {}

  initializingMap(): any {
    // call this method before you initialize your map.
    const container = L.DomUtil.get('map');
    if (container != null) {
      container._leaflet_id = null;
    }
  }

  leafMap(lati: any, long: any): any {
    const map = L.map('map').setView([lati, long], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.zoomControl.remove();
    // Map Icon
    const blackIcon = L.icon({
      iconUrl: '../../assets/images/icon-location.svg',

      iconSize: [38, 45], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
    const marker = L.marker([this.latitude, this.longitude], {
      icon: blackIcon,
    }).addTo(map);
  }

  setIt(ipman: any): any {
    this.visitorsService.getGEOLocation(ipman).subscribe((res: any) => {
      this.ipaddress = res['ip'];
      this.location = res['location'];
      this.country = this.location['country'];
      this.latitude = this.location['lat'];
      this.longitude = this.location['lng'];
      this.region = this.location['region'];
      this.city = this.location['city'];
      this.postalCode = this.location['postalCode'];
      this.timezone = this.location['timezone'];
      this.isp = res['isp'];

      // Adding the Map
      this.initializingMap();
      this.leafMap(this.latitude, this.longitude);
    });
  }

  onSubmit(num: any): any {
    this.setIt(num);
  }

  ngOnInit(): void {
    this.visitorsService.getIpAddress().subscribe((res: any) => {
      this.ipaddress = res['ip'];
      this.setIt(this.ipaddress);
    });
  }
}
