import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostformComponent } from './postform.component';

describe('PostformComponent', () => {
  let component: PostformComponent;
  let fixture: ComponentFixture<PostformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostformComponent]
    });
    fixture = TestBed.createComponent(PostformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
