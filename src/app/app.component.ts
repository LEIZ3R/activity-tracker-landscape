import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Activity } from './models/activitie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly ACTIVITY_STATUS = [
    {
      value: 'IN_PROGRESS',
      viewValue: 'En progreso',
    },
    {
      value: 'DONE',
      viewValue: 'Hecho',
    },
  ];

  readonly ACTIVITY_TYPE = [
    {
      value: 'PARTY',
      viewValue: 'Fiesta de espuma',
    },
    {
      value: 'ACTIVITY',
      viewValue: 'Caminar',
    },
    {
      value: 'FOOD',
      viewValue: 'Desayuno',
    },
  ];

  constructor(private fb: FormBuilder) {}

  activities: Activity[] = [
    {
      activityId: 1,
      title: 'Subida al cerro catedral',
      type: 'ACTIVITY',
      startDate: '2023-10-14 01:30:00',
      endDate: '2023-10-14 01:30:00',
      status: 'IN_PROGRESS',
    },
    {
      activityId: 2,
      title: 'Fiesta de espuma',
      type: 'PARTY',
      startDate: '2023-10-14 01:30:00',
      endDate: '2023-10-14 23:30:00',
      status: 'DONE',
    },
    {
      activityId: 3,
      title: 'Concierto en el parque',
      type: 'CONCERT',
      startDate: '2023-10-13 18:00:00',
      endDate: '2023-10-13 22:00:00',
      status: 'IN_PROGRESS',
    },
    {
      activityId: 4,
      title: 'Taller de cocina',
      type: 'WORKSHOP',
      startDate: '2023-10-15 10:00:00',
      endDate: '2023-10-15 14:00:00',
      status: 'PLANNED',
    },
  ];
  undatedActivities: Activity[] = [];
  firstActivitiesArray: Activity[] = [];
  secondActivitiesArray: Activity[] = [];
  thirdActivitiesArray: Activity[] = [];
  todayActivitiesDate: Date = new Date();
  tomorrowActivitiesDate: Date = new Date();
  thirdActivitiesDate: Date = new Date();
  schedules: string[] = [];

  public activityForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    type: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    startHour: ['', [Validators.required]],
    endHour: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.createDatesActivitiesContainers();
    this.activities.forEach(activity => {
      this.assignActivities(activity);
    });
    this.createHoursArray();
  }

  createActivity(): void {
    console.log('this.activityForm.value :>> ', this.activityForm.value);
    const { title, type, startDate, endDate, status } = this.activityForm.value;
    const payload: Activity = {
      activityId: 1,
      title,
      type,
      startDate,
      endDate: this.activityForm.get('startDate')?.value,
      status,
    };
    console.log('payload :>> ', payload);
  }

  createDatesActivitiesContainers(): void {
    this.todayActivitiesDate = new Date();
    this.tomorrowActivitiesDate.setDate(this.todayActivitiesDate.getDate() + 1);
    this.thirdActivitiesDate.setDate(this.todayActivitiesDate.getDate() + 2);
  }

  drop(event: CdkDragDrop<Activity[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  assignActivities(activity: Activity): void {
    if (typeof activity.startDate === 'string') {
      const date = new Date(activity.startDate as string);
      if (
        date.toLocaleDateString() ===
        this.todayActivitiesDate.toLocaleDateString()
      ) {
        this.firstActivitiesArray.push(activity);
      } else if (
        date.toLocaleDateString() ===
        this.tomorrowActivitiesDate.toLocaleDateString()
      ) {
        this.secondActivitiesArray.push(activity);
      } else if (
        date.toLocaleDateString() ===
        this.thirdActivitiesDate.toLocaleDateString()
      ) {
        this.thirdActivitiesArray.push(activity);
      }
    } else {
      this.undatedActivities.push(activity);
    }
  }

  isValidField(field: string): boolean | null {
    return (
      this.activityForm.controls[field].errors &&
      this.activityForm.controls[field].touched
    );
  }

  createHoursArray(): void {
    let schedules = [];
    const horaInicio = 8;
    const horaFin = 22;
    for (let hora = horaInicio; hora <= horaFin; hora++) {
      let horario = `${hora.toString().padStart(2, '0')}:00`;
      schedules.push(horario);
    }
    this.schedules = schedules;
  }

  getFieldError(field: string): string | null {
    if (!this.activityForm.controls[field]) {
      return null;
    }

    const errors = this.activityForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
      }
    }
    return null;
  }
}
