import { TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';

/* In TypeScript, interfaces only define the shape of an object but do not allow us to assign default values directly. This is because interfaces do not exist at runtime; they are a compile-time construct used for type checking. To assign default values, we can consider using a class to generate an instance with default values */

// Global types (models/entities)
export interface GlobalApiResponse {
  message: string;
  status: boolean;
  data: any;
}

export interface LoginModel {
  email: string;
  password: string;
}
export interface ForgetModel {
  email: string;
}

export interface VerifyModel {
  token: string;
  checkExpireResetTokenPage: boolean;
}

export interface ResetModel {
  token: string;
  password: string;
  password_confirm: string;
}

export interface FileAttachment {
  id: number;
  name: string;
  file_name: string;
  mime_type: string;
  size: number;
  file: string;
  extension: string;
}

export type EditData<T> = T & {
  [key: string]: any;
};

export interface BreadcrumbItem {
  label?: string;
  url?: string;
  icon?: string;
}

export interface DataTableColumn {
  title?: string | null;
  name?: string | null;
  searchable?: boolean | null;
  orderable?: boolean | null;
  search?: {
    value?: string | null;
    regex?: boolean | null;
  };
  trans?: boolean;
  render?: TemplateRef<any> | null;
  expandable?: boolean | null;
  transform?: { [key: string]: any };
}

export interface FiltersData {
  [key: string]: any;
  start: number;
  length: number;
  order: { column: number | null; dir: 'asc' | 'desc' }[];
  columns: DataTableColumn[];
  search: string | null;
}

export class BaseCrudIndexMeta {
  endpoints: any;
  columns: DataTableColumn[];
  indexIcon: string;
  indexTitle: string;
  showById: string | null;
  query: { [key: string]: any };
  provideFields: string[];
  withAction: boolean;
  displayHeaderButton: boolean;
  createBtnLabel: string;
  indexTableKey: string | undefined;
  reorderableColumns?: boolean;
  reorderableRows?: boolean;
  reorderEndpoint?: string | null;

  constructor() {
    this.endpoints = {};
    this.showById = null
    this.columns = [];
    this.indexIcon = '';
    this.indexTitle = 'Index';
    this.provideFields = [];
    this.query = {};
    this.withAction = true;
    this.displayHeaderButton = true;
    this.createBtnLabel = 'Create New Item';
    this.indexTableKey = undefined;
    this.reorderableColumns = false;
    this.reorderableRows = false;
    this.reorderEndpoint = null;
  }
}

export class BaseCrudDialogMeta {
  endpoints: any;
  showDialogHeader: boolean;
  dialogData$: Observable<any>;
  isTitleRenderedAsBtn: boolean;
  dialogTitle: string;
  dialogSubtitle: string;
  titleIcon: string;
  dialogTitleClass: string;
  displayButton: boolean;
  buttonClass: string;
  buttonLabel: string;
  submitButtonLabel: string;
  buttonIcon: string;
  isHeaderSticky: boolean;
  langDesc: boolean;
  showResetButton: boolean;
  isShouldCloseDialog: boolean;
  showFormActions: boolean;
  showSubmitButton: boolean;
  withFormPadding: boolean;

  constructor() {
    this.endpoints = {};
    this.showDialogHeader = true;
    this.dialogData$ = of(1);
    this.isTitleRenderedAsBtn = false;
    this.dialogTitle = '';
    this.dialogSubtitle = '';
    this.titleIcon = '';
    this.dialogTitleClass = '';
    this.displayButton = false;
    this.buttonClass = '';
    this.buttonLabel = '';
    this.submitButtonLabel = '';
    this.buttonIcon = '';
    this.isHeaderSticky = false;
    this.showResetButton = false;
    this.isShouldCloseDialog = true;
    this.langDesc = true;
    this.showFormActions = true;
    this.showSubmitButton = true;
    this.withFormPadding = true;
  }
}

export type PartialBaseCrudDialogMeta = Partial<BaseCrudDialogMeta>;
// To define a partial of data from the BaseCrudDialogMeta class, we can use the Partial<T> utility type provided by TypeScript. Partial<T> allows us to create a new type that has all the properties of T, but with each property marked as optional.

// Note that when using a partial instance, the properties that are not assigned will have their default values as defined in the BaseCrudDialogMeta class constructor.
