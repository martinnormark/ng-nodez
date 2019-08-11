import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ViewChild, NgZone, ViewChildren, QueryList } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { NodeComponent } from './node/node.component';
import { NodeConfig } from './node/node-config';
import { Link } from './link.model';

declare var LeaderLine: any;

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeEditorComponent implements OnInit, AfterViewInit {

  nodes: NodeConfig[] = [new NodeConfig("nodeId_1", "💎 Workflow start", "⚡ Start being awesome ✨", false, true)];

  links: Link[] = [];
  linkLines: any[] = [];

  @ViewChild('nodesContainer', null) nodesContainer: ElementRef;
  nodesContainerRect: DOMRect;

  @ViewChildren(NodeComponent) nodeComponents: QueryList<NodeComponent>;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.nodesContainerRect = this.nodesContainer.nativeElement.getBoundingClientRect();

    console.log(this.nodesContainerRect);
  }

  onAddNodeClick(event: Event) {
    this.nodes.push(new NodeConfig(`nodeId_${this.nodes.length + 1}`, "⚡✨⚡", `nodeId: ${this.nodes.length}`, this.nodes.length > 0, true));

    setTimeout(() => this.connectNodes());
  }

  connectNodes() {
    if (this.nodes.length > 1) {
      const nodesToConnect = this.nodeComponents.filter((item, idx) => idx >= this.nodes.length - 2);

      const el1 = nodesToConnect[0];
      const el2 = nodesToConnect[1];

      let link = new Link(el1.config.id, el2.config.id);

      this.links.push(link);

      this.linkLines.push(
        new LeaderLine(el1.outputSlot.port.nativeElement, el2.inputSlot.port.nativeElement, {
          startPlug: 'behind',
          endPlug: 'behind',
          startSocket: 'bottom',
          endSocket: 'top',
          color: '#959da5',
          startSocketGravity: 150,
          endSocketGravity: 150
        })
      );
    }
  }

  onResetClick (event: Event) {
    this.nodes = [];
    this.links = [];
    this.linkLines = [];

    this.zone.runOutsideAngular(() => {
      document.querySelectorAll(".leader-line").forEach((ll) => ll.parentNode.removeChild(ll));
    });
  }

  onDragMove(moved: CdkDragMove<string>) {
    const { x, y, width, height } = moved.source.element.nativeElement.getBoundingClientRect() as DOMRect;
    const relX = x - this.nodesContainerRect.x + width / 2;
    const relY = y - this.nodesContainerRect.y + height;

    requestAnimationFrame(() => this.repositionLinksForNode(moved.source.data));
  }

  repositionLinksForNode(nodeId: string) {
    this.links
      .forEach((link, idx) => {
        if (link.fromNodeId === nodeId || link.toNodeId === nodeId) {
          this.linkLines[idx].position();
        }
      });
  }

}
