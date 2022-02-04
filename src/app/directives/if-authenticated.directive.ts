import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../modules/auth/services/auth.service';

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective {

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this._createView();
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this._createView(isAuthenticated);
    })

  }

  private _createView(isAuthenticated?: boolean) {
    if (isAuthenticated || this.authService.isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
