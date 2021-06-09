import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import { PhxStore } from '../store/store';
import {  PageMetadata } from './page-view-metadata';

@Component({
  selector: 'app-pageview',
  templateUrl: './pageview.component.html',
  styleUrls: ['./pageview.component.scss']
})
export class PageViewComponent implements OnInit {

  id: string;
  x$: Observable<string>;
  y$: Observable<string>;

  newX: string;
  newY: string;

  metadata: PageMetadata;

  constructor(
    private store: PhxStore,
    private route: ActivatedRoute,
    private metadataService: MetadataHandlerInRenderer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      this.metadata = new PageMetadata(this.store, this.metadataService, this.id);
      this.x$ = this.metadata.x$;
      this.y$ = this.metadata.y$;
    });
  }

  newMetadata() {
    this.metadata.move(this.newX, this.newY);
  }

}
