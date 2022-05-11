import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from '../model/category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories?: ICategory[];
  isLoading = false;

  closeResult!: string; 

  constructor(protected categoryService: CategoryService,
     protected modalService: NgbModal
     ) {}
     
  
  loadAll(): void {
    this.isLoading = true;

    this.categoryService.query().subscribe({
      next: (res: HttpResponse<ICategory[]>) => {
        this.isLoading = false;
        this.categories = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  open(content:any, videoId:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.confirmDelete(videoId);  
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  
  
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  

  confirmDelete(id: string): void {
    this.categoryService.delete(id).subscribe(() => {
      this.loadAll();
    });
  }

  trackId(_index: number, item: ICategory): string {
    return item.id!;
  }
}
