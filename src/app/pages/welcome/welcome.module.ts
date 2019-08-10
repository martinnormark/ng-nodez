import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule  } from '@angular/cdk/drag-drop';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';

import { NodeEditorComponent } from './node-editor/node-editor.component';
import { NodeComponent } from './node-editor/node/node.component';
import { NodeSlotComponent } from './node-editor/node-slot/node-slot.component';

@NgModule({
  imports: [CommonModule, DragDropModule, WelcomeRoutingModule, NgZorroAntdModule],
  declarations: [WelcomeComponent, NodeEditorComponent, NodeComponent, NodeSlotComponent],
  exports: [WelcomeComponent, NodeEditorComponent, NodeComponent]
})
export class WelcomeModule { }
