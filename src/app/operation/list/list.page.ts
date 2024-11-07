import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  flippedCardIndex: number | null = null;

  toggleCard(index: number) {
    // Toggle the clicked card
    if (this.flippedCardIndex != index) {
      this.flippedCardIndex = this.flippedCardIndex === index ? null : index;
    }
  }

  // Listen for clicks outside of the card area
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Check if the clicked element is not a card or its child
    if (!target.closest('.three-d-card')) {
      this.flippedCardIndex = null; // Reset the flipped index
    }
  }

}
