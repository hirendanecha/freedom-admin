import { Component } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent {
  activeTab = 1;
  constructor() { }

  onTabChange(event): void {
    this.activeTab = event
    console.log('tab event ==>', event);
  }
}
