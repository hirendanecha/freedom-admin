import { Component } from '@angular/core';

@Component({
  selector: 'app-freedom-page',
  templateUrl: './freedom-page.component.html',
  styleUrls: ['./freedom-page.component.scss'],
})
export class CommunityComponent {
  activeTab = 1;
  constructor() { }

  onTabChange(event): void {
    this.activeTab = event
    console.log('tab event ==>', event);
  }
}
