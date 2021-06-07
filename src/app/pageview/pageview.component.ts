import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import store from '../store/store';
import { boxPositionObserver, moveBoxPositionAction } from './page-view-metadata';

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

  constructor(
    private route: ActivatedRoute,
    private metadataService: MetadataHandlerInRenderer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      this.x$ = boxPositionObserver(this.metadataService, this.id).pipe(map(position => position?.x));
      this.y$ = boxPositionObserver(this.metadataService, this.id).pipe(map(position => position?.y));
    });
  }

  newMetadata() {
    store.dispatch(moveBoxPositionAction({id: this.id, x: this.newX, y: this.newY}))
  }

}
