import { Component, OnInit } from '@angular/core';
import { UiService } from './core/ui-service/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private uiService: UiService) {}

  ngOnInit() {
    /** initializes page */
    this.uiService.getBalanceHistory();
    this.uiService.getGames();
  }
}
