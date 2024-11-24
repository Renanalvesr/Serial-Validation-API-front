import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDisplayComponent } from './product-display.component';

describe('ProductDisplayComponent', () => {
  let component: ProductDisplayComponent;
  let fixture: ComponentFixture<ProductDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details correctly', () => {
    component.product = {
      name: 'Product 1',
      description: 'This is a product description.',
      status: 'In Stock',
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const nameElement = compiled.querySelector(
      'p:nth-of-type(1)',
    ) as HTMLElement;
    expect(nameElement?.textContent).toContain('Name:');
    expect(nameElement?.textContent).toContain('Product 1');

    const descriptionElement = compiled.querySelector(
      'p:nth-of-type(2)',
    ) as HTMLElement;
    expect(descriptionElement?.textContent).toContain('Description:');
    expect(descriptionElement?.textContent).toContain(
      'This is a product description.',
    );

    const statusElement = compiled.querySelector(
      'p:nth-of-type(3)',
    ) as HTMLElement;
    expect(statusElement?.textContent).toContain('Status:');
    expect(statusElement?.textContent).toContain('In Stock');
  });
});
