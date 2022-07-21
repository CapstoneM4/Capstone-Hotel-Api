"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_services_1 = __importDefault(require("../../services/booking/booking.services"));
class BookingController {
    static createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idHotel = req.params.id;
            const { isPaid, qtyClients, idClient, idRoom } = req.body;
            const newBooking = yield booking_services_1.default.createBooking({
                isPaid,
                qtyClients,
                idHotel,
                idClient,
                idRoom,
            });
            return res.status(201).send(newBooking);
        });
    }
    static listHotelBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idHotel = req.params.id;
            const hotelBookings = yield booking_services_1.default.listBookings({ idHotel });
            return res.status(200).send(hotelBookings);
        });
    }
    static updateHotelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idBooking = req.params.idBooking;
            const idHotel = req.params.id;
            const { checkinDate, checkoutDate, isPaid, qtyClients, idClient, idRoom } = req.body;
            const updatedBooking = yield booking_services_1.default.updateBooking({
                idBooking,
                checkinDate,
                checkoutDate,
                isPaid,
                qtyClients,
                idHotel,
                idClient,
                idRoom,
            });
            return res
                .status(201)
                .json({ message: "Updated with success", updatedBooking });
        });
    }
    static deleteHotelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idBooking = req.params.idBooking;
            const booking = yield booking_services_1.default.deleteBooking({ idBooking });
            return res.status(200).json({ message: "Booking Deleted with success!" });
        });
    }
    static listOneBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idBooking = req.params.idBooking;
            const booking = yield booking_services_1.default.listOneBooking({ idBooking });
            return res.status(200).send(booking);
        });
    }
    static createBookingService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idBooking } = req.params;
            const { idService, idEmployee } = req.body;
            const newBookingService = yield booking_services_1.default.createBookingService({
                idService,
                idEmployee,
                idBooking,
            });
            return res.status(200).send(newBookingService);
        });
    }
    static listBookingServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idBooking } = req.params;
            const bookingServices = yield booking_services_1.default.listBookingServices({
                idBooking,
            });
            return res.status(200).send(bookingServices);
        });
    }
}
exports.default = BookingController;
