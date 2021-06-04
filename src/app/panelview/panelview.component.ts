import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-panelview',
  templateUrl: './panelview.component.html',
  styleUrls: ['./panelview.component.scss']
})
export class PanelViewComponent implements OnInit {

  id: string;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      
    })
  }

}
