import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { List } from './data.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public data: List[] = [];
  public column = ['ID', 'Name', 'Location', 'Phone', 'Created Date'];
  checkBoxValue = false;
  numberOfRecords: Number[] = [];
  isDblClick: boolean = false;
  count: Number = 0;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getData()
      .pipe(
        map((response) => {
          response.forEach((el) => {
            el.checked = false;
            el.isEditable = false;
            return el;
          });
          return response;
        })
      )
      .subscribe((data: List[]) => {
        this.data = data;
      });
  }

  onDelete() {
    if (this.isAllChecked()) {
      this.data.splice(0);
    } else {
      this.data = this.data.filter((el) => {
        return !this.numberOfRecords.some((item) => {
          return el.ID === item;
        });
      });
    }
  }

  onChechedChange(id: Number) {
    this.numberOfRecords.push(id);
  }

  onMainChechedChange(e: any) {
    return this.data.forEach((el) => (el.checked = e.target.checked));
  }

  isAllChecked() {
    return this.data.every((el) => el.checked);
  }

  onAdd() {
    this.data.push(new List());
    this.data[this.data.length - 1].ID = this.data.length;
    this.data[this.data.length - 1].isEditable = true;
  }

  onColumnClick(col: string) {
    if (col === 'Name') {
      let old = this.data;
      this.data = this.data.sort((a, b) => (a.Name > b.Name ? 1 : -1));
    }
  }

  onUpdate() {
    if (this.numberOfRecords.length === 1) {
      let a = Number(this.numberOfRecords[0]) - 1;
      this.data[a].isEditable = true;
      alert(`Data has been updated: ID: ${this.numberOfRecords}`);
    }
  }
}
