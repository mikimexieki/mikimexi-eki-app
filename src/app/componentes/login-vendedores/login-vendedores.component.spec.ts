import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVendedoresComponent } from './login-vendedores.component';

describe('LoginVendedoresComponent', () => {
  let component: LoginVendedoresComponent;
  let fixture: ComponentFixture<LoginVendedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginVendedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
