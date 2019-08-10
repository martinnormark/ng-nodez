import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SlotType } from './slot-type.enum';

@Component({
  selector: 'app-node-slot',
  templateUrl: './node-slot.component.html',
  styleUrls: ['./node-slot.component.scss']
})
export class NodeSlotComponent implements OnInit {

  @Input()
  slotType: SlotType;

  @ViewChild("connectPort", null) port: ElementRef;

  get isInput(): boolean {
    return this.slotType == SlotType.Input;
  }

  constructor() { }

  ngOnInit() {
  }

}
