import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showGoUpButton: boolean = false;
  isLoading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService){
    this.isLoading$ = this.loaderService.loading$;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 500) {
      this.showGoUpButton = true;
    } else {
      this.showGoUpButton = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
}
