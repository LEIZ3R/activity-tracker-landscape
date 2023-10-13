import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/models/activitie';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent {
  @Input() activity: Activity = {
    activityId: 0,
    title: '',
    type: 'string',
    startDate: '',
    endDate: '',
    status: '',
  };
}
