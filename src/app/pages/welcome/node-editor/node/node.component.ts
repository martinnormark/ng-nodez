import { Component, OnInit, Input, HostListener, ElementRef, NgZone, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { NodeConfig } from './node-config';
import { SlotType } from '../node-slot/slot-type.enum';
import { NodeSlotComponent } from '../node-slot/node-slot.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  SlotTypeEnum = SlotType;

  @Input()
  config: NodeConfig;

  @ViewChildren(NodeSlotComponent) slots: QueryList<NodeSlotComponent>;

  get inputSlot(): NodeSlotComponent {
    return this.slots.find((s) => s.slotType == SlotType.Input);
  }

  get outputSlot(): NodeSlotComponent {
    return this.slots.find((s) => s.slotType == SlotType.Output);
  }

  mouseDown: boolean = false;

  constructor(private el: ElementRef, private zone: NgZone, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // this.zone.runOutsideAngular(() => {
    //   this.el.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    //   this.el.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    // });
  }

  onMouseDown (event) {
    this.el.nativeElement.style.cursor = 'grabbing';
    this.cdRef.markForCheck();
  }

  onMouseUp (event) {
    this.el.nativeElement.style.cursor = 'grab';
    this.cdRef.markForCheck();
  }

}
