import { Component } from '@angular/core';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css'],
})
export class MypostsComponent {
  showReply: boolean = false;

  toggleReply() {
    this.showReply = true;
  }
}
