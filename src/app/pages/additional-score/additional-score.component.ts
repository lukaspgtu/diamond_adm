import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-additional-score',
  templateUrl: './additional-score.component.html',
  styleUrls: ['./additional-score.component.css']
})
export class AdditionalScoreComponent implements OnInit {

  private modalRef: BsModalRef;

  private config = {
    class: 'modal-dialog-centered'
  }

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  }

  openModal(a: TemplateRef<any>) {
    this.modalRef = this.modalService.show(a, this.config);
  }

}
