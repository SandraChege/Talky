import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = this.getUsernameFromLocalStorage();
  }

  private getUsernameFromLocalStorage(): string {
    const storedUsername = localStorage.getItem('username');

    // Check if the username is stored
    if (storedUsername) {
      return storedUsername;
    } else {
      return 'Username';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
