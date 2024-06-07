import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragMove,
  CdkDragStart,
  Point,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-resize-box',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './resize-box.component.html',
  styleUrl: './resize-box.component.css',
})
export class ResizeBoxComponent implements OnInit {
  initalWidth = 100;
  wdth: number = this.initalWidth;
  //to ztobić rekalkulaowane z szerokości komórki widoku (tydzień/ dwa/ miesiąc)
  initPos = 80;
  private seed: number = 20;

  box1dragPosition = { x: this.roundNearestSeed(this.initPos), y: 0 };
  box2dragPosition = { x: this.roundNearestSeed(this.initPos) + 10, y: 0 };
  box3dragPosition = {
    x: this.roundNearestSeed(this.initPos) + this.initalWidth + 10,
    y: 0,
  };

  box1dragPositionStart = {
    x: this.box1dragPosition.x,
    y: this.box1dragPosition.y,
  };
  box2dragPositionStart = {
    x: this.box2dragPosition.x,
    y: this.box2dragPosition.y,
  };
  box3dragPositionStart = {
    x: this.box3dragPosition.x,
    y: this.box3dragPosition.y,
  };

  ngOnInit(): void {}

  calcPosition(boxnum: number, event: CdkDragMove) {
    //console.log('drag!', boxnum);

    if (boxnum === 1) {
      const pos = event.source.getFreeDragPosition();
      //  console.log(event);
      const dist = event.distance;
      this.box1dragPosition = {
        x: this.box1dragPositionStart.x + this.roundNearestSeed(dist.x),
        y: pos.y,
      };
      this.box2dragPosition = {
        x: this.box1dragPosition.x + 10,
        y: pos.y,
      };

      // this.box3dragPosition = {
      //   x: this.box1dragPosition.x + this.wdth + 10,
      //   y: pos.y,
      // };
      this.recalcBox2Width();
    }

    if (boxnum === 2) {
      const pos = event.source.getFreeDragPosition();
      const dist = event.distance;

      this.box2dragPosition = {
        x: this.box1dragPositionStart.x + this.roundNearestSeed(dist.x),
        y: pos.y,
      };

      this.box1dragPosition = {
        x: this.box2dragPosition.x - 10,
        y: pos.y,
      };
      this.box3dragPosition = {
        x: this.box2dragPosition.x + this.wdth,
        y: pos.y,
      };
    }
    if (boxnum === 3) {
      const pos = event.source.getFreeDragPosition();
      const dist = event.distance;
      //const pos3 = event.pointerPosition;

      //console.log(dist, pos3);
      //this.b3X = pos.x;
      this.box3dragPosition = {
        x: this.box3dragPositionStart.x + this.roundNearestSeed(dist.x),
        y: pos.y,
      };
      this.recalcBox2Width();
    }
  }

  memoizeBox() {
    this.box1dragPositionStart = {
      x: this.box1dragPosition.x,
      y: this.box1dragPosition.y,
    };
    this.box3dragPositionStart = {
      x: this.box3dragPosition.x,
      y: this.box3dragPosition.y,
    };
  }

  recalcBox2Width() {
    this.wdth = this.box3dragPosition.x - (this.box1dragPosition.x + 10);
  }
  roundNearestSeed(num: number) {
    const ret = Math.round(num / this.seed) * this.seed;
    //console.log('ret: ', num, ret);

    return ret;
  }
}
