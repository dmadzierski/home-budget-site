import {Component, OnInit} from '@angular/core';
import {Category} from '../models/category.model';
import {CategoryHttpService} from './category.http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Array<Category> = new Array<Category>();


  constructor(private categoryHttpService: CategoryHttpService) {
    this.getCategories();
  }

  ngOnInit(): void {
  }

  removeCategory(categoyrId: bigint) {
    this.categoryHttpService.removeCategory(categoyrId).subscribe(success => {
      this.categories = this.categories.filter(category => category.id !== categoyrId);
    });
  }

  private getCategories() {
    this.categoryHttpService.getUserCategories().subscribe(success => {
      this.categories = success.map(k => new Category().fromJSON(k)).map(k => k.mapToView());
    }, error => {
    });
  }
}
