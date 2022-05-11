import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, ICategory } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { of, Observable, finalize } from 'rxjs';
import { CountryStatus } from 'src/app/enumerations/country-status.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  isSaving = false;
  category?: ICategory;
  countryStatusValues = Object.keys(CountryStatus);

  categoryEditForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    code: new FormControl(''),
    status: new FormControl(''),
  });

  categoryEditForm1 = this.formBuilder.group({
    id: [],
    name: [],
    code: [null, Validators.required],
    status: [null, Validators.required],
  });
  constructor(private activateRoute: ActivatedRoute,
    private route: Router,
    protected formBuilder: FormBuilder,
    protected categoryService: CategoryService
    ) {}

  ngOnInit(): void {
    this.setData();
    this.activateRoute.data.subscribe(({ category }) => {
      this.updateForm(category);
    });
  }

  onUpdate() {
    const category = this.createFromForm();
    this.subscribeToSaveResponse(this.categoryService.update(category));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveSuccess(): void {
    this.goBack();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  setData(){
    const id = this.activateRoute.snapshot.paramMap.get('id')+'';
    this.categoryService.find(id).subscribe({
      next: (res: HttpResponse<ICategory>) => {
        console.log('--------------');
        this.category = res.body ?? new Category();
        this.updateForm(this.category);
      },
      error: () => {},
    });
  }

  goBack() {
    this.route.navigate(['categorys']);
  }

  protected updateForm(category: ICategory): void {
    this.categoryEditForm1.patchValue({
      id: category.id,
      name: category.name,
      code: category.code,
      status: category.status,
    });
  }

  protected createFromForm(): ICategory {
    return {
      ...new Category(),
      id: this.categoryEditForm1.get(['id'])!.value,
      name: this.categoryEditForm1.get(['name'])!.value,
      code: this.categoryEditForm1.get(['code'])!.value,
      status: this.categoryEditForm1.get(['status'])!.value,
    };
  }

}
