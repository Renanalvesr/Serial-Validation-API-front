import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
/**
 * Component that displays the details of a product.
 * It receives a `product` object as input and renders the product's details.
 *
 * @component
 * @example
 * <app-product-display [product]="product"></app-product-display>
 *
 * @Input {any} product - The product object containing the details to be displayed.
 *
 * The product object is expected to have properties such as `name`, `description`, etc.
 */
@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss',
})
export class ProductDisplayComponent {
  @Input() product: any;
}
