import { Injectable, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldBuilderService } from '../forms/field-builder.service';
import { StaticDataService } from '../general-data/static-data.service';

@Injectable({ providedIn: 'root' })
export class BuildJsonService {
  #StaticData = inject(StaticDataService);
  #fieldBuilder = inject(FieldBuilderService);

  BuildJsonFields(key: string, field: FormlyFieldConfig = {}): FormlyFieldConfig[] {
    return [
      this.#fieldBuilder.fieldBuilder(
        this.#StaticData.languages.map((lang) => {
          return {
            key: `${key}.${lang.value}`,
            ...field,
            props: {
              ...field.props,
              label: _(`${key} - ${lang.label}`)
            },
          }
        })
      ),
    ]
  };
};
