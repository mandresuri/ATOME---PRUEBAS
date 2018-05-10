import {AuthProvider} from './auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../app/models/user';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

const fbAuthMethods = [
    'subscribe'
    // ... etc
  ];

  describe('auth/', () => {
    describe('AuthService', () => {
      let authService;
      let authSubject;
      let mockFirebaseAuth;
  
      beforeEach(() => {
        authSubject = new Subject<AngularFireAuth>();
  
        mockFirebaseAuth = jasmine.createSpyObj('fbAuth', fbAuthMethods);
        mockFirebaseAuth.subscribe.and.callFake(callback => {
          authSubject.subscribe(callback);
        });
  
        TestBed.configureTestingModule({
          providers: [
            {provide: AngularFireAuth, useValue: mockFirebaseAuth},
            AuthProvider
          ]
        });
  
        inject([AuthProvider], (service: AuthProvider) => {
          authService = service;
        })();
      });
  
      it('should be defined', () => {
        expect(authService).toBeDefined();
      });
  
      
    });
  });