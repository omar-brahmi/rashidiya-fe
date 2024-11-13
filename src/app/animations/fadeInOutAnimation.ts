import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

export const creativeSegmentAnimation = trigger('creativeSegmentAnimation', [
  transition(':enter', [
    query(':self', [
      style({transform: 'translateX(100%) scale(0.8)', opacity: 0, position: 'absolute', width: '100%'}),
      animate('600ms cubic-bezier(0.35, 0, 0.25, 1)',
        style({transform: 'translateX(0) scale(1)', opacity: 1, position: 'relative'}))
    ]),
    query(':enter > *', [
      style({opacity: 0, transform: 'translateY(20px)'}),
      stagger(50, [
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ], {optional: true})
  ]),
  transition(':leave', [
    query(':self', [
      style({position: 'absolute', width: '100%'}),
      animate('600ms cubic-bezier(0.35, 0, 0.25, 1)',
        style({transform: 'translateX(-100%) scale(0.8)', opacity: 0}))
    ]),
    query(':leave > *', [
      stagger(50, [
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({opacity: 0, transform: 'translateY(-20px)'}))
      ])
    ], {optional: true})
  ])
]);
