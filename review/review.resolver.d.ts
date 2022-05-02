import { User } from 'src/user/user.schema';
import { Review, ReviewInput } from './review.schema';
import { ReviewService } from './review.service';
import { BookingIdInput } from './../booking/booking.schema';
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    submitReview(input: ReviewInput, user: User): Promise<import("@nestjs/common").BadRequestException | import("@nestjs/common").NotFoundException | (Review & import("mongoose").Document<any, any, any> & {
        _id: any;
    })>;
    getAssociatedReviewByBookingEventId(input: BookingIdInput, user: User): Promise<Review & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
