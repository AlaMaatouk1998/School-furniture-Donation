import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormLayout } from 'ng-devui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Furniture } from 'src/app/@core/models/furniture.interface';
import { FurnitureCategory } from 'src/app/@core/models/furnitureCategory.interface';
import { StudyLevel } from 'src/app/@core/models/studyLevel.interface';
import { FurnitureService } from 'src/app/@core/services/furniture/furniture.service';
import { AppState } from 'src/app/@core/state/app.state';
import { loadFurnitures } from 'src/app/@core/state/furniture/furniture.actions';
import { getFurnitures } from 'src/app/@core/state/furniture/furniture.selector';
import { loadFurnitureCategories } from 'src/app/@core/state/furnitureCategory/furnitureCategory.actions';
import { furnitureCategoryReducer } from 'src/app/@core/state/furnitureCategory/furnitureCategory.reducer';
import { getFurnitureCategories } from 'src/app/@core/state/furnitureCategory/furnitureCategoryselector';
import { loadStudyLevels } from 'src/app/@core/state/studyLevel/studyLevel.actions';
import { getStudyLevels } from 'src/app/@core/state/studyLevel/studyLevel.selector';
import * as FurnitureActions from 'src/app/@core/state/furniture/furniture.actions';
import { selectToken } from 'src/app/@core/state/auth/auth.selector';
import { ThemeService } from 'ng-devui/theme';

@Component({
  selector: 'da-horizontal-form',
  templateUrl: './updateFurniture-form.component.html',
  styleUrls: ['./updateFurniture-form.component.scss'],
})
export class UpdateFurnitureFormComponent implements OnInit {
  // @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

  // file: File = {
  //   data: null,
  //   inProgress: false,
  //   progress: 0
  // };

  furnitureId: number;
  studyLevel!: StudyLevel[];
  furCategory!: FurnitureCategory[];
  fur!: Furniture;
  x: string;
  description = '';
  title = '';
  body = '';
  furnitureCategory = 0;
  // private furnitureId: Observable<number> = this.activatedRoute.params.pipe(map((params: Params) => parseInt(params['furnitureId'])));
  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>, private furnitureService: FurnitureService) {
    // this.fur = {id: number,
    //   title: string,
    //   slug: string,
    //   description: string,
    //   body: string,
    //   createdAt: Date,
    //   updatedAt: Date,
    //   quantityAvl: number,
    //   furnitureCategory: FurnitureCategory,
    //   author: User,
    //   headerImage: string,
    //   publishedDate: Date,
    //   isPublished: false,}
    this.furnitureId = 0;
    this.x = '';
  }
  ngOnInit(): void {
    this.store.select(selectToken).subscribe((v) => {
      if (v) console.log('amaan', v);
    });
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const furnitureId = Number(routeParams.get('id'));
    this.furnitureId = furnitureId;
    // this.store.dispatch(loadFurnitures());
    this.store.select(getFurnitures).subscribe((v) => {
      console.log(v);

      const tab = v.filter((item) => item.id == furnitureId);

      this.fur = tab[0];

      console.log(this.fur);

      // this.formData = {
      //   description: this.fur.description,
      //   body: this.fur.body,
      //   title: this.fur.title,
      //   furnitureCategory: { id: this.fur.furnitureCategory.id },
      // };
    });
    console.log(this.description);
    if (this.fur.description) this.description = this.fur.description;
    if (this.fur.body) this.body = this.fur.body;
    if (this.fur.title) this.title = this.fur.title;
    if (this.fur.furnitureCategory && this.fur.furnitureCategory.id) this.furnitureCategory = this.fur.furnitureCategory.id;
    console.log(this.title);
    this.store.dispatch(loadFurnitureCategories());
    this.store.select(getFurnitureCategories).subscribe((v) => {
      this.furCategory = v;

      console.log('array :', this.furCategory);
    });
    this.store.dispatch(loadStudyLevels());
    this.store.select(getStudyLevels).subscribe((v) => {
      this.studyLevel = v;
      console.log('array :', this.studyLevel);
    });

    console.log(furnitureId);

    this.multipleSelectConfig = {
      key: 'multipleSelect',
      label: 'Options(Multiple selection with delete)',
      isSearch: true,
      multiple: 'true',
      labelization: { enable: true, labelMaxWidth: '120px' },
      options: this.participantOptions,
    };
  }

  // post() {
  //   this.blogService.post(this.form.getRawValue()).pipe(
  //     tap(() => this.router.navigate(['../']))
  //   ).subscribe();
  // }

  // onClick() {
  //   const fileInput = this.fileUpload.nativeElement;
  //   fileInput.click();
  //   fileInput.onchange = () => {
  //     this.file = {
  //       data: fileInput.files[0],
  //       inProgress: false,
  //       progress: 0
  //     };
  //     this.fileUpload.nativeElement.value = '';
  //     this.uploadFile();
  //   };
  // }

  // uploadFile() {
  //   const formData = new FormData();
  //   formData.append('file', this.file.data);
  //   this.file.inProgress = true;

  //   this.blogService.uploadHeaderImage(formData).pipe(
  //     map((event) => {
  //       switch (event.type) {
  //         case HttpEventType.UploadProgress:
  //           this.file.progress = Math.round(event.loaded * 100 / event.total);
  //           break;
  //         case HttpEventType.Response:
  //           return event;
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       this.file.inProgress = false;
  //       return of('Upload failed');
  //     })).subscribe((event: any) => {
  //       if(typeof (event) === 'object') {
  //         this.form.patchValue({headerImage: event.body.filename});
  //       }
  //     })
  // }
  multipleSelectConfig: any;
  layout = FormLayout.Horizontal;

  labelList = [
    {
      id: 1,
      label: 'OpenSource',
    },
    {
      id: 2,
      label: 'Admin',
    },
    {
      id: 3,
      label: 'DevUI',
    },
  ];

  addedLabelList = [];

  initiatorOptions = [
    {
      id: 1,
      label: 'Lily',
    },
    {
      id: 2,
      label: 'Goffy',
    },
    {
      id: 3,
      label: 'Nancy',
    },
  ];

  participantOptions = [
    {
      id: 1,
      label: 'Lily',
    },
    {
      id: 2,
      label: 'Goffy',
    },
    {
      id: 3,
      label: 'Nancy',
    },
  ];

  radioOptions = [
    {
      id: 4,
      label: 'Manual execution',
    },
    {
      id: 5,
      label: 'Daily execution',
    },
    {
      id: 6,
      label: 'Weekly execution',
    },
  ];

  OnClick() {
    let furnitureToInsert: Furniture = { description: this.description, title: this.title, body: this.body };
    console.log(JSON.stringify(this.description) + 'rit kifeh ');
    this.store.dispatch(
      FurnitureActions.updateFurniture({
        furniture: furnitureToInsert,
        furnitureId: this.furnitureId,
        categoryId: this.furnitureCategory,
      })
    );
  }
}
