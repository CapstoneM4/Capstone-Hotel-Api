import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Booking } from "../../entities/booking.entities";
import { BookingService } from "../../entities/bookingServices.entities";


class BookingListCreateService{

    static BookingRepository = AppDataSource.getRepository(Booking);

    static async Booking(){
        return await this.BookingRepository.find();
    }

    //CREATE
    static async CreateBooking({checkinDate, checkoutDate, isPaid, qtyClients, idHotel, idCliente, idRoom }){
        
    }

}