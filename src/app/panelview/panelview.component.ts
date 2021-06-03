import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMetadataActions } from '../store/metadata-action.actions';

@Component({
  selector: 'app-panelview',
  templateUrl: './panelview.component.html',
  styleUrls: ['./panelview.component.scss']
})
export class PanelViewComponent implements OnInit {

  id: string;
  
  constructor(private route: ActivatedRoute,
    private store: Store<any /* interface */>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      this.store.dispatch(loadMetadataActions({ id: this.id }));
    })
  }

}
