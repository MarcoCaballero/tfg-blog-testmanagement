import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'tmblog-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private _iconRegistry: MdIconRegistry,
    private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'linkedin',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'testmanagement',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/testmanagement.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'testmanagement-light',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/testmanagement-light.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'testmanagement-light-v2',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/testmanagement-light-v2.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'testmanagement-accent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/testmanagement-accent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'angular',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/angular.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'spring',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/spring.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'travis',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/travis.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'docker',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/docker.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'elastest',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/elastest.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'blog_head_code',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/blog_head_code.svg'));
  }
}
