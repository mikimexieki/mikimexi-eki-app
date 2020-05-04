import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRepartidoresComponent } from './login-repartidores.component';

describe('LoginRepartidoresComponent', () => {
  let component: LoginRepartidoresComponent;
  let fixture: ComponentFixture<LoginRepartidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRepartidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
