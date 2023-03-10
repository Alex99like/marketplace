import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/service/categories.service";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories$: Observable<Category[]>

  constructor(
    private categoryService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.fetch()
  }
}
