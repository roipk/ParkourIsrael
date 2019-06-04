import { TestBed, inject } from '@angular/core/testing';
import { IsManagerGuard } from './is-manager.guard';
describe('IsManagerGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [IsManagerGuard]
        });
    });
    it('should ...', inject([IsManagerGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=is-manager.guard.spec.js.map