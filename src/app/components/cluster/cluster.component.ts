import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  launchDahboard() {
    window.open('https://koki:koki@demo.koki.io/ui/', '_blank');
  }
}
