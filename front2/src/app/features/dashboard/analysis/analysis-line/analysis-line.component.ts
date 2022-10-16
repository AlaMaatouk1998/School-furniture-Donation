import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchartsService } from 'src/app/@core/mock/echarts.service';
import { AppState } from 'src/app/@core/state/app.state';
import { getFurnitures } from 'src/app/@core/state/furniture/furniture.selector';

@Component({
  selector: 'da-analysis-line',
  templateUrl: './analysis-line.component.html',
  styleUrls: ['./analysis-line.component.scss'],
})
export class AnalysisLineComponent implements OnInit {
  options: any;

  constructor(private echartsService: EchartsService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(getFurnitures).subscribe((v) => {
      console.log(v);
    });
    this.echartsService.getLineChart().subscribe((option) => {
      this.options = option;
    });
  }
}
