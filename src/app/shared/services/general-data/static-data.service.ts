
import { Injectable, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  #translate = inject(TranslateService);

  public languages = [
    { value: "ar", label: "عربي", image: 'assets/media/languages/ar.png' },
    { value: "en", label: "English", image: 'assets/media/languages/en.png' },
    { value: "fr", label: "Français", image: 'assets/media/languages/fr.png' },
    { value: "es", label: "Español", image: 'assets/media/languages/es.png' },
    { value: "zh", label: "简体中文", image: 'assets/media/languages/zh.png' },
    { value: "ru", label: "Русский", image: 'assets/media/languages/ru.png' }
  ];

  public typesSetting = [
    { value: 'icon', label: this.#translate.instant(_('icon')) },
    { value: 'image', label: this.#translate.instant(_('image')) },
    { value: 'title', label: this.#translate.instant(_('title')) },
    { value: 'description', label: this.#translate.instant(_('description')) },
  ];

  public typesContacts = [
    { value: 'icon', label: this.#translate.instant(_('icon')) },
    { value: 'title', label: this.#translate.instant(_('title')) },
    { value: 'description', label: this.#translate.instant(_('description')) },
  ];

  public menuList = [
    { icon: "pi pi-home", link: 'dashbored', title: this.#translate.instant(_('Dashboard')) },
    { icon: "pi pi-book", link: 'blogs', title: this.#translate.instant(_('Blogs')) },
    { icon: "pi pi-id-card", link: 'clients', title: this.#translate.instant(_('Clients')) },
    { icon: "pi pi-fw pi-users", link: 'team-member', title: this.#translate.instant(_('Team')) },
    { icon: "pi pi-comment", link: 'testimonials', title: this.#translate.instant(_('Testimonials')) },
    { icon: "pi pi-fw pi-pencil", link: 'contact-details', title: this.#translate.instant(_('Contacts')) },
    { icon: "pi pi-comment", link: 'massages', title: this.#translate.instant(_('Massages')) },
    { icon: "pi pi-qrcode", link: 'services', title: this.#translate.instant(_('Services')) },
    { icon: "pi pi-home", link: 'branches', title: this.#translate.instant(_('Branches')) },
    { icon: "pi pi-cog", link: 'general-settings', title: this.#translate.instant(_('General Settings')) },
    { icon: "pi pi-comment", link: 'comments', title: this.#translate.instant(_('Comments')) },
    { icon: "pi pi-fw pi-users", link: 'lookups', title: this.#translate.instant(_('Lookups')) },
    { icon: "pi pi-sliders-h", link: 'sliders', title: this.#translate.instant(_('Sliders')) },
    { icon: "pi pi-sliders-h", link: 'sliders-items', title: this.#translate.instant(_('Slider Items')) },
  ];


  // public icons = [
  //   { value: 'fas fa-user', label: this.#translate.instant(_('User')) },
  //   { value: 'fas fa-pencil', label: this.#translate.instant(_('Edit')) },
  //   { value: 'fas fa-trash', label: this.#translate.instant(_('Delete')) },
  //   { value: 'fas fa-envelope', label: this.#translate.instant(_('Mail')) },
  //   { value: 'fas fa-magnifying-glass', label: this.#translate.instant(_('Search')) },
  //   { value: 'fas fa-star', label: this.#translate.instant(_('Star')) },
  //   { value: 'fas fa-thumbs-up', label: this.#translate.instant(_('Thumbs Up')) },
  //   { value: 'fas fa-bell', label: this.#translate.instant(_('Notification')) },
  //   { value: 'fas fa-gear', label: this.#translate.instant(_('Settings')) },
  //   { value: 'fas fa-heart', label: this.#translate.instant(_('Heart')) },
  //   { value: 'fas fa-comment', label: this.#translate.instant(_('Comment')) },
  //   { value: 'fas fa-share', label: this.#translate.instant(_('Share')) },
  //   { value: 'fas fa-calendar', label: this.#translate.instant(_('Calendar')) },
  //   { value: 'fas fa-clock', label: this.#translate.instant(_('Clock')) },
  //   { value: 'fas fa-paperclip', label: this.#translate.instant(_('Attach')) },
  //   { value: 'fas fa-globe', label: this.#translate.instant(_('Globe')) },
  //   { value: 'fas fa-user-plus', label: this.#translate.instant(_('Add User')) },
  //   { value: 'fas fa-user-minus', label: this.#translate.instant(_('Remove User')) },
  //   { value: 'fas fa-ellipsis', label: this.#translate.instant(_('More Options')) },
  //   { value: 'fas fa-lock', label: this.#translate.instant(_('Lock')) },
  //   { value: 'fas fa-unlock', label: this.#translate.instant(_('Unlock')) },
  //   { value: 'fas fa-check', label: this.#translate.instant(_('Check')) },
  //   { value: 'fas fa-circle-xmark', label: this.#translate.instant(_('Times')) },
  //   { value: 'fas fa-info', label: this.#translate.instant(_('Info')) },
  //   { value: 'fas fa-exclamation', label: this.#translate.instant(_('Exclamation')) },
  //   { value: 'fas fa-question', label: this.#translate.instant(_('Question')) },
  //   { value: 'fas fa-house', label: this.#translate.instant(_('Home')) },
  //   { value: 'fas fa-briefcase', label: this.#translate.instant(_('Briefcase')) },
  //   { value: 'fas fa-chart-bar', label: this.#translate.instant(_('Chart')) },
  //   { value: 'fas fa-star-half-alt', label: this.#translate.instant(_('Half Star')) },
  //   { value: 'fas fa-flag', label: this.#translate.instant(_('Flag')) },
  //   { value: 'fas fa-location-dot', label: this.#translate.instant(_('Location')) },
  //   { value: 'fas fa-phone', label: this.#translate.instant(_('Phone')) },
  //   { value: 'fas fa-envelope-open-text', label: this.#translate.instant(_('Open Mail')) },
  //   { value: 'fas fa-link', label: this.#translate.instant(_('Link')) },
  //   { value: 'fas fa-download', label: this.#translate.instant(_('Download')) },
  //   { value: 'fas fa-upload', label: this.#translate.instant(_('Upload')) },
  //   { value: 'fas fa-eye', label: this.#translate.instant(_('Eye')) },
  //   { value: 'fas fa-eye-slash', label: this.#translate.instant(_('Hide Eye')) },
  //   { value: 'fas fa-exclamation-triangle', label: this.#translate.instant(_('Warning')) },
  //   { value: 'fas fa-lightbulb', label: this.#translate.instant(_('Lightbulb')) },
  //   { value: 'fas fa-code', label: this.#translate.instant(_('Code')) },
  //   { value: 'fas fa-music', label: this.#translate.instant(_('Music')) },
  //   { value: 'fas fa-play', label: this.#translate.instant(_('Play')) },
  //   { value: 'fas fa-pause', label: this.#translate.instant(_('Pause')) },
  //   { value: 'fas fa-stop', label: this.#translate.instant(_('Stop')) },
  //   { value: 'fas fa-volume-up', label: this.#translate.instant(_('Volume Up')) },
  //   { value: 'fas fa-volume-low', label: this.#translate.instant(_('Volume Down')) },
  //   { value: 'fas fa-volume-off', label: this.#translate.instant(_('Mute')) }
  // ]
}
