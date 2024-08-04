import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FileRemoveEvent, FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'formly-field-file',
  template: `
    <div class="p-field">
      @if (props.fileLabel) {
      <label>
        {{ props.fileLabel | translate }}
        @if (props.required && props.hideRequiredMarker !== true) {
        <span class="text-red-500">*</span>
        }
      </label>
      } @if (props.description) {
      <p class="mb-3 text-xs text-red-500 font-bold">{{ props.description | translate }}</p>
      }

      <p-fileUpload
        #fileUpload
        (onSelect)="onSelect($event)"
        (onRemove)="onRemove($event)"
        [multiple]="props.multiple ?? false"
        [disabled]="props.disabled ?? false"
        [accept]="props.accept ?? 'image/*'"
        [maxFileSize]="props.maxFileSize ?? 5000000"
        [fileLimit]="props.fileLimit"
        [chooseLabel]="props.chooseLabel ?? ('Click to choose' | translate)"
        chooseStyleClass="bg-transparent hover:bg-gray-50 border-1 border-500 text-sm text-600 shadow-none m-0"
        [chooseIcon]="props.chooseIcon ?? 'pi pi-image'"
        removeStyleClass="w-2rem h-2rem"
        [showUploadButton]="false"
        [showCancelButton]="false"
      >
        <ng-template pTemplate="content">
          @if (previewUrl() && fileUpload.accept === 'image/*') {
          <div
            class="w-7rem h-7rem border-2 border-300 bg-gray-100 border-round p-2"
          >
            <img
              [src]="previewUrl()"
              alt="Preview Image"
              class="w-full h-full img-contain"
            />
          </div>
          }
        </ng-template>
      </p-fileUpload>

      @if (showError && formControl.errors) {
      <small class="p-error" role="alert">
        <formly-validation-message [field]="field"></formly-validation-message>
      </small>
      }
    </div>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    TranslateModule,
    ButtonModule,
    TranslateModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileFieldComponent extends FieldType<FieldTypeConfig> {
  previewUrl = signal<string>('');

  onSelect(event: FileSelectEvent) {
    if (event.currentFiles && event.currentFiles.length > 0) {
      const file = event.currentFiles[0];
      this.formControl?.setValue(file);
    }
  }

  onRemove(event: FileRemoveEvent) {
    this.formControl?.setValue(null);
  }

  ngOnInit() {
    if (!this.formControl?.value) return;
    
    this.previewUrl.set(this.editImageUrl(this.formControl?.value));
    this.formControl?.setValue(null);
  }

    editImageUrl(image: string) {
    let convertImage = image.split('/');

    let fullImage =
      convertImage[convertImage.length - 2] +
      '/' +
      convertImage[convertImage.length - 1];
    return `https://digitalatum.com/projects/productions/ShopShimmer/src/backend/storage/app/public/media/products/${fullImage}`;
  }
}
