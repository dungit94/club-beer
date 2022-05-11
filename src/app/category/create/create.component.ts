import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router'
import { Category, ICategory } from '../model/category.model';
import { CountryStatus } from 'src/app/enumerations/country-status.model';
import { CategoryService } from '../service/category.service';
import { finalize, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isSaving = false;
  category?: ICategory;
  countryStatusValues = Object.keys(CountryStatus);

  categoryCreateForm = this.formBuilder.group({
    id: [],
    name: [],
    code: [null, Validators.required],
    status: [null, Validators.required],
  });
  constructor(private api: ApiService,
    private router: Router,
    protected formBuilder: FormBuilder,
    protected categoryService: CategoryService
    ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['categorys']);
  }

  onSubmit() {
    const category = this.createFromForm();
    this.subscribeToSaveResponse(this.categoryService.create(category));
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

  
  protected updateForm(category: ICategory): void {
    this.categoryCreateForm.patchValue({
      id: category.id,
      name: category.name,
      code: category.code,
      status: category.status,
    });
  }

  protected createFromForm(): ICategory {
    return {
      ...new Category(),
      id: this.categoryCreateForm.get(['id'])!.value,
      name: this.categoryCreateForm.get(['name'])!.value,
      code: this.categoryCreateForm.get(['code'])!.value,
      status: this.categoryCreateForm.get(['status'])!.value,
    };
  }
}
