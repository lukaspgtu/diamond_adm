import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();
  public showSearch = false;

  constructor() { }

}
