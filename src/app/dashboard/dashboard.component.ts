import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
    {
      title: 'Manage Products',
      image: 'https://media.istockphoto.com/vectors/cleaning-products-vector-id504050034?k=6&m=504050034&s=170667a&w=0&h=Z_wB_XrzzDIfTZ77QW5pb0Fbs8Il4aCdyj2H9ud4j5I='
    },
    {
      title: 'Manage Users',
      image: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/users_relation.png'
    },
    {
      title: 'Statistics',
      image: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A347ece48-0f69-11e9-a3aa-118c761d2745?source=ig'
    }
  ];
}
