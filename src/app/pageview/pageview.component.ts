import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import { loadMetadataActions } from '../store/metadata-action.actions';
import store from '../store/store';

@Component({
  selector: 'app-pageview',
  templateUrl: './pageview.component.html',
  styleUrls: ['./pageview.component.scss']
})
export class PageViewComponent implements OnInit {

  id: string;

  constructor(
    private route: ActivatedRoute,
    private metadataService: MetadataHandlerInRenderer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      store.dispatch(this.metadataService.findMetadataById(this.id));
    });
  }

}
